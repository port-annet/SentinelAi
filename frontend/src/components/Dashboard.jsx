import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, LayoutDashboard, Users, FileText, Settings, Search, ArrowLeft, Download, RefreshCw, Loader } from 'lucide-react';

const API_BASE = 'https://sentinelai-57pr.onrender.com';

// --- Helper: Format relative time ---
function timeAgo(isoString) {
  if (!isoString) return 'Unknown';
  const now = new Date();
  const past = new Date(isoString);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// --- Risk Badge ---
const RiskBadge = ({ risk }) => {
  const colors = {
    HIGH: { bg: 'rgba(239, 68, 68, 0.15)', color: '#FF4D4D', border: '1px solid rgba(239, 68, 68, 0.3)' },
    WARNING: { bg: 'rgba(245, 158, 11, 0.15)', color: '#FCD34D', border: '1px solid rgba(245, 158, 11, 0.3)' },
    SAFE: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34D399', border: '1px solid rgba(52, 211, 153, 0.3)' },
  };
  const style = colors[risk] || colors.SAFE;
  return (
    <span style={{ 
      background: style.bg, 
      color: style.color, 
      border: style.border,
      padding: '0.35rem 0.85rem', 
      borderRadius: '2rem', 
      fontSize: '0.75rem', 
      fontWeight: '800', 
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      boxShadow: `0 0 10px ${style.bg}`
    }}>
      {risk}
    </span>
  );
};

// --- Action Badge (New Corporate Feature) ---
const ActionBadge = ({ log }) => {
  // Parsing the stored "[BLOCK] XXX..." format into a clean UI pill
  let action = "ALLOW";
  if (log.masked_snippet?.startsWith("[BLOCK]")) action = "BLOCK";
  if (log.masked_snippet?.startsWith("[WARN]")) action = "WARN";
  if (log.masked_snippet?.startsWith("[ESCALATE]")) action = "ESCALATE";
  
  const colors = {
    BLOCK: { bg: '#991B1B', color: 'white' },
    ESCALATE: { bg: '#7F1D1D', color: '#FCA5A5', border: '1px solid #FCA5A5' },
    WARN: { bg: '#B45309', color: 'white' },
    ALLOW: { bg: '#065F46', color: 'white' },
  };
  const style = colors[action] || colors.ALLOW;

  return (
    <span style={{ 
      background: style.bg, 
      color: style.color, 
      border: style.border || 'none',
      padding: '0.2rem 0.6rem', 
      borderRadius: '0.25rem', 
      fontSize: '0.7rem', 
      fontWeight: 'bold', 
    }}>
      {action}
    </span>
  );
};

// --- Overview Tab ---
const OverviewContent = ({ stats, logs, loading, onRefresh }) => (
  <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
    <div className="grid grid-cols-1 md:grid-cols-3 mb-8">
      <div className="card">
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Total Prompts Scanned</p>
        <h3 style={{ fontSize: '2.5rem', margin: 0 }}>
          {loading ? <Loader size={28} className="spin" /> : stats.total_prompts ?? 0}
        </h3>
      </div>
      <div className="card" style={{ borderTop: '4px solid var(--danger-color)' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>High Risk Alerts</p>
        <h3 className="text-danger" style={{ fontSize: '2.5rem', margin: 0 }}>
          {loading ? <Loader size={28} /> : stats.high_risk_alerts ?? 0}
        </h3>
      </div>
      <div className="card">
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Active Users</p>
        <h3 style={{ fontSize: '2.5rem', margin: 0 }}>
          {loading ? <Loader size={28} /> : stats.active_users ?? 0}
        </h3>
      </div>
    </div>

    <div className="card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Live Alerts</h3>
        <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={onRefresh}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <Loader size={32} style={{ margin: '0 auto 1rem' }} />
          <p style={{ margin: 0 }}>Loading live data...</p>
        </div>
      ) : logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <Shield size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <p style={{ margin: 0 }}>No prompts logged yet. Try typing in ChatGPT with the extension active.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Time</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Employee Identity</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Risk Level</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Policy Action</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Reason</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Masked Payload</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s', ':hover': { background: 'rgba(255,255,255,0.02)'} }}>
                  <td style={{ padding: '1.2rem 0', color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{timeAgo(log.timestamp)}</td>
                  <td style={{ padding: '1.2rem 0', fontWeight: '600', fontSize: '0.9rem', color: log.user_id !== 'anonymous' ? '#60A5FA' : 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                        {log.user_id?.charAt(0).toUpperCase() || '?'}
                      </div>
                      {log.user_id}
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 0' }}><RiskBadge risk={log.risk_type} /></td>
                  <td style={{ padding: '1.2rem 0' }}><ActionBadge log={log} /></td>
                  <td style={{ padding: '1.2rem 0', color: '#9CA3AF', fontSize: '0.85rem', maxWidth: '200px' }}>{log.reason}</td>
                  <td style={{ padding: '1.2rem 0', fontFamily: '"JetBrains Mono", monospace', color: '#D1D5DB', fontSize: '0.8rem', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', paddingLeft: '8px' }}>
                    {log.masked_snippet?.replace(/^\[.*?\]\s*/, '')} {/* Strips the action tag before showing content */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </motion.div>
);

// --- User Insights Tab ---
const UserInsightsContent = ({ logs, loading }) => {
  const userMap = {};
  logs.forEach(log => {
    if (!userMap[log.user_id]) userMap[log.user_id] = { high: 0, warning: 0, safe: 0, total: 0 };
    userMap[log.user_id][log.risk_type?.toLowerCase() === 'high' ? 'high' : log.risk_type?.toLowerCase() === 'warning' ? 'warning' : 'safe']++;
    userMap[log.user_id].total++;
  });
  const users = Object.entries(userMap).sort((a, b) => b[1].high - a[1].high);

  return (
    <motion.div key="insights" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>User Risk Breakdown</h3>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}><Loader size={32} style={{ margin: '0 auto' }} /></div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <p style={{ margin: 0 }}>No user data yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>User</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>High Risk</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Warnings</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Safe</th>
                <th style={{ padding: '1rem 0', fontWeight: '500' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {users.map(([userId, counts], idx) => (
                <tr key={userId} style={{ borderTop: idx > 0 ? '1px solid var(--border-color)' : 'none' }}>
                  <td style={{ padding: '1.2rem 0', fontWeight: '500' }}>{userId}</td>
                  <td style={{ padding: '1.2rem 0', color: 'var(--danger-color)', fontWeight: 'bold' }}>{counts.high}</td>
                  <td style={{ padding: '1.2rem 0', color: 'var(--warning-color)' }}>{counts.warning}</td>
                  <td style={{ padding: '1.2rem 0', color: 'var(--success-color)' }}>{counts.safe}</td>
                  <td style={{ padding: '1.2rem 0', color: 'var(--text-muted)' }}>{counts.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

// --- Reports Tab ---
const ReportsContent = ({ logs }) => {
  const csvData = logs.map(l => `${l.id},${l.user_id},${l.risk_type},${l.reason?.replace(/,/g, ';')},${l.timestamp}`).join('\n');
  const csvBlob = new Blob([`id,user_id,risk_type,reason,timestamp\n${csvData}`], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(csvBlob);

  return (
    <motion.div key="reports" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
          <FileText size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Compliance Export</h3>
          <p style={{ marginBottom: '1.5rem' }}>Full CSV export of all {logs.length} masked log entries for auditing.</p>
          <a className="btn btn-primary" href={csvUrl} download="sentinel_logs.csv" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Download CSV
          </a>
        </div>
        <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem' }}>
          <Shield size={48} color="var(--success-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>System Status</h3>
          <p style={{ marginBottom: '1.5rem' }}>Backend API is online and logging prompts in real time.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '0.5rem 1.2rem', borderRadius: '2rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 8px var(--success-color)' }} />
            <span style={{ color: 'var(--success-color)', fontWeight: '600', fontSize: '0.9rem' }}>API Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Settings Tab ---
const SettingsContent = () => {
  const [masking, setMasking] = useState(true);
  const [alerts, setAlerts] = useState(false);
  return (
    <motion.div key="settings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <div className="card">
        <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>Global Settings</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.25rem' }}>Strict Data Masking</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Automatically redact all PII, API keys, and sensitive structures before logging.</p>
          </div>
          <div onClick={() => setMasking(!masking)} style={{ width: '44px', height: '24px', backgroundColor: masking ? 'var(--success-color)' : 'var(--border-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: masking ? '22px' : '2px', transition: 'left 0.3s' }}></div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.25rem' }}>Alert Notifications</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Send an email to admins when a HIGH risk prompt is intercepted.</p>
          </div>
          <div onClick={() => setAlerts(!alerts)} style={{ width: '44px', height: '24px', backgroundColor: alerts ? 'var(--success-color)' : 'var(--border-color)', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: alerts ? '22px' : '2px', transition: 'left 0.3s' }}></div>
          </div>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/logs?limit=100`), // Fetch more logs for the corporate dashboard
        fetch(`${API_BASE}/stats`)
      ]);
      if (!logsRes.ok || !statsRes.ok) throw new Error('API error');
      const [logsData, statsData] = await Promise.all([logsRes.json(), statsRes.json()]);
      setLogs(logsData);
      setStats(statsData);
    } catch (err) {
      setError('Could not connect to backend. Make sure the API is live.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // Auto-refresh every 15s
    return () => clearInterval(interval);
  }, [fetchData]);

  const getNavStyle = (tabName) => ({
    padding: '0.75rem',
    borderRadius: 'var(--radius-md)',
    background: activeTab === tabName ? 'rgba(96, 165, 250, 0.15)' : 'transparent',
    fontWeight: activeTab === tabName ? '600' : '400',
    color: activeTab === tabName ? 'var(--primary-color)' : 'var(--text-muted)',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.2s', cursor: 'pointer', border: 'none',
    width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: '1rem'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--bg-glass-heavy)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: 'var(--glass-border)', padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', marginBottom: '2rem' }}>
          <Shield size={24} /> SentinelAI
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <button onClick={() => setActiveTab('overview')} style={getNavStyle('overview')}><LayoutDashboard size={18} /> Overview</button>
          <button onClick={() => setActiveTab('insights')} style={getNavStyle('insights')}><Users size={18} /> User Insights</button>
          <button onClick={() => setActiveTab('reports')} style={getNavStyle('reports')}><FileText size={18} /> Reports</button>
          <button onClick={() => setActiveTab('settings')} style={getNavStyle('settings')}><Settings size={18} /> Settings</button>
        </nav>
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          {!loading && !error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--success-color)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 6px var(--success-color)' }} />
              Live — auto-refreshes every 15s
            </div>
          )}
          {error && (
            <div style={{ fontSize: '0.75rem', color: 'var(--danger-color)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
              {error}
            </div>
          )}
          <Link to="/" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <ArrowLeft size={18} /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--spacing-8)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)', background: 'var(--bg-glass)', backdropFilter: 'blur(16px)', padding: '1rem 2rem', borderRadius: 'var(--radius-lg)', border: 'var(--glass-border)' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', textTransform: 'capitalize' }}>
            {activeTab === 'insights' ? 'User Insights' : activeTab}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
              <input type="text" placeholder="Search logs..." style={{ padding: '0.5rem 1rem 0.5rem 2.2rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', outline: 'none', color: 'white', fontSize: '0.9rem', width: '200px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>Admin</span>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color) 0%, #3B82F6 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: 'var(--shadow-glow)' }}>A</div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <OverviewContent key="overview" stats={stats} logs={logs} loading={loading} onRefresh={fetchData} />}
          {activeTab === 'insights' && <UserInsightsContent key="insights" logs={logs} loading={loading} />}
          {activeTab === 'reports' && <ReportsContent key="reports" logs={logs} />}
          {activeTab === 'settings' && <SettingsContent key="settings" />}
        </AnimatePresence>
      </main>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin { animation: spin 1.2s linear infinite; }`}</style>
    </div>
  );
};

export default Dashboard;
