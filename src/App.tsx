import { useState, useMemo, useEffect } from 'react';
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
  User as UserIcon,
  Trash2,
  Check,
  X,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import type { User, AutomationRule, ExecutionLog, Permission, Notification, AnalyticsData } from './types';
import { 
  MOCK_USERS, 
  MOCK_RULES, 
  MOCK_LOGS, 
  MOCK_PERMISSIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_ANALYTICS 
} from './mockData';

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

const UserDirectory = ({ users, onAdd, onEdit, onDelete }: { 
  users: User[], 
  onAdd: () => void, 
  onEdit: (user: User) => void, 
  onDelete: (id: string) => void 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Team Members</h2>
          <p className="font-bold text-slate-500 mt-2 uppercase text-sm">Manage your organization's users and their access levels.</p>
        </div>
        <NeoButton variant="primary" className="px-6 py-3 flex items-center gap-2" onClick={onAdd}>
          <Plus size={18} /> Add User
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
              {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 border-r-2 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 neo-border bg-slate-200 overflow-hidden">
                        <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-sm uppercase">{user.name}</span>
                        <span className="text-[10px] font-bold text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black">
                    <span className={`neo-border px-3 py-1 font-black text-[10px] uppercase ${user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-slate-200'}`}>
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
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => alert(`Viewing profile for ${user.name}`)}
                        className="neo-border p-2 hover:bg-primary hover:text-white transition-all"
                        title="View Profile"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => onEdit(user)}
                        className="neo-border p-2 hover:bg-neo-yellow transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete(user.id)}
                        className="neo-border p-2 hover:bg-neo-pink hover:text-white transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center font-black uppercase text-slate-400">No users found matching your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </NeoCard>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <NeoButton 
            variant="secondary" 
            className="w-10 h-10 p-0 flex items-center justify-center disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </NeoButton>
          {[...Array(totalPages)].map((_, i) => (
            <NeoButton 
              key={i}
              variant={currentPage === i + 1 ? 'primary' : 'secondary'} 
              className="w-10 h-10 p-0 flex items-center justify-center"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </NeoButton>
          ))}
          <NeoButton 
            variant="secondary" 
            className="w-10 h-10 p-0 flex items-center justify-center disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </NeoButton>
        </div>
      )}
    </div>
  );
};

