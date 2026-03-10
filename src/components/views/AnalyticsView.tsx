import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { AnalyticsData } from '../../types';
import { NeoCard } from '../ui/NeoCard';

interface AnalyticsViewProps {
  data: AnalyticsData[];
}

export const AnalyticsView = ({ data }: AnalyticsViewProps) => (
  <div className="space-y-8">
    <div className="bg-primary/10 dark:bg-primary/20 neo-border-thick p-8 neo-shadow">
      <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mb-4 dark:text-white">
        Global <span className="text-primary italic">Analytics</span> Overview
      </h1>
      <p className="text-xl font-bold border-l-4 border-black dark:border-white pl-4 dark:text-slate-300">
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
