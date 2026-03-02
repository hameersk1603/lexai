import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/global.css';

const Home = () => {
    const navigate = useNavigate();
    const [typed, setTyped] = useState('');
    const fullText = 'Your AI-Powered Legal Assistant';

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setTyped(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 60);
        return () => clearInterval(timer);
    }, []);

    const services = [
        { icon: '🤖', title: 'AI Legal Chatbot', desc: 'Get instant answers to any legal question powered by advanced AI' },
        { icon: '📄', title: 'Document Analyzer', desc: 'Upload legal documents and get AI-powered analysis in seconds' },
        { icon: '📋', title: 'Case Summarizer', desc: 'Summarize complex legal cases into clear, concise insights' },
        { icon: '👨‍⚖️', title: 'Lawyer Finder', desc: 'Find verified lawyers by specialty and city across India' }
    ];

    const stats = [
        { value: '10,000+', label: 'Legal Questions Answered' },
        { value: '500+', label: 'Verified Lawyers' },
        { value: '50,000+', label: 'Documents Analyzed' },
        { value: '98%', label: 'Client Satisfaction' }
    ];

    const specialties = [
        'Criminal Law', 'Civil Law', 'Family Law', 'Corporate Law',
        'Property Law', 'Labour Law', 'Taxation', 'Cyber Law'
    ];

    return (
        <div style={{ background: '#050505', minHeight: '100vh' }}>
            {/* Navbar */}
            <motion.nav className="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}>
                <div className="navbar-brand">LEX AI</div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Services</button>
                    <button className="navbar-link" onClick={() => document.getElementById('lawyers').scrollIntoView({ behavior: 'smooth' })}>Lawyers</button>
                    <button className="navbar-link" onClick={() => navigate('/login')}>Login</button>
                    <motion.button className="btn-gold" style={{ fontSize: '12px', padding: '12px 24px' }}
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Get Started
                    </motion.button>
                </div>
            </motion.nav>

            {/* Ticker */}
            <div className="ticker" style={{ marginTop: '72px' }}>
                <div className="ticker-inner">
                    ⚖️ JUSTICE FOR ALL &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; AI POWERED LEGAL ASSISTANCE &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; 500+ VERIFIED LAWYERS &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; CRIMINAL LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; CIVIL LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; CORPORATE LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; FAMILY LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; PROPERTY LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; CYBER LAW &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; TAXATION &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; IMMIGRATION &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
                </div>
            </div>

            {/* Hero */}
            <div style={{
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Left */}
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '80px',
                        borderRight: '1px solid rgba(201,168,76,0.08)'
                    }}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '6px 16px',
                            background: 'rgba(201,168,76,0.06)',
                            border: '1px solid rgba(201,168,76,0.2)',
                            borderRadius: '4px',
                            marginBottom: '32px',
                            width: 'fit-content'
                        }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a84c', display: 'block' }}></span>
                        <span style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600' }}>
                            AI Legal Platform
                        </span>
                    </motion.div>

                    <h1 style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '68px',
                        fontWeight: '700',
                        lineHeight: '1.05',
                        marginBottom: '24px'
                    }}>
                        Legal Help,<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Powered by AI</span>
                    </h1>

                    <p style={{
                        color: '#555',
                        fontSize: '15px',
                        lineHeight: '1.8',
                        marginBottom: '40px',
                        maxWidth: '480px'
                    }}>
                        {typed}<span style={{ color: '#c9a84c', animation: 'blink 1s infinite' }}>|</span>
                    </p>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
                        <motion.button className="btn-gold"
                            onClick={() => navigate('/register')}
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            Consult AI Now
                        </motion.button>
                        <motion.button className="btn-outline"
                            onClick={() => navigate('/login')}
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            Find a Lawyer
                        </motion.button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {stats.map((stat, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                style={{
                                    padding: '20px',
                                    background: 'rgba(201,168,76,0.03)',
                                    border: '1px solid rgba(201,168,76,0.1)',
                                    borderRadius: '12px'
                                }}>
                                <div style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontSize: '28px',
                                    fontWeight: '700',
                                    background: 'linear-gradient(135deg, #c9a84c, #f0d080)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>{stat.value}</div>
                                <div style={{ color: '#444', fontSize: '12px', marginTop: '4px', letterSpacing: '0.5px' }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right */}
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '80px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}>

                    {/* Background glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px', height: '500px',
                        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }} />

                    {/* Scale of Justice */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: '160px', marginBottom: '40px', filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.3))' }}>
                        ⚖️
                    </motion.div>

                    {/* Images */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxWidth: '480px' }}>
                        {[
                            { img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop', label: 'Legal Consultation' },
                            { img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop', label: 'Law Library' },
                            { img: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=400&h=250&fit=crop', label: 'Court of Law' },
                            { img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop', label: 'Legal Documents' }
                        ].map((item, i) => (
                            <motion.div key={i}
                                style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(201,168,76,0.15)' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ scale: 1.03, borderColor: 'rgba(201,168,76,0.4)' }}>
                                <img src={item.img} alt={item.label}
                                    style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }} />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    padding: '8px 12px',
                                    background: 'linear-gradient(transparent, rgba(5,5,5,0.95))',
                                    fontSize: '11px', color: '#c9a84c', fontWeight: '600',
                                    letterSpacing: '0.5px'
                                }}>{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Services */}
            <div id="services" style={{ padding: '100px 80px', background: '#080808' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>What We Offer</p>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '700' }}>
                        Our <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Services</span>
                    </h2>
                    <div className="divider divider-center" />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                    {services.map((service, i) => (
                        <motion.div key={i}
                            className="card"
                            style={{ textAlign: 'center', cursor: 'pointer' }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, borderColor: 'rgba(201,168,76,0.3)' }}
                            onClick={() => navigate('/register')}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{service.icon}</div>
                            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '700', marginBottom: '10px', color: '#c9a84c' }}>{service.title}</h3>
                            <p style={{ color: '#444', fontSize: '13px', lineHeight: '1.7' }}>{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Specialties */}
            <div id="lawyers" style={{ padding: '80px', background: '#050505' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Expert Lawyers</p>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '700' }}>
                        Find by <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Specialty</span>
                    </h2>
                    <div className="divider divider-center" />
                </motion.div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto 48px' }}>
                    {specialties.map((spec, i) => (
                        <motion.button key={i}
                            style={{
                                padding: '12px 24px',
                                background: 'rgba(201,168,76,0.04)',
                                border: '1px solid rgba(201,168,76,0.15)',
                                borderRadius: '6px',
                                color: '#888',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontFamily: 'Space Grotesk, sans-serif',
                                letterSpacing: '0.5px',
                                transition: 'all 0.3s'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{
                                background: 'rgba(201,168,76,0.12)',
                                borderColor: 'rgba(201,168,76,0.4)',
                                color: '#c9a84c',
                                y: -2
                            }}
                            onClick={() => navigate('/register')}>
                            {spec}
                        </motion.button>
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <motion.button className="btn-gold"
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Find Your Lawyer →
                    </motion.button>
                </div>
            </div>

            {/* Testimonials */}
            <div style={{ padding: '100px 80px', background: '#080808' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px' }}>Testimonials</p>
                    <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '700' }}>
                        Client <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Stories</span>
                    </h2>
                    <div className="divider divider-center" />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
                    {[
                        { name: 'Rajesh Kumar', role: 'Business Owner', text: 'LexAI helped me understand my contract dispute in minutes. The AI chatbot is incredibly knowledgeable and the lawyer it connected me with resolved my case successfully.', rating: 5 },
                        { name: 'Priya Sharma', role: 'HR Manager', text: 'I uploaded a complex employment agreement and got a detailed analysis instantly. Saved me thousands in consultation fees. Highly recommend LexAI!', rating: 5 },
                        { name: 'Vikram Singh', role: 'Startup Founder', text: 'Found the perfect corporate lawyer through LexAI within minutes. The AI case summarizer helped me explain my situation clearly. Outstanding platform!', rating: 5 }
                    ].map((t, i) => (
                        <motion.div key={i}
                            className="card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.25)' }}>
                            <div style={{ color: '#c9a84c', fontSize: '18px', marginBottom: '16px' }}>
                                {'★'.repeat(t.rating)}
                            </div>
                            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.8', marginBottom: '24px', fontStyle: 'italic' }}>
                                "{t.text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #1a1a1a, #333)',
                                    border: '1px solid rgba(201,168,76,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '16px'
                                }}>👤</div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{t.name}</div>
                                    <div style={{ fontSize: '12px', color: '#c9a84c', marginTop: '2px' }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    margin: '0 80px 80px',
                    padding: '80px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))',
                    border: '1px solid rgba(201,168,76,0.15)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '300px', opacity: '0.02', pointerEvents: 'none'
                }}>⚖️</div>
                <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>Get Started Today</p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
                    Justice is One Click Away
                </h2>
                <p style={{ color: '#444', fontSize: '15px', marginBottom: '40px' }}>
                    Join thousands of people who trust LexAI for their legal needs
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <motion.button className="btn-gold"
                        style={{ fontSize: '13px' }}
                        onClick={() => navigate('/register')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Start Free Consultation
                    </motion.button>
                    <motion.button className="btn-outline"
                        style={{ fontSize: '13px' }}
                        onClick={() => navigate('/login')}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Login to Account
                    </motion.button>
                </div>
            </motion.div>

            {/* Footer */}
            <div style={{
                textAlign: 'center', padding: '32px',
                color: '#222', fontSize: '13px',
                borderTop: '1px solid rgba(201,168,76,0.06)',
                letterSpacing: '1px'
            }}>
                © 2026 LEX AI — Built by Hameer Shaik &nbsp;•&nbsp; All Rights Reserved
            </div>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Home;