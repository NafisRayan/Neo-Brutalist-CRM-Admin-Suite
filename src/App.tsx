import { useState } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Edit2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Zap,
  Calendar,
  MessageSquare,
  MoreVertical,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const NeoButton = ({ children, variant = 'primary', className = '', onClick }: any) => {
  const variants: any = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white text-black',
    yellow: 'bg-neo-yellow text-black',
    green: 'bg-neo-green text-black',
    pink: 'bg-neo-pink text-black',
    black: 'bg-black text-white',
  };

  return (
    <button 
      onClick={onClick}
      className={`neo-border neo-shadow-sm font-black uppercase tracking-widest px-4 py-2 neo-transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const NeoCard = ({ children, className = '', title }: any) => (
  <div className={`bg-white neo-border-thick neo-shadow p-6 ${className}`}>
    {title && <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{title}</h3>}
    {children}
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 neo-border font-black uppercase text-sm transition-colors ${
      active ? 'bg-primary text-white neo-shadow-sm' : 'bg-white hover:bg-primary/10'
    }`}
  >
    <Icon size={18} />
    <span className="hidden lg:inline">{label}</span>
  </button>
);

// --- Views ---

const UserDirectory = () => {
  const users = [
    { name: 'Alex Rivera', role: 'Admin', status: 'Active', lastActive: '2 mins ago', color: 'bg-primary/20 text-primary' },
    { name: 'Jordan Smith', role: 'Editor', status: 'Active', lastActive: '1 hour ago', color: 'bg-slate-200' },
    { name: 'Taylor Wong', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', color: 'bg-slate-200' },
    { name: 'Morgan Lee', role: 'Admin', status: 'Active', lastActive: 'Just now', color: 'bg-primary/20 text-primary' },
    { name: 'Casey Cross', role: 'Editor', status: 'Pending', lastActive: 'Never', color: 'bg-slate-200' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Team Members</h2>
          <p className="font-bold text-slate-500 mt-2 uppercase text-sm">Manage your organization's users and their access levels.</p>
        </div>
        <NeoButton variant="primary" className="px-6 py-3">
          + Add User
        </NeoButton>
      </div>

      <NeoCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b-4 border-black">
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black">Name</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black">Role</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black">Status</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black">Last Active</th>
                <th className="p-4 font-black uppercase text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 neo-border bg-slate-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${user.name}/100`} alt={user.name} referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-black text-sm uppercase">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <span className={`neo-border px-3 py-1 font-black text-[10px] uppercase ${user.color}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <span className="flex items-center gap-2 font-bold text-xs uppercase">
                      <span className={`w-3 h-3 neo-border ${user.status === 'Active' ? 'bg-green-500' : user.status === 'Inactive' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-black font-bold text-xs uppercase text-slate-500">{user.lastActive}</td>
                  <td className="p-4 text-center">
                    <button className="neo-border px-4 py-1 font-black text-[10px] uppercase hover:bg-black hover:text-white transition-all">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeoCard>

      <div className="flex justify-center items-center gap-2">
        <NeoButton variant="secondary" className="w-10 h-10 p-0 flex items-center justify-center"><ChevronLeft size={20} /></NeoButton>
        <NeoButton variant="primary" className="w-10 h-10 p-0 flex items-center justify-center">1</NeoButton>
        <NeoButton variant="secondary" className="w-10 h-10 p-0 flex items-center justify-center">2</NeoButton>
        <NeoButton variant="secondary" className="w-10 h-10 p-0 flex items-center justify-center">3</NeoButton>
        <NeoButton variant="secondary" className="w-10 h-10 p-0 flex items-center justify-center"><ChevronRight size={20} /></NeoButton>
      </div>
    </div>
  );
};

const AnalyticsView = () => (
  <div className="space-y-8">
    <div className="bg-primary/10 neo-border-thick p-8 neo-shadow">
      <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4">
        Global <span className="text-primary italic">Analytics</span> Overview
      </h1>
      <p className="text-xl font-bold border-l-4 border-black pl-4">
        Real-time performance monitoring and volume trends across all active clusters.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <NeoCard className="bg-white">
        <p className="text-sm font-black uppercase text-slate-500 mb-1">Total Volume</p>
        <p className="text-4xl font-black mb-2">1.2M</p>
        <span className="neo-border bg-green-400 px-2 py-1 text-xs font-black uppercase">+12.5%</span>
      </NeoCard>
      <NeoCard className="bg-white">
        <p className="text-sm font-black uppercase text-slate-500 mb-1">Active Users</p>
        <p className="text-4xl font-black mb-2">45.8K</p>
        <span className="neo-border bg-red-400 px-2 py-1 text-xs font-black uppercase">-2.1%</span>
      </NeoCard>
      <NeoCard className="bg-white">
        <p className="text-sm font-black uppercase text-slate-500 mb-1">Conversion</p>
        <p className="text-4xl font-black mb-2">3.2%</p>
        <span className="neo-border bg-green-400 px-2 py-1 text-xs font-black uppercase">+0.4%</span>
      </NeoCard>
      <NeoCard className="bg-white">
        <p className="text-sm font-black uppercase text-slate-500 mb-1">Avg Latency</p>
        <p className="text-4xl font-black mb-2">120ms</p>
        <span className="neo-border bg-black text-white px-2 py-1 text-xs font-black uppercase">-5.0%</span>
      </NeoCard>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <NeoCard className="lg:col-span-2" title="Volume Trends">
        <div className="h-64 flex items-end justify-between gap-2 mt-8">
          {[40, 65, 80, 55, 95, 45, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/20 neo-border relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-primary transition-all group-hover:bg-black" 
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-black uppercase text-slate-500">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </NeoCard>

      <NeoCard title="Platform Distribution">
        <div className="space-y-6 mt-4">
          {[
            { label: 'Cloud Services', val: 42, color: 'bg-primary' },
            { label: 'Mobile Direct', val: 31, color: 'bg-neo-yellow' },
            { label: 'API Partners', val: 18, color: 'bg-neo-green' },
            { label: 'Other Legacy', val: 9, color: 'bg-black' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between font-black uppercase text-xs mb-2">
                <span>{item.label}</span>
                <span>{item.val}%</span>
              </div>
              <div className="h-6 neo-border bg-slate-100 p-1">
                <div className={`h-full neo-border ${item.color}`} style={{ width: `${item.val}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </NeoCard>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Automation<br/>Overview</h1>
        <p className="text-lg font-bold bg-neo-green/30 inline-block px-2">SYSTEM STATUS: OPTIMAL // 24 ACTIVE NODES</p>
      </div>
      <NeoButton variant="primary" className="px-8 py-3">Create New Rule</NeoButton>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <NeoCard title="System Performance">
          <div className="h-64 relative flex items-end justify-between gap-1 mt-8">
            {[30, 80, 45, 90, 65, 85, 40].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/10 neo-border relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-primary transition-all group-hover:bg-neo-pink" 
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-black uppercase">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </NeoCard>

        <NeoCard title="Recent Executions">
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-black text-xs font-black uppercase bg-slate-50">
                  <th className="px-4 py-3 border-r-2 border-black">Rule Name</th>
                  <th className="px-4 py-3 border-r-2 border-black">Status</th>
                  <th className="px-4 py-3 border-r-2 border-black">Duration</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {[
                  { name: 'Invoice Processing', status: 'Success', dur: '1.2s', time: 'Oct 24, 14:02:11', color: 'bg-neo-green' },
                  { name: 'Backup Cloud Storage', status: 'Success', dur: '45.8s', time: 'Oct 24, 13:55:00', color: 'bg-neo-green' },
                  { name: 'Websocket Handshake', status: 'Failed', dur: '0.4s', time: 'Oct 24, 13:48:22', color: 'bg-neo-pink' },
                ].map((row, i) => (
                  <tr key={i} className="border-b-2 border-black hover:bg-slate-50">
                    <td className="px-4 py-3 border-r-2 border-black uppercase">{row.name}</td>
                    <td className="px-4 py-3 border-r-2 border-black">
                      <span className={`${row.color} neo-border px-2 py-0.5 text-[10px] font-black uppercase`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3 border-r-2 border-black">{row.dur}</td>
                    <td className="px-4 py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeoCard>
      </div>

      <div className="space-y-6">
        <NeoCard title="Live Rules">
          <div className="space-y-4 mt-4">
            {[
              { label: 'Data Sync', desc: 'Syncing CRM with Marketing Cloud', status: 'bg-neo-green' },
              { label: 'Lead Scoring', desc: 'Processing incoming leads', status: 'bg-neo-yellow' },
              { label: 'Error Alert', desc: 'Notifying Slack on timeouts', status: 'bg-neo-pink' },
            ].map((rule, i) => (
              <div key={i} className={`neo-border p-4 ${rule.status}/10 border-black hover:shadow-neo transition-all cursor-pointer`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-black uppercase text-sm">{rule.label}</span>
                  <div className={`w-3 h-3 neo-border ${rule.status}`}></div>
                </div>
                <p className="text-xs font-bold text-slate-600">{rule.desc}</p>
              </div>
            ))}
          </div>
          <NeoButton variant="secondary" className="w-full mt-4 py-3 text-xs">View All 24 Rules</NeoButton>
        </NeoCard>

        <NeoCard className="bg-black text-white">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-white flex items-center justify-center neo-border">
              <Zap className="text-black" size={24} />
            </div>
            <div>
              <p className="font-black uppercase text-[10px] opacity-70">System Health</p>
              <h4 className="text-lg font-black tracking-tighter uppercase">Operational</h4>
              <div className="w-full bg-slate-800 h-1.5 mt-1 neo-border border-white/20">
                <div className="bg-neo-green h-full w-full"></div>
              </div>
            </div>
          </div>
        </NeoCard>
      </div>
    </div>
  </div>
);

const RolesView = () => {
  const permissions = [
    { module: 'User Management', read: true, write: true, delete: false },
    { module: 'Analytics Dashboard', read: true, write: false, delete: false },
    { module: 'System Settings', read: true, write: true, delete: true },
    { module: 'Automation Rules', read: true, write: true, delete: false },
    { module: 'Billing & Invoices', read: true, write: false, delete: false },
    { module: 'API Access', read: false, write: false, delete: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Roles & <span className="text-neo-pink">Permissions</span></h2>
        <NeoButton variant="pink">Save Changes</NeoButton>
      </div>

      <NeoCard title="Admin Role Configuration">
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-black bg-slate-50">
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black">Module</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black text-center">Read</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black text-center">Write</th>
                <th className="p-4 font-black uppercase text-sm text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-neo-pink/5 transition-colors">
                  <td className="p-4 border-r-2 border-black font-black uppercase text-xs">{p.module}</td>
                  <td className="p-4 border-r-2 border-black text-center">
                    <input type="checkbox" defaultChecked={p.read} className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" />
                  </td>
                  <td className="p-4 border-r-2 border-black text-center">
                    <input type="checkbox" defaultChecked={p.write} className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" />
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" defaultChecked={p.delete} className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeoCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeoCard title="Security Policy">
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 neo-border accent-black" />
              <label className="text-xs font-black uppercase">Require 2FA for all admins</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 neo-border accent-black" />
              <label className="text-xs font-black uppercase">Auto-lock after 15 mins inactivity</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 neo-border accent-black" />
              <label className="text-xs font-black uppercase">Restrict login by IP range</label>
            </div>
          </div>
        </NeoCard>
        <NeoCard title="Audit Log">
          <div className="space-y-3 mt-2">
            {[
              { user: 'Alex R.', action: 'Updated Role: Editor', time: '10m ago' },
              { user: 'System', action: 'Auto-backup completed', time: '1h ago' },
              { user: 'Morgan L.', action: 'Deleted User: Taylor W.', time: '3h ago' },
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase border-b border-black/10 pb-2">
                <span><span className="font-black">{log.user}</span> {log.action}</span>
                <span className="text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </NeoCard>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState('users');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <UserDirectory />;
      case 'analytics': return <AnalyticsView />;
      case 'roles': return <RolesView />;
      default: return <UserDirectory />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="neo-border-thick bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 m-4 neo-shadow">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary neo-border p-2 flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">BrutalSuite</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setActiveView('users')} className={`text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4 ${activeView === 'users' ? 'underline' : ''}`}>Directory</button>
            <button onClick={() => setActiveView('roles')} className={`text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4 ${activeView === 'roles' ? 'underline' : ''}`}>Roles</button>
            <button className="text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4">Teams</button>
            <button className="text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4">Settings</button>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <div className="relative max-w-xs w-full hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-500" size={18} />
            </div>
            <input 
              className="neo-border bg-white w-full py-2 pl-10 pr-4 text-sm font-bold focus:ring-0 focus:outline-none uppercase" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <NeoButton variant="secondary" className="p-2"><Bell size={20} /></NeoButton>
            <NeoButton variant="secondary" className="p-2"><User size={20} /></NeoButton>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex flex-col gap-4">
          <div className="neo-border-thick bg-white p-4 neo-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 neo-border overflow-hidden bg-primary/10 flex items-center justify-center">
                <Zap className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="font-black text-sm uppercase">CorpAdmin</h1>
                <p className="text-xs font-bold text-primary">Enterprise</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={activeView === 'dashboard'} 
                onClick={() => setActiveView('dashboard')} 
              />
              <SidebarItem 
                icon={Users} 
                label="Users" 
                active={activeView === 'users'} 
                onClick={() => setActiveView('users')} 
              />
              <SidebarItem 
                icon={ShieldCheck} 
                label="Roles" 
                active={activeView === 'roles'} 
                onClick={() => setActiveView('roles')} 
              />
              <SidebarItem 
                icon={BarChart3} 
                label="Analytics" 
                active={activeView === 'analytics'} 
                onClick={() => setActiveView('analytics')} 
              />
              <SidebarItem 
                icon={Settings} 
                label="Settings" 
                active={activeView === 'settings'} 
                onClick={() => setActiveView('settings')} 
              />
            </nav>
          </div>

          <div className="neo-border bg-primary/10 p-4">
            <p className="text-[10px] font-black uppercase mb-2">Storage Status</p>
            <div className="h-4 w-full neo-border bg-white">
              <div className="h-full bg-primary" style={{ width: '65%' }}></div>
            </div>
            <p className="text-[10px] font-black uppercase mt-1">65% Capacity</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer Stats */}
      <footer className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neo-border bg-white p-4 neo-shadow-sm flex justify-between items-center">
          <span className="text-xs font-black uppercase tracking-widest">Total Users</span>
          <span className="text-2xl font-black">1,284</span>
        </div>
        <div className="neo-border bg-white p-4 neo-shadow-sm flex justify-between items-center">
          <span className="text-xs font-black uppercase tracking-widest">Active Now</span>
          <span className="text-2xl font-black text-green-500">42</span>
        </div>
        <div className="neo-border bg-white p-4 neo-shadow-sm flex justify-between items-center">
          <span className="text-xs font-black uppercase tracking-widest">Pending</span>
          <span className="text-2xl font-black text-yellow-500">18</span>
        </div>
        <div className="neo-border bg-primary text-white p-4 neo-shadow-sm flex justify-between items-center">
          <span className="text-xs font-black uppercase tracking-widest">System Status</span>
          <span className="text-sm font-black uppercase tracking-widest">Stable</span>
        </div>
      </footer>
    </div>
  );
}
