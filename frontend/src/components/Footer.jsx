import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  
  if (location.pathname === '/auth' || location.pathname === '/dashboard') {
    return null; // Hide on auth and dashboard
  }

  return (
    <footer style={{ background: 'var(--bg-glass-heavy)', backdropFilter: 'blur(10px)', padding: 'var(--spacing-12) 0 var(--spacing-6)', borderTop: 'var(--glass-border)', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Start securing your AI usage today.</h2>
        <Link to="/auth" className="btn btn-primary mb-8">
          Get Started Now <ArrowRight size={18} />
        </Link>
        
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2rem' }}>
          <div className="logo" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontFamily: 'Outfit' }}>
            <Shield color="var(--primary-color)" size={20} /> SentinelAI
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>© {new Date().getFullYear()} SentinelAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
