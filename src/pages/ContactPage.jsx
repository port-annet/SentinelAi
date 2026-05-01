import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container py-24"
    >
      <div className="text-center mb-8">
        <h1 style={{ color: 'var(--primary-color)' }}>Book a Demo</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          See exactly how SentinelAI protects your organization's sensitive data from unauthorized AI sharing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>What to expect</h2>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
              <Video color="var(--primary-color)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Live Product Tour</h3>
              <p style={{ fontSize: '0.95rem' }}>We'll walk you through the dashboard, real-time alerts, and configuration settings.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
              <Clock color="var(--primary-color)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>30-Minute Session</h3>
              <p style={{ fontSize: '0.95rem' }}>Quick, insightful, and focused entirely on your specific security needs.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', height: 'fit-content', boxShadow: 'var(--shadow-sm)' }}>
              <Calendar color="var(--primary-color)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Custom Setup Plan</h3>
              <p style={{ fontSize: '0.95rem' }}>Discuss how SentinelAI can be deployed across your specific tech stack.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1.5rem' }}>Request a Time</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>First Name</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Last Name</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Work Email</label>
              <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Company Size</label>
              <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', background: 'white' }}>
                <option>1-50 employees</option>
                <option>51-200 employees</option>
                <option>201-1000 employees</option>
                <option>1000+ employees</option>
              </select>
            </div>
            <button className="btn btn-primary mt-8" style={{ width: '100%' }}>
              Submit Request <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
