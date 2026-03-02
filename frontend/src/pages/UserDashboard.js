import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getAllLawyers, searchLawyers, createCase, getCasesByUser, deleteCase, saveDocument, getDocumentsByUser, deleteDocument, saveChat, getChatHistory, clearChat } from '../services/api';
import '../styles/global.css';



const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('chat');
    const [lawyers, setLawyers] = useState([]);
    const [cases, setCases] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatInput, setChatInput] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [toast, setToast] = useState('');
    const [showCaseModal, setShowCaseModal] = useState(false);
    const [caseForm, setCaseForm] = useState({ title: '', description: '', category: 'CRIMINAL' });
    const [specialty, setSpecialty] = useState('');
    const [city, setCity] = useState('');
    const [docContent, setDocContent] = useState('');
    const [docName, setDocName] = useState('');
    const [docLoading, setDocLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchAll();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, aiLoading]);

    const fetchAll = async () => {
        try {
            const [lawyersRes, casesRes, docsRes, chatRes] = await Promise.all([
                getAllLawyers(),
                getCasesByUser(user.id),
                getDocumentsByUser(user.id),
                getChatHistory(user.id)
            ]);
            setLawyers(lawyersRes.data);
            setCases(casesRes.data);
            setDocuments(docsRes.data);
            setChatMessages(chatRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const callGemini = async (prompt) => {
    const res = await fetch('http://localhost:8080/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    return data.reply;
};

    const handleChat = async () => {
        if (!chatInput.trim() || aiLoading) return;
        const userMsg = chatInput.trim();
        setChatInput('');
        setAiLoading(true);
        const tempMessages = [...chatMessages, { userMessage: userMsg, aiResponse: null, id: Date.now() }];
        setChatMessages(tempMessages);
        try {
            const prompt = `You are LexAI, an expert AI legal assistant for Indian law. Answer this legal question clearly and helpfully. If it is not a legal question, politely redirect to legal topics. Question: ${userMsg}`;
            const aiResponse = await callGemini(prompt);
            await saveChat({ userId: user.id, userMessage: userMsg, aiResponse });
            const chatRes = await getChatHistory(user.id);
            setChatMessages(chatRes.data);
        } catch {
            setChatMessages(prev => prev.filter(m => m.id !== Date.now()));
            showToast('Failed to get AI response. Check your API key.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleClearChat = async () => {
        await clearChat(user.id);
        setChatMessages([]);
        showToast('Chat history cleared');
    };

    const handleCreateCase = async (e) => {
        e.preventDefault();
        try {
            await createCase(user.id, caseForm);
            setShowCaseModal(false);
            setCaseForm({ title: '', description: '', category: 'CRIMINAL' });
            showToast('Case created successfully!');
            const res = await getCasesByUser(user.id);
            setCases(res.data);
        } catch { showToast('Failed to create case'); }
    };

    const handleDeleteCase = async (id) => {
        if (window.confirm('Delete this case?')) {
            await deleteCase(id);
            const res = await getCasesByUser(user.id);
            setCases(res.data);
            showToast('Case deleted');
        }
    };

    const handleAnalyzeDoc = async () => {
        if (!docContent.trim() || !docName.trim()) { showToast('Enter document name and content'); return; }
        setDocLoading(true);
        try {
            const prompt = `You are a legal document analyzer. Analyze this legal document and provide: 1) Document Type 2) Key Points 3) Important Clauses 4) Potential Risks 5) Recommendations. Document: ${docContent}`;
            const aiAnalysis = await callGemini(prompt);
            await saveDocument({ userId: user.id, fileName: docName, content: docContent, aiAnalysis });
            showToast('Document analyzed successfully!');
            setDocContent('');
            setDocName('');
            const res = await getDocumentsByUser(user.id);
            setDocuments(res.data);
        } catch { showToast('Analysis failed. Check API key.'); }
        finally { setDocLoading(false); }
    };

    const handleSearchLawyers = async () => {
        try {
            const params = {};
            if (specialty) params.specialty = specialty;
            if (city) params.city = city;
            const res = await searchLawyers(params);
            setLawyers(res.data);
        } catch { showToast('Search failed'); }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    const navItems = [
        { id: 'chat', icon: '🤖', label: 'AI Chatbot' },
        { id: 'lawyers', icon: '👨‍⚖️', label: 'Find Lawyers' },
        { id: 'cases', icon: '📋', label: 'My Cases' },
        { id: 'documents', icon: '📄', label: 'Documents' }
    ];

    const specialties = ['CRIMINAL', 'CIVIL', 'FAMILY', 'CORPORATE', 'PROPERTY', 'LABOUR', 'TAXATION', 'IMMIGRATION', 'INTELLECTUAL_PROPERTY', 'CYBER_LAW'];
    const caseStatuses = { OPEN: 'badge-gold', CLOSED: 'badge-gray', PENDING: 'badge-blue', RESOLVED: 'badge-green' };

    return (
        <div style={{ background: '#050505', minHeight: '100vh' }}>
            {/* Navbar */}
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>LEX AI</div>
                <div className="navbar-links">
                    {navItems.map(item => (
                        <button key={item.id} className={`navbar-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}>
                            {item.icon} {item.label}
                        </button>
                    ))}
                    <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '800', color: '#000', fontSize: '13px'
                    }}>{user?.name?.charAt(0).toUpperCase()}</div>
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        ✦ {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ paddingTop: '80px', maxWidth: '1400px', margin: '0 auto', padding: '100px 48px 48px' }}>
                {/* Header */}
                <motion.div style={{ marginBottom: '32px' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        User Dashboard
                    </div>
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '700' }}>
                        Welcome, <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name}</span>
                    </h1>
                </motion.div>

                {/* Stats */}
                <div className="stats-row">
                    {[
                        { icon: '📋', value: cases.length, label: 'Total Cases' },
                        { icon: '📄', value: documents.length, label: 'Documents' },
                        { icon: '💬', value: chatMessages.length, label: 'Chat Messages' },
                        { icon: '👨‍⚖️', value: lawyers.length, label: 'Available Lawyers' }
                    ].map((stat, i) => (
                        <motion.div key={i} className="stat-card"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}>
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {loading ? <div className="loading"><div className="spinner" /></div> : (
                    <>
                        {/* AI Chatbot */}
                        {activeTab === 'chat' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="chat-container">
                                    <div className="chat-header">
                                        <div className="chat-avatar">⚖️</div>
                                        <div>
                                            <div style={{ fontWeight: '700', fontSize: '15px' }}>LexAI Legal Assistant</div>
                                            <div style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '1px' }}>AI POWERED • AVAILABLE 24/7</div>
                                        </div>
                                        <button className="btn-danger" style={{ marginLeft: 'auto' }} onClick={handleClearChat}>Clear History</button>
                                    </div>
                                    <div className="chat-messages">
                                        {chatMessages.length === 0 && !aiLoading && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                style={{ textAlign: 'center', padding: '60px 20px' }}>
                                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚖️</div>
                                                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#c9a84c', marginBottom: '8px' }}>Ask LexAI Anything</div>
                                                <div style={{ color: '#333', fontSize: '14px' }}>Get instant AI-powered answers to all your legal questions</div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
                                                    {['What are my tenant rights?', 'How to file an FIR?', 'Explain IPC Section 302', 'What is habeas corpus?'].map((q, i) => (
                                                        <button key={i}
                                                            style={{ padding: '8px 16px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '6px', color: '#666', fontSize: '12px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
                                                            onClick={() => setChatInput(q)}>
                                                            {q}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                        {chatMessages.map((msg, i) => (
                                            <motion.div key={msg.id || i}
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                <div className="message-user">{msg.userMessage}</div>
                                                <div className="message-ai" style={{ whiteSpace: 'pre-wrap' }}>{msg.aiResponse}</div>
                                            </motion.div>
                                        ))}
                                        {aiLoading && (
                                            <div className="message-ai" style={{ alignSelf: 'flex-start', width: 'fit-content' }}>
                                                <div className="typing">
                                                    <span /><span /><span />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>
                                    <div className="chat-input-row">
                                        <input className="chat-input" placeholder="Ask any legal question..."
                                            value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleChat()} />
                                        <motion.button className="btn-gold" style={{ padding: '14px 28px', fontSize: '13px' }}
                                            onClick={handleChat} disabled={aiLoading}
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            {aiLoading ? '...' : 'Send →'}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Find Lawyers */}
                        {activeTab === 'lawyers' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h2 className="section-title">Find <span className="gold-text">Lawyers</span></h2>
                                </div>
                                <div className="search-bar">
                                    <select className="search-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                                        <option value="">All Specialties</option>
                                        {specialties.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                    </select>
                                    <input className="search-input" placeholder="Filter by city..." value={city} onChange={(e) => setCity(e.target.value)} />
                                    <motion.button className="btn-gold" onClick={handleSearchLawyers} whileHover={{ scale: 1.03 }}>
                                        Search
                                    </motion.button>
                                </div>
                                {lawyers.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">👨‍⚖️</div>
                                        <div className="empty-text">No lawyers found</div>
                                    </div>
                                ) : (
                                    <div className="lawyer-grid">
                                        {lawyers.map((lawyer, i) => (
                                            <motion.div key={lawyer.id} className="lawyer-card"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}>
                                                <div className="lawyer-avatar">👨‍⚖️</div>
                                                <div className="lawyer-name">{lawyer.user?.name}</div>
                                                <div className="lawyer-specialty">{lawyer.specialty?.replace('_', ' ')}</div>
                                                <div className="lawyer-info">
                                                    <div className="lawyer-info-item">📍 {lawyer.city || 'N/A'}</div>
                                                    <div className="lawyer-info-item">⚖️ {lawyer.experience} years experience</div>
                                                    <div className="lawyer-info-item">📞 {lawyer.user?.phone || 'N/A'}</div>
                                                    <div className="lawyer-info-item">✉️ {lawyer.user?.email}</div>
                                                </div>
                                                <div className="lawyer-footer">
                                                    <span className={`badge ${lawyer.available ? 'badge-green' : 'badge-red'}`}>
                                                        {lawyer.available ? 'Available' : 'Busy'}
                                                    </span>
                                                    <div style={{ color: '#c9a84c', fontSize: '13px', fontWeight: '600' }}>
                                                        Bar: {lawyer.barNumber || 'N/A'}
                                                    </div>
                                                </div>
                                                {lawyer.bio && (
                                                    <p style={{ color: '#444', fontSize: '13px', lineHeight: '1.6', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                                        {lawyer.bio}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* My Cases */}
                        {activeTab === 'cases' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h2 className="section-title">My <span className="gold-text">Cases</span></h2>
                                    <motion.button className="btn-gold" onClick={() => setShowCaseModal(true)} whileHover={{ scale: 1.03 }}>
                                        + New Case
                                    </motion.button>
                                </div>
                                {cases.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">📋</div>
                                        <div className="empty-text">No cases yet</div>
                                        <motion.button className="btn-gold" style={{ marginTop: '20px' }}
                                            onClick={() => setShowCaseModal(true)} whileHover={{ scale: 1.05 }}>
                                            Create First Case
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                                        {cases.map((c, i) => (
                                            <motion.div key={c.id} className="card"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                                    <span className={`badge ${caseStatuses[c.status] || 'badge-gray'}`}>{c.status}</span>
                                                    <button className="btn-danger" onClick={() => handleDeleteCase(c.id)}>Delete</button>
                                                </div>
                                                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#fff' }}>{c.title}</h3>
                                                <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>{c.category?.replace('_', ' ')}</div>
                                                <p style={{ color: '#444', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>{c.description?.substring(0, 120)}...</p>
                                                <div style={{ color: '#333', fontSize: '12px' }}>📅 {new Date(c.createdAt).toLocaleDateString()}</div>
                                                {c.aiSummary && (
                                                    <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '8px' }}>
                                                        <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>AI Summary</div>
                                                        <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.6' }}>{c.aiSummary?.substring(0, 150)}...</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Documents */}
                        {activeTab === 'documents' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h2 className="section-title">Document <span className="gold-text">Analyzer</span></h2>
                                </div>
                                <div className="card" style={{ marginBottom: '28px' }}>
                                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '700', color: '#c9a84c', marginBottom: '20px' }}>
                                        📄 Analyze New Document
                                    </div>
                                    <div className="input-group">
                                        <label>Document Name</label>
                                        <input className="input" placeholder="e.g. Employment Contract, Rental Agreement"
                                            value={docName} onChange={(e) => setDocName(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Paste Document Content</label>
                                        <textarea className="input" style={{ minHeight: '180px', resize: 'vertical' }}
                                            placeholder="Paste your legal document content here for AI analysis..."
                                            value={docContent} onChange={(e) => setDocContent(e.target.value)} />
                                    </div>
                                    <motion.button className="btn-gold" onClick={handleAnalyzeDoc}
                                        disabled={docLoading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                        {docLoading ? '⚙️ Analyzing...' : '🤖 Analyze with AI →'}
                                    </motion.button>
                                </div>

                                {documents.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">📄</div>
                                        <div className="empty-text">No documents analyzed yet</div>
                                    </div>
                                ) : (
                                    <div className="doc-grid">
                                        {documents.map((doc, i) => (
                                            <motion.div key={doc.id} className="doc-card"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}>
                                                <div className="doc-icon">📋</div>
                                                <div className="doc-name">{doc.fileName}</div>
                                                <div className="doc-date">📅 {new Date(doc.uploadedAt).toLocaleDateString()}</div>
                                                <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>AI Analysis</div>
                                                <div className="doc-analysis">{doc.aiAnalysis?.substring(0, 200)}...</div>
                                                <button className="btn-danger" style={{ marginTop: '16px' }}
                                                    onClick={async () => { await deleteDocument(doc.id); const res = await getDocumentsByUser(user.id); setDocuments(res.data); }}>
                                                    Delete
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            {/* Create Case Modal */}
            <AnimatePresence>
                {showCaseModal && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowCaseModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Create New Case</h3>
                                <button className="modal-close" onClick={() => setShowCaseModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleCreateCase}>
                                <div className="input-group">
                                    <label>Case Title</label>
                                    <input className="input" placeholder="Brief title of your case"
                                        value={caseForm.title} onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })} required />
                                </div>
                                <div className="input-group">
                                    <label>Category</label>
                                    <select className="input" value={caseForm.category} onChange={(e) => setCaseForm({ ...caseForm, category: e.target.value })}>
                                        {specialties.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea className="input" style={{ minHeight: '120px', resize: 'vertical' }}
                                        placeholder="Describe your case in detail..."
                                        value={caseForm.description} onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })} />
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="button" className="btn-dark" style={{ flex: 1 }} onClick={() => setShowCaseModal(false)}>Cancel</button>
                                    <motion.button className="btn-gold" style={{ flex: 2 }} type="submit"
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        Create Case →
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDashboard;