import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import { Check, X, Zap } from 'lucide-react';
import { AutomationRule, ExecutionLog, AnalyticsData } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface DashboardViewProps {
  rules: AutomationRule[];
  logs: ExecutionLog[];
  analytics: AnalyticsData[];
  onToggleRule: (id: string) => void;
  onViewAllRules: () => void;
  onCreateRule: () => void;
}

export const DashboardView = ({ rules, logs, analytics, onToggleRule, onViewAllRules, onCreateRule }: DashboardViewProps) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none dark:text-white">Automation<br/>Overview</h1>
        <p className="text-lg font-bold bg-neo-green/30 inline-block px-2 dark:text-neo-green">SYSTEM STATUS: OPTIMAL // {rules.filter(r => r.active).length} ACTIVE NODES</p>
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
                <tr className="border-b-2 border-black dark:border-white text-xs font-black uppercase bg-slate-50 dark:bg-slate-700">
                  <th className="px-4 py-3 border-r-2 border-black dark:border-white">Rule Name</th>
                  <th className="px-4 py-3 border-r-2 border-black dark:border-white">Status</th>
                  <th className="px-4 py-3 border-r-2 border-black dark:border-white">Duration</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {logs.map((row) => (
                  <tr key={row.id} className="border-b-2 border-black dark:border-white hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="px-4 py-3 border-r-2 border-black dark:border-white uppercase">{row.name}</td>
                    <td className="px-4 py-3 border-r-2 border-black dark:border-white">
                      <span className={`${row.color} neo-border px-2 py-0.5 text-[10px] font-black uppercase`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-3 border-r-2 border-black dark:border-white">{row.duration}</td>
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
                className={`neo-border p-4 ${rule.active ? rule.status + '/20' : 'bg-slate-100 dark:bg-slate-700 opacity-60'} border-black dark:border-white hover:shadow-neo transition-all cursor-pointer relative`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-black uppercase text-sm">{rule.name}</span>
                  <div className={`w-3 h-3 neo-border ${rule.active ? rule.status : 'bg-slate-400'}`}></div>
                </div>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{rule.description}</p>
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