const AnalyticsView = ({ data }: { data: AnalyticsData[] }) => (
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
        <div className="h-80 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '4px solid #000', 
                  borderRadius: '0', 
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#000" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorVolume)" 
              />
            </AreaChart>
          </ResponsiveContainer>
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

const DashboardView = ({ rules, logs, analytics, onToggleRule, onViewAllRules, onCreateRule }: {
  rules: AutomationRule[],
  logs: ExecutionLog[],
  analytics: AnalyticsData[],
  onToggleRule: (id: string) => void,
  onViewAllRules: () => void,
  onCreateRule: () => void
}) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">Automation<br/>Overview</h1>
        <p className="text-lg font-bold bg-neo-green/30 inline-block px-2">SYSTEM STATUS: OPTIMAL // {rules.filter(r => r.active).length} ACTIVE NODES</p>
      </div>
      <NeoButton variant="primary" className="px-8 py-3" onClick={onCreateRule}>Create New Rule</NeoButton>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <NeoCard title="System Performance">
          <div className="h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '4px solid #000', 
                    borderRadius: '0', 
                    fontWeight: '900',
                    textTransform: 'uppercase'
                  }} 
                />
                <Bar dataKey="active" fill="#000" radius={[4, 4, 0, 0]}>
                  {analytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#ff6321'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
                {logs.map((row) => (
                  <tr key={row.id} className="border-b-2 border-black hover:bg-slate-50">
                    <td className="px-4 py-3 border-r-2 border-black uppercase">{row.name}</td>
                    <td className="px-4 py-3 border-r-2 border-black">
                      <span className={`${row.color} neo-border px-2 py-0.5 text-[10px] font-black uppercase`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3 border-r-2 border-black">{row.duration}</td>
                    <td className="px-4 py-3">{row.timestamp}</td>
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
            {rules.slice(0, 3).map((rule) => (
              <div 
                key={rule.id} 
                onClick={() => onToggleRule(rule.id)}
                className={`neo-border p-4 ${rule.active ? rule.status + '/20' : 'bg-slate-100 opacity-60'} border-black hover:shadow-neo transition-all cursor-pointer relative`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-black uppercase text-sm">{rule.name}</span>
                  <div className={`w-3 h-3 neo-border ${rule.active ? rule.status : 'bg-slate-400'}`}></div>
                </div>
                <p className="text-xs font-bold text-slate-600">{rule.description}</p>
                <div className="absolute top-2 right-8">
                  {rule.active ? <Check size={14} className="text-green-600" /> : <X size={14} className="text-red-600" />}
                </div>
              </div>
            ))}
          </div>
          <NeoButton variant="secondary" className="w-full mt-4 py-3 text-xs" onClick={onViewAllRules}>View All {rules.length} Rules</NeoButton>
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

const RolesView = ({ permissions, auditLogs, securityPolicies, onTogglePermission, onTogglePolicy, onSave }: {
  permissions: Permission[],
  auditLogs: any[],
  securityPolicies: any,
  onTogglePermission: (index: number, field: 'read' | 'write' | 'delete') => void,
  onTogglePolicy: (key: string) => void,
  onSave: () => void
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Roles & <span className="text-neo-pink">Permissions</span></h2>
        <NeoButton variant="pink" onClick={onSave}>Save Changes</NeoButton>
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
                    <input 
                      type="checkbox" 
                      checked={p.read} 
                      onChange={() => onTogglePermission(i, 'read')}
                      className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" 
                    />
                  </td>
                  <td className="p-4 border-r-2 border-black text-center">
                    <input 
                      type="checkbox" 
                      checked={p.write} 
                      onChange={() => onTogglePermission(i, 'write')}
                      className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" 
                    />
                  </td>
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={p.delete} 
                      onChange={() => onTogglePermission(i, 'delete')}
                      className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" 
                    />
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
              <input 
                type="checkbox" 
                checked={securityPolicies.require2FA} 
                onChange={() => onTogglePolicy('require2FA')}
                className="w-5 h-5 neo-border accent-black" 
              />
              <label className="text-xs font-black uppercase">Require 2FA for all admins</label>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={securityPolicies.autoLock} 
                onChange={() => onTogglePolicy('autoLock')}
                className="w-5 h-5 neo-border accent-black" 
              />
              <label className="text-xs font-black uppercase">Auto-lock after 15 mins inactivity</label>
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                checked={securityPolicies.restrictIP} 
                onChange={() => onTogglePolicy('restrictIP')}
                className="w-5 h-5 neo-border accent-black" 
              />
              <label className="text-xs font-black uppercase">Restrict login by IP range</label>
            </div>
          </div>
        </NeoCard>
        <NeoCard title="Audit Log">
          <div className="space-y-3 mt-2">
            {auditLogs.map((log, i) => (
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

const TeamsView = () => {
  const teams = [
    { name: 'Engineering', members: 12, lead: 'Alex Rivera', color: 'bg-primary' },
    { name: 'Design', members: 5, lead: 'Jordan Smith', color: 'bg-neo-pink' },
    { name: 'Marketing', members: 8, lead: 'Riley Quinn', color: 'bg-neo-yellow' },
    { name: 'Support', members: 15, lead: 'Jamie Lane', color: 'bg-neo-green' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter">Team <span className="text-primary">Structures</span></h2>
        <NeoButton variant="primary">+ Create Team</NeoButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team, i) => (
          <NeoCard key={i} title={team.name}>
            <div className="flex justify-between items-center mt-2">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase">Team Lead</p>
                <p className="font-black uppercase">{team.lead}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase">Members</p>
                <p className="text-2xl font-black">{team.members}</p>
              </div>
            </div>
            <div className={`h-2 w-full mt-4 neo-border ${team.color}`}></div>
            <div className="flex gap-2 mt-4">
              <NeoButton variant="secondary" className="flex-1 text-[10px]">Manage</NeoButton>
              <NeoButton variant="secondary" className="flex-1 text-[10px]">Settings</NeoButton>
            </div>
          </NeoCard>
        ))}
      </div>
    </div>
  );
};

const SettingsView = ({ settings, onUpdate }: { settings: any, onUpdate: (key: string, val: any) => void }) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-black uppercase tracking-tighter">System <span className="text-neo-yellow">Settings</span></h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <NeoCard title="General Configuration">
        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase">Organization Name</label>
            <input 
              className="w-full neo-border p-2 font-bold uppercase text-sm" 
              value={settings.orgName} 
              onChange={(e) => onUpdate('orgName', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase">Admin Email</label>
            <input 
              className="w-full neo-border p-2 font-bold text-sm" 
              value={settings.adminEmail} 
              onChange={(e) => onUpdate('adminEmail', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              checked={settings.darkMode} 
              onChange={(e) => onUpdate('darkMode', e.target.checked)}
              className="w-5 h-5 neo-border accent-black" 
            />
            <label className="text-xs font-black uppercase">Enable Dark Mode (Beta)</label>
          </div>
        </div>
      </NeoCard>
      <NeoCard title="API Access Tokens">
        <div className="space-y-4 mt-4">
          <div className="p-3 neo-border bg-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Production Key</p>
              <p className="font-mono text-xs">bs_live_••••••••••••••••</p>
            </div>
            <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('Token Revoked')}>Revoke</NeoButton>
          </div>
          <div className="p-3 neo-border bg-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Staging Key</p>
              <p className="font-mono text-xs">bs_test_••••••••••••••••</p>
            </div>
            <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('Token Revoked')}>Revoke</NeoButton>
          </div>
          <NeoButton variant="primary" className="w-full py-2 text-xs" onClick={() => alert('Generating Token...')}>+ Generate New Token</NeoButton>
        </div>
      </NeoCard>
    </div>
  </div>
);

const ProfileView = ({ user, onUpdate }: { user: User, onUpdate: (u: Partial<User>) => void }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 neo-border-thick overflow-hidden bg-slate-200">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">{user.name}</h2>
          <p className="text-xl font-bold text-primary uppercase">{user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeoCard title="Personal Information">
          <div className="space-y-4 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Full Name</label>
              <input 
                className="w-full neo-border p-2 font-bold uppercase text-sm" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Email Address</label>
              <input 
                className="w-full neo-border p-2 font-bold text-sm" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <NeoButton variant="primary" className="w-full mt-2" onClick={() => onUpdate({ name, email })}>Update Profile</NeoButton>
          </div>
        </NeoCard>

        <NeoCard title="Account Security">
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center p-3 neo-border bg-slate-50">
              <div>
                <p className="text-xs font-black uppercase">Two-Factor Auth</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Enabled via Authenticator App</p>
              </div>
              <NeoButton variant="secondary" className="text-[10px]">Manage</NeoButton>
            </div>
            <div className="flex justify-between items-center p-3 neo-border bg-slate-50">
              <div>
                <p className="text-xs font-black uppercase">Password</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Last changed 3 months ago</p>
              </div>
              <NeoButton variant="secondary" className="text-[10px]">Change</NeoButton>
            </div>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};

const NotificationDropdown = ({ notifications, onMarkRead, onClose }: { 
  notifications: Notification[], 
  onMarkRead: (id: string) => void,
  onClose: () => void
}) => (
  <div className="absolute top-16 right-0 w-80 bg-white neo-border-thick neo-shadow z-[100] p-4">
    <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
      <h3 className="font-black uppercase text-sm">Notifications</h3>
      <button onClick={onClose}><X size={16} /></button>
    </div>
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {notifications.length > 0 ? notifications.map((n) => (
        <div 
          key={n.id} 
          onClick={() => onMarkRead(n.id)}
          className={`p-3 neo-border cursor-pointer transition-all hover:bg-slate-50 ${n.read ? 'opacity-60' : 'bg-primary/5 border-primary'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {n.type === 'success' && <CheckCircle2 size={14} className="text-green-600" />}
            {n.type === 'warning' && <AlertTriangle size={14} className="text-yellow-600" />}
            {n.type === 'error' && <XCircle size={14} className="text-red-600" />}
            {n.type === 'info' && <Info size={14} className="text-blue-600" />}
            <span className="font-black uppercase text-[10px]">{n.title}</span>
          </div>
          <p className="text-[10px] font-bold leading-tight mb-1">{n.message}</p>
          <p className="text-[8px] font-black text-slate-400 uppercase">{n.time}</p>
        </div>
      )) : (
        <p className="text-center py-8 text-xs font-black uppercase text-slate-400">No new notifications</p>
      )}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [rules, setRules] = useState<AutomationRule[]>(MOCK_RULES);
  const [permissions, setPermissions] = useState<Permission[]>(MOCK_PERMISSIONS);
  const [logs] = useState<ExecutionLog[]>(MOCK_LOGS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [analytics] = useState<AnalyticsData[]>(MOCK_ANALYTICS);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [securityPolicies, setSecurityPolicies] = useState({
    require2FA: true,
    autoLock: false,
    restrictIP: true
  });
  const [settings, setSettings] = useState({
    orgName: 'BrutalSuite Enterprise',
    adminEmail: 'admin@brutalsuite.io',
    darkMode: false
  });
  const [auditLogs, setAuditLogs] = useState([
    { user: 'Alex R.', action: 'Updated Role: Editor', time: '10m ago' },
    { user: 'System', action: 'Auto-backup completed', time: '1h ago' },
    { user: 'Morgan L.', action: 'Deleted User: Taylor W.', time: '3h ago' },
  ]);

  const currentUser = users[0]; // Alex Rivera

  const filteredUsers = useMemo(() => {
    if (!globalSearch) return users;
    const s = globalSearch.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(s) || 
      u.email.toLowerCase().includes(s) ||
      u.role.toLowerCase().includes(s)
    );
  }, [users, globalSearch]);

  const handleUpdateProfile = (updates: Partial<User>) => {
    setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    alert('Profile updated successfully!');
    setActiveView('dashboard');
  };

  const handleTogglePolicy = (key: string) => {
    setSecurityPolicies(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleUpdateSettings = (key: string, val: any) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleAddUser = () => {
    const name = prompt('Enter user name:');
    if (!name) return;
    const email = prompt('Enter email:');
    if (!email) return;
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'Viewer',
      status: 'Pending',
      lastActive: 'Never',
      avatar: `https://picsum.photos/seed/${name}/100`
    };
    setUsers([newUser, ...users]);
  };

  const handleEditUser = (user: User) => {
    const newName = prompt('Edit name:', user.name);
    if (!newName) return;
    setUsers(users.map(u => u.id === user.id ? { ...u, name: newName } : u));
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleTogglePermission = (index: number, field: 'read' | 'write' | 'delete') => {
    const newPermissions = [...permissions];
    newPermissions[index] = {
      ...newPermissions[index],
      [field]: !newPermissions[index][field]
    };
    setPermissions(newPermissions);
  };

  const handleSavePermissions = () => {
    alert('Permissions saved successfully!');
  };

  const handleAddRule = () => {
    const name = prompt('Rule Name:');
    if (!name) return;
    const description = prompt('Description:');
    if (!description) return;
    
    const newRule: AutomationRule = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      status: 'bg-neo-green',
      active: true
    };
    setRules([newRule, ...rules]);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return (
        <DashboardView 
          rules={rules} 
          logs={logs} 
          analytics={analytics}
          onToggleRule={handleToggleRule} 
          onViewAllRules={() => alert(`Total Rules: ${rules.length}`)} 
          onCreateRule={handleAddRule}
        />
      );
      case 'users': return (
        <UserDirectory 
          users={filteredUsers} 
          onAdd={handleAddUser} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
        />
      );
      case 'analytics': return <AnalyticsView data={analytics} />;
      case 'teams': return <TeamsView />;
      case 'settings': return <SettingsView settings={settings} onUpdate={handleUpdateSettings} />;
      case 'profile': return <ProfileView user={currentUser} onUpdate={handleUpdateProfile} />;
      case 'roles': return (
        <RolesView 
          permissions={permissions} 
          auditLogs={auditLogs}
          securityPolicies={securityPolicies}
          onTogglePermission={handleTogglePermission} 
          onTogglePolicy={handleTogglePolicy}
          onSave={handleSavePermissions} 
        />
      );
      default: return (
        <UserDirectory 
          users={filteredUsers} 
          onAdd={handleAddUser} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
        />
      );
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
            <button onClick={() => setActiveView('teams')} className={`text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4 ${activeView === 'teams' ? 'underline' : ''}`}>Teams</button>
            <button onClick={() => setActiveView('settings')} className={`text-sm font-black uppercase hover:underline decoration-primary decoration-2 underline-offset-4 ${activeView === 'settings' ? 'underline' : ''}`}>Settings</button>
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
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 relative">
            <NeoButton 
              variant="secondary" 
              className={`p-2 relative ${showNotifications ? 'bg-primary/20' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neo-pink neo-border text-[8px] flex items-center justify-center font-black text-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </NeoButton>
            <NeoButton 
              variant="secondary" 
              className={`p-2 ${activeView === 'profile' ? 'bg-primary/20' : ''}`}
              onClick={() => setActiveView('profile')}
            >
              <UserIcon size={20} />
            </NeoButton>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                >
                  <NotificationDropdown 
                    notifications={notifications} 
                    onMarkRead={handleMarkNotificationRead}
                    onClose={() => setShowNotifications(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
                <h1 className="font-black text-sm uppercase">{settings.orgName}</h1>
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
