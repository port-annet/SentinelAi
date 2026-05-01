import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, EyeOff, AlertTriangle, ShieldCheck, Search, Bell, BarChart3, Lock } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container"
    >
      {/* Hero Section */}
      <section className="py-24" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', zIndex: 0 }}></div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ 
              maxWidth: '900px', 
              margin: '0 auto 1.5rem', 
              color: '#ffffffef',
              fontFamily: '"Arvo", "Arvo", system-ui, sans-serif',
              fontSize: '3rem',
              fontWeight: '600',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            Control AI Usage. Prevent Data Leaks. Stay Compliant.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            SentinelAI monitors employee interactions with AI tools in real time, detects sensitive data risks, and provides actionable insights—without compromising privacy.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
          >
            <Link to="/auth" className="btn btn-primary">Get Started</Link>
            <Link to="/contact" className="btn btn-outline">Book Demo</Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="card text-center" 
            style={{ maxWidth: '900px', margin: '0 auto', borderTop: '4px solid var(--danger-color)' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                <ShieldAlert color="var(--danger-color)" size={32} />
              </div>
            </motion.div>
            <motion.h2 variants={itemVariants} style={{ color: 'var(--danger-color)' }} className="mb-8">
              The Hidden Risk in AI Adoption
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ textAlign: 'left', gap: '2rem' }}>
              <motion.div variants={itemVariants}>
                <EyeOff color="var(--text-muted)" size={24} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Unmonitored Usage</h3>
                <p>Employees are using AI tools daily without oversight.</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <AlertTriangle color="var(--text-muted)" size={24} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Data Leaks</h3>
                <p>Sensitive company data is being shared unknowingly.</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Lock color="var(--text-muted)" size={24} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem' }}>High Risk</h3>
                <p>No visibility = no control = high organizational risk.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
              <ShieldCheck color="var(--success-color)" size={32} />
            </div>
            <h2>A Smarter Way to Secure AI Usage</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              SentinelAI acts as a lightweight AI firewall that protects your company data seamlessly.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={itemVariants} className="card text-center">
              <Search color="var(--primary-color)" size={32} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Detects</h3>
              <p>Identifies risky prompts before submission.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card text-center">
              <Bell color="var(--warning-color)" size={32} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Warns</h3>
              <p>Warns users in real time.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card text-center">
              <BarChart3 color="var(--primary-light)" size={32} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Insights</h3>
              <p>Provides company-wide risk insights.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card text-center">
              <ShieldCheck color="var(--success-color)" size={32} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Secures</h3>
              <p>Helps teams stay compliant and secure.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
