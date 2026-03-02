import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';
import '../styles/global.css';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER', phone: '', city: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await registerUser(form);
            navigate('/login');
        } catch {
            setError('Registration failed. Email may already exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div className="auth-left"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}>
                <div className="auth-brand">LEX AI</div>
                <div className="auth-tagline">AI Powered Legal Platform</div>
                <div className="divider" />
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.3' }}>
                    Join India's<br />
                    <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Premier Legal AI
                    </span>
                </h2>
                <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.8' }}>
                    Get instant AI legal assistance, connect with expert lawyers, and manage all your legal matters in one secure platform.
                </p>
                <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '12px' }}>
                    <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Choose Your Role</div>
                    {[
                        { role: 'USER', icon: '👤', desc: 'Need legal help?' },
                        { role: 'LAWYER', icon: '👨‍⚖️', desc: 'Offer legal services?' },
                        { role: 'ADMIN', icon: '👑', desc: 'Manage the platform?' }
                    ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <span>{r.icon}</span>
                            <span style={{ color: '#444', fontSize: '13px' }}><strong style={{ color: '#666' }}>{r.role}</strong> — {r.desc}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div className="auth-right"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}>
                <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join LexAI today</p>

                    {error && <div className="auth-error">{error}</div>}

                    <div className="role-grid" style={{ marginBottom: '20px' }}>
                        {[
                            { value: 'USER', icon: '👤', label: 'User' },
                            { value: 'LAWYER', icon: '👨‍⚖️', label: 'Lawyer' },
                            { value: 'ADMIN', icon: '👑', label: 'Admin' }
                        ].map(r => (
                            <button key={r.value} type="button"
                                className={`role-btn ${form.role === r.value ? 'selected' : ''}`}
                                onClick={() => setForm({ ...form, role: r.value })}>
                                <span>{r.icon}</span>{r.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <input className="input" placeholder="Your full name"
                                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input className="input" type="email" placeholder="you@example.com"
                                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input className="input" type="password" placeholder="••••••••"
                                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="input-group">
                                <label>Phone</label>
                                <input className="input" placeholder="Phone number"
                                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div className="input-group">
                                <label>City</label>
                                <input className="input" placeholder="Your city"
                                    value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                            </div>
                        </div>
                        <motion.button className="btn-gold" style={{ width: '100%', marginTop: '8px' }}
                            type="submit" disabled={loading}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            {loading ? 'Creating Account...' : 'Join LexAI →'}
                        </motion.button>
                    </form>
                    <p className="auth-footer" style={{ marginTop: '24px' }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;