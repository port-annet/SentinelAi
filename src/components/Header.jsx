import React from 'react';
import { Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  // Hide header completely on dashboard as it has its own layout
  if (location.pathname === '/dashboard') {
    return null;
  }
  
  // Don't show header links on auth page for a cleaner look
  if (location.pathname === '/auth') {
    return (
      <header className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            <Shield color="var(--primary-color)" size={24} /> SentinelAI
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Link to="/" className="logo">
          <Shield color="var(--primary-color)" size={24} /> SentinelAI
        </Link>
        <nav className="nav-links">
          <Link to="/features" style={{ color: location.pathname === '/features' ? 'var(--primary-color)' : '' }}>Features</Link>
          <Link to="/pricing" style={{ color: location.pathname === '/pricing' ? 'var(--primary-color)' : '' }}>Pricing</Link>
          <Link to="/security" style={{ color: location.pathname === '/security' ? 'var(--primary-color)' : '' }}>Security</Link>
          <Link to="/auth" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Log in</Link>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Book Demo</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
