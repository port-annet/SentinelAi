import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
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
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            Choose the plan that fits your organization's security needs.
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="card text-center" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h3>
            <p className="mb-8" style={{ minHeight: '40px', fontSize: '0.95rem' }}>Perfect for small teams getting started with AI.</p>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-main)' }}>
              $49<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mo</span>
            </div>
            
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--success-color)" size={18} /> Basic monitoring
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--success-color)" size={18} /> Dashboard access
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--success-color)" size={18} /> 500 prompts/month
              </li>
            </ul>
            <button className="btn btn-outline" style={{ width: '100%' }}>Choose Starter</button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card text-center" style={{ border: '2px solid var(--primary-color)', position: 'relative', display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', zIndex: 10 }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--primary-color) 0%, #3B82F6 100%)', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 'bold', boxShadow: 'var(--shadow-md)' }}>
              Most Popular
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>Pro</h3>
            <p className="mb-8" style={{ minHeight: '40px', fontSize: '0.95rem' }}>For growing organizations needing deep insights.</p>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-main)' }}>
              $149<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mo</span>
            </div>
            
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: '500' }}>
                <Check color="var(--primary-color)" size={18} /> Everything in Starter
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--primary-color)" size={18} /> User risk insights
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--primary-color)" size={18} /> Advanced analytics
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--primary-color)" size={18} /> Unlimited prompts
              </li>
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }}>Choose Pro</button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="card text-center" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise</h3>
            <p className="mb-8" style={{ minHeight: '40px', fontSize: '0.95rem' }}>Full control and compliance tools for large orgs.</p>
            
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-main)' }}>
              Custom
            </div>
            
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: '500' }}>
                <Check color="var(--text-main)" size={18} /> Everything in Pro
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--text-main)" size={18} /> Full unmasked logs (Optional)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--text-main)" size={18} /> Admin controls & SSO
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Check color="var(--text-main)" size={18} /> Compliance export tools
              </li>
            </ul>
            <Link to="/contact" className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              Contact Sales <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PricingPage;
