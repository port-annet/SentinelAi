import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertOctagon, LayoutDashboard, Users, Shield, LineChart, BrainCircuit, Cpu } from 'lucide-react';

const FeaturesPage = () => {
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
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '2.5rem' }}
          >
            SentinelAI v1 – Full Stack Intelligence
          </motion.h1>
        </div>

        {/* Top Feature Highlights */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <motion.div variants={itemVariants} className="card">
            <Activity color="var(--primary-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Real-Time Monitoring</h3>
            <p>Detects sensitive data before it’s sent and works directly inside AI tools like ChatGPT, Claude, Gemini, etc.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card" style={{ borderTop: "3px solid var(--warning-color)" }}>
            <Activity color="var(--warning-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Clipboard Risk Detection</h3>
            <p>Monitors clipboard copy events globally. Native OS warnings alert you instantly if you copy sensitive keys, passwords, or PII.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card" style={{ borderTop: "3px solid var(--danger-color)" }}>
            <LayoutDashboard color="var(--danger-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Context-Aware Input Guard</h3>
            <p>Intercepts form submissions and large input fields globally across ANY site to prevent unknown AI tool leaks.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card">
            <AlertOctagon color="var(--warning-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Risk Classification</h3>
            <p>Our intelligent engine categorizes prompts into Safe, Warning, and High Risk.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card">
            <LayoutDashboard color="var(--success-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Risk Dashboard</h3>
            <p>Visual overview of daily risk activity, trends over time, and risk categories.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--primary-color)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
              PREMIUM
            </div>
            <Users color="var(--primary-light)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>User Intelligence</h3>
            <p>Identify repeated risky behavior, track risk frequency, and highlight users needing attention.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card">
            <Shield color="var(--text-main)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Privacy-First Design</h3>
            <p>Built-in data masking, configurable logging, and transparent tracking.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card">
            <LineChart color="var(--primary-color)" size={32} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Reports & Insights</h3>
            <p>Weekly summaries, risk trend analysis, and actionable recommendations.</p>
          </motion.div>
        </motion.div>

        {/* The 7 Layers Section */}
        <div className="my-32" style={{ marginTop: '12rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-4xl font-bold mb-16" 
            style={{ color: 'var(--text-main)', fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}
          >
            Engineered To Intercept Everything.
          </motion.h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { num: 1, title: "Platform Detection", desc: "Monitors known AI environments like ChatGPT, Claude, and Gemini.", color: "var(--text-muted)" },
              { num: 2, title: "Clipboard Monitoring", desc: "Hooks into OS-level copy events to warn you before data is even pasted.", color: "var(--text-muted)" },
              { num: 3, title: "Input Field Monitoring", desc: "Intercepts unknown and invisible form submissions across any web page.", color: "var(--text-muted)" },
              { num: 4, title: "Pattern Detection Engine", desc: "Employs Local Rules + AI Classification to identify high-risk PII data.", color: "var(--text-muted)" },
              { num: 5, title: "Policy Engine", desc: "The Brain. Decides next steps (Warn, Block, Notify Admin) dynamically based on risk severity.", color: "var(--text-muted)" },
              { num: 6, title: "Behavioral Learning", desc: "Lightweight memory tracks repeated risky behavior, establishing stricter escalation per user.", color: "var(--text-muted)" },
              { num: 7, title: "Dashboard & Alerts", desc: "Actionable analytics, alerts, and reporting to keep administrators informed natively.", color: "var(--text-muted)" }
            ].map((layer, idx) => (
              <motion.div 
                key={layer.num}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="card flex items-center justify-between"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '2rem',
                  borderLeft: layer.special ? `4px solid ${layer.color}` : '1px solid rgba(255,255,255,0.1)',
                  background: layer.special ? `linear-gradient(90deg, rgba(${layer.num === 5 ? '225,29,72' : '139,92,246'}, 0.1) 0%, var(--bg-glass) 100%)` : 'var(--bg-glass)',
                }}
              >
                <div style={{ minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '3rem', fontWeight: '800', color: layer.color, lineHeight: '1', opacity: layer.special ? 1 : 0.5 }}>{layer.num}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Layer</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.5rem', color: layer.special ? layer.color : 'white', marginBottom: '0.5rem' }}>{layer.title}</h4>
                  <p style={{ margin: 0, fontSize: '1.1rem' }}>{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesPage;
