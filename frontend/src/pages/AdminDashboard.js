import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUsersByRole, getAllLawyers, getAllCases } from '../services/api';
import '../styles/global.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            const [usersRes, lawyersRes, casesRes] = await Promise.all([
                getUsersByRole('USER'),
                getAllLawyers(),
                getAllCases()
            ]);
            setUsers(usersRes.data);
            setLawyers(lawyersRes.data);
            setCases(casesRes.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleLogout = () => { logout(); navigate('/'); };

    const navItems = [
        { id: 'overview', label: '📊 Overview' },
        { id: 'users', label: '👤 Users' },
        { id: 'lawyers', label: '👨‍⚖️ Lawyers' },
        { id: 'cases', label: '📋 Cases' }
    ];

    const caseStatuses = { OPEN: 'badge-gold', CLOSED: 'badge-gray', PENDING: 'badge-blue', RESOLVED: 'badge-green' };

    return (
        <div style={{ background: '#050505', minHeight: '100vh' }}>
            <motion.nav className="navbar" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>LEX AI</div>
                <div className="navbar-links">
                    {navItems.map(item => (
                        <button key={item.id} className={`navbar-link ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}>{item.label}</button>
                    ))}
                    <button className="btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </motion.nav>

            <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '100px 48px 48px' }}>
                <motion.div style={{ marginBottom: '32px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Admin Control Panel</div>
                    <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '700' }}>
                        <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            LexAI Admin
                        </span> Dashboard 👑
                    </h1>
                </motion.div>

                <div className="stats-row">
                    {[
                        { icon: '👤', value: users.length, label: 'Total Users' },
                        { icon: '👨‍⚖️', value: lawyers.length, label: 'Total Lawyers' },
                        { icon: '📋', value: cases.length, label: 'Total Cases' },
                        { icon: '⚖️', value: cases.filter(c => c.status === 'OPEN').length, label: 'Open Cases' }
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
                        {activeTab === 'overview' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div className="table-container">
                                    <div className="table-head"><span className="table-title">Recent Users</span></div>
                                    <table>
                                        <thead><tr><th>Name</th><th>Email</th><th>City</th></tr></thead>
                                        <tbody>
                                            {users.slice(0, 6).map(u => (
                                                <tr key={u.id}>
                                                    <td style={{ color: '#fff', fontWeight: '600' }}>{u.name}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.city || '—'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="table-container">
                                    <div className="table-head"><span className="table-title">Recent Cases</span></div>
                                    <table>
                                        <thead><tr><th>Title</th><th>Category</th><th>Status</th></tr></thead>
                                        <tbody>
                                            {cases.slice(0, 6).map(c => (
                                                <tr key={c.id}>
                                                    <td style={{ color: '#fff', fontWeight: '600' }}>{c.title?.substring(0, 25)}...</td>
                                                    <td>{c.category?.replace('_', ' ')}</td>
                                                    <td><span className={`badge ${caseStatuses[c.status] || 'badge-gray'}`}>{c.status}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="table-container">
                                    <div className="table-head">
                                        <span className="table-title">All Users ({users.length})</span>
                                    </div>
                                    <table>
                                        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Joined</th></tr></thead>
                                        <tbody>
                                            {users.map((u, i) => (
                                                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td>{i + 1}</td>
                                                    <td style={{ color: '#fff', fontWeight: '600' }}>{u.name}</td>
                                                    <td style={{ color: '#c9a84c' }}>{u.email}</td>
                                                    <td>{u.phone || '—'}</td>
                                                    <td>{u.city || '—'}</td>
                                                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'lawyers' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="table-container">
                                    <div className="table-head">
                                        <span className="table-title">All Lawyers ({lawyers.length})</span>
                                    </div>
                                    <table>
                                        <thead><tr><th>#</th><th>Name</th><th>Specialty</th><th>City</th><th>Experience</th><th>Status</th></tr></thead>
                                        <tbody>
                                            {lawyers.map((l, i) => (
                                                <motion.tr key={l.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td>{i + 1}</td>
                                                    <td style={{ color: '#fff', fontWeight: '600' }}>{l.user?.name}</td>
                                                    <td style={{ color: '#c9a84c' }}>{l.specialty?.replace('_', ' ')}</td>
                                                    <td>{l.city || '—'}</td>
                                                    <td>{l.experience} yrs</td>
                                                    <td><span className={`badge ${l.available ? 'badge-green' : 'badge-red'}`}>{l.available ? 'Available' : 'Busy'}</span></td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'cases' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="table-container">
                                    <div className="table-head">
                                        <span className="table-title">All Cases ({cases.length})</span>
                                    </div>
                                    <table>
                                        <thead><tr><th>#</th><th>Title</th><th>User</th><th>Category</th><th>Status</th><th>Date</th></tr></thead>
                                        <tbody>
                                            {cases.map((c, i) => (
                                                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                                    <td>{i + 1}</td>
                                                    <td style={{ color: '#fff', fontWeight: '600' }}>{c.title?.substring(0, 30)}</td>
                                                    <td style={{ color: '#c9a84c' }}>{c.user?.name}</td>
                                                    <td>{c.category?.replace('_', ' ')}</td>
                                                    <td><span className={`badge ${caseStatuses[c.status] || 'badge-gray'}`}>{c.status}</span></td>
                                                    <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;