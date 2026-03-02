import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { createLawyerProfile, getLawyerById, getCasesByUser } from '../services/api';
import '../styles/global.css';

const LawyerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [lawyer, setLawyer] = useState(null);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileForm, setProfileForm] = useState({
        specialty: 'CRIMINAL', barNumber: '', experience: 0, city: '', bio: '', available: true
    });

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const casesRes = await getCasesByUser(user.id);
            setCases(casesRes.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        try {
            await createLawyerProfile(user.id, profileForm);
            setShowProfileModal(false);
            showToast('Lawyer profile created successfully!');
            fetchData();
        } catch { showToast('Failed to create profile. Profile may already exist.'); }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    const specialties = ['CRIMINAL', 'CIVIL', 'FAMILY', 'CORPORATE', 'PROPERTY', 'LABOUR', 'TAXATION', 'IMMIGRATION', 'INTELLECTUAL_PROPERTY', 'CYBER_LAW'];

    return (
        <div style={{ background: '#050505', minHeight: '100vh' }}>
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>LEX AI</div>
                <div className="navbar-links">
                    {[{ id: 'profile', label: '👤 Profile' }, { id: 'cases', label: '📋 Cases' }].map(item => (
                        <button key={item.id} className={`navbar-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}>{item.label}</button>
                    ))}
                    <motion.button className="btn-gold" style={{ fontSize: '12px', padding: '10px 20px' }}
                        onClick={() => setShowProfileModal(true)} whileHover={{ scale: 1.05 }}>
                        Setup Profile
                    </motion.button>
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

            <div style={{ paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', padding: '100px 48px 48px' }}>
                <motion.div style={{ marginBottom: '32px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Lawyer Dashboard</div>
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '700' }}>
                        Welcome, <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Adv. {user?.name}
                        </span>
                    </h1>
                </motion.div>

                <div className="stats-row">
                    {[
                        { icon: '📋', value: cases.length, label: 'Total Cases' },
                        { icon: '⚖️', value: cases.filter(c => c.status === 'OPEN').length, label: 'Open Cases' },
                        { icon: '✅', value: cases.filter(c => c.status === 'RESOLVED').length, label: 'Resolved' },
                        { icon: '⏳', value: cases.filter(c => c.status === 'PENDING').length, label: 'Pending' }
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
                        {activeTab === 'profile' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="card" style={{ maxWidth: '600px' }}>
                                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: '700', color: '#c9a84c', marginBottom: '24px' }}>
                                        👨‍⚖️ My Profile
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {[
                                            { label: 'Full Name', value: user?.name },
                                            { label: 'Email', value: user?.email },
                                            { label: 'Phone', value: user?.phone || 'Not set' },
                                            { label: 'City', value: user?.city || 'Not set' },
                                            { label: 'Role', value: 'LAWYER' }
                                        ].map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                                <span style={{ color: '#444', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.label}</span>
                                                <span style={{ color: '#888', fontSize: '14px', fontWeight: '500' }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <motion.button className="btn-gold" style={{ marginTop: '24px', width: '100%' }}
                                        onClick={() => setShowProfileModal(true)} whileHover={{ scale: 1.02 }}>
                                        Setup / Update Lawyer Profile
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'cases' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="section-header">
                                    <h2 className="section-title">My <span className="gold-text">Cases</span></h2>
                                </div>
                                {cases.length === 0 ? (
                                    <div className="empty-state">
                                        <div className="empty-icon">📋</div>
                                        <div className="empty-text">No cases assigned yet</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                                        {cases.map((c, i) => (
                                            <motion.div key={c.id} className="card"
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                                    <span className={`badge ${c.status === 'OPEN' ? 'badge-gold' : c.status === 'RESOLVED' ? 'badge-green' : 'badge-gray'}`}>
                                                        {c.status}
                                                    </span>
                                                    <span style={{ color: '#333', fontSize: '12px' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{c.title}</h3>
                                                <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                                                    {c.category?.replace('_', ' ')}
                                                </div>
                                                <p style={{ color: '#444', fontSize: '13px', lineHeight: '1.6' }}>{c.description?.substring(0, 100)}...</p>
                                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', color: '#555', fontSize: '13px' }}>
                                                    👤 Client: {c.user?.name}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </div>

            <AnimatePresence>
                {showProfileModal && (
                    <motion.div className="modal-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowProfileModal(false)}>
                        <motion.div className="modal"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3 className="modal-title">Lawyer Profile Setup</h3>
                                <button className="modal-close" onClick={() => setShowProfileModal(false)}>×</button>
                            </div>
                            <form onSubmit={handleCreateProfile}>
                                <div className="input-group">
                                    <label>Specialty</label>
                                    <select className="input" value={profileForm.specialty} onChange={(e) => setProfileForm({ ...profileForm, specialty: e.target.value })}>
                                        {specialties.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                    </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div className="input-group">
                                        <label>Bar Number</label>
                                        <input className="input" placeholder="Bar council number"
                                            value={profileForm.barNumber} onChange={(e) => setProfileForm({ ...profileForm, barNumber: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Experience (Years)</label>
                                        <input className="input" type="number" placeholder="Years of experience"
                                            value={profileForm.experience} onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>City</label>
                                    <input className="input" placeholder="Your city"
                                        value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Bio</label>
                                    <textarea className="input" style={{ minHeight: '100px', resize: 'vertical' }}
                                        placeholder="Brief professional bio..."
                                        value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} />
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="button" className="btn-dark" style={{ flex: 1 }} onClick={() => setShowProfileModal(false)}>Cancel</button>
                                    <motion.button className="btn-gold" style={{ flex: 2 }} type="submit"
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        Save Profile →
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

export default LawyerDashboard;