import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  // Temporarily override the global background image on mount
  useEffect(() => {
    const originalBackgroundImage = document.body.style.backgroundImage;
    const originalBackgroundColor = document.body.style.backgroundColor;
    
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = '#0F172A'; // Blank dark color
    
    return () => {
      // Revert when leaving the Auth page
      document.body.style.backgroundImage = originalBackgroundImage;
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container py-24"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)' }}
    >
      <div className="card" style={{ maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary-color)', color: 'white', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-glow)' }}>
            <Shield size={32} />
          </div>
        </div>
        <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p style={{ marginBottom: '2rem' }}>Secure access to your SentinelAI dashboard.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input type="email" placeholder="you@company.com" style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }} />
            </div>
          </div>
          
          <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%' }}>
            Log In <ArrowRight size={18} />
          </Link>
        </form>
        
        <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
          Don't have an account? <a href="#" style={{ fontWeight: '600' }}>Contact Sales</a>
        </p>
      </div>
    </motion.div>
  );
};

export default AuthPage;
