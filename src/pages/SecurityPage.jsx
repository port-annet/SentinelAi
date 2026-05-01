import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, LockKeyhole, Server, FileCheck } from 'lucide-react';

const SecurityPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container py-24"
    >
      <div className="container">
        <div className="card" style={{ color: 'white', border: 'var(--glass-border)' }}>
          <div className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
            >
              <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1.5rem', borderRadius: '50%' }}>
                <ShieldCheck color="#60A5FA" size={48} />
              </div>
            </motion.div>
            <h2 style={{ color: 'white' }}>
              Built with Security at Its Core
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
              We know your data is sensitive. That's why SentinelAI is built on a foundation of zero-trust and complete transparency.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2" 
            style={{ gap: '3rem' }}
          >
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
                <LockKeyhole color="#60A5FA" size={24} />
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Data Encryption</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: '1rem' }}>End-to-end encrypted communication via TLS 1.3 and encrypted sensitive logs at rest using AES-256.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
                <Database color="#60A5FA" size={24} />
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Data Minimization</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: '1rem' }}>We never store full prompts by default. We only store the detected risk type, timestamp, user ID, and a heavily masked snippet.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
                <ShieldCheck color="#60A5FA" size={24} />
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Role-Based Access</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: '1rem' }}>Granular access control (Admin, Manager, User) ensures employees only see what they are authorized to see.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
                <Server color="#60A5FA" size={24} />
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Secure Infrastructure</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: '1rem' }}>Built on secure cloud infrastructure with strict JWT authentication, auto-rotating keys, and aggressive API rate limiting.</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-16" 
            style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', margin: '0 -2rem -2rem -2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <FileCheck color="#94A3B8" size={20} />
              <h4 style={{ color: 'white', margin: 0 }}>Our Transparency Promise</h4>
            </div>
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '1rem', fontStyle: 'italic' }}>
              "This system monitors AI prompts for security purposes." We mandate this disclosure on all our client deployments.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityPage;
