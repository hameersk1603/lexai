import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await loginUser({ email, password });
            login(res.data);
            const role = res.data.role;
            if (role === 'ADMIN') navigate('/admin');
            else if (role === 'LAWYER') navigate('/lawyer');
            else navigate('/dashboard');
        } catch {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <motion.div className="auth-left"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}>
                <div className="auth-brand">LEX AI</div>
                <div className="auth-tagline">AI Powered Legal Platform</div>
                <div className="divider" />
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.3' }}>
                    Your Trusted<br />
                    <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Legal Partner
                    </span>
                </h2>
                <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.8', marginBottom: '40px' }}>
                    Access AI legal assistance, find expert lawyers, and manage your cases all in one place.
                </p>
                {[
                    '🤖 AI Legal Chatbot available 24/7',
                    '👨‍⚖️ 500+ Verified Expert Lawyers',
                    '📄 Smart Document Analysis',
                    '⚖️ Case Management System'
                ].map((item, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                        <span style={{ color: '#555', fontSize: '13px' }}>{item}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Right Panel */}
            <motion.div className="auth-right"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}>
                <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Login to your LexAI account</p>

                    {error && <div className="auth-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input className="input" type="email" placeholder="you@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input className="input" type="password" placeholder="••••••••"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <motion.button className="btn-gold" style={{ width: '100%', marginTop: '8px' }}
                            type="submit" disabled={loading}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            {loading ? 'Logging in...' : 'Login to LexAI →'}
                        </motion.button>
                    </form>

                    <p className="auth-footer" style={{ marginTop: '24px' }}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;