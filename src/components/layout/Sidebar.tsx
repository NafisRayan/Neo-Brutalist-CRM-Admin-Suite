import { LayoutDashboard, Users, ShieldCheck, BarChart3, Settings, Zap } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  orgName: string;
}

export const Sidebar = ({ activeView, setActiveView, orgName }: SidebarProps) => {
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-4">
      <div className="neo-border-thick bg-white dark:bg-slate-800 dark:text-white p-4 neo-shadow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 neo-border overflow-hidden bg-primary/10 flex items-center justify-center">
            <Zap className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="font-black text-sm uppercase">{orgName}</h1>
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

      <div className="neo-border bg-primary/10 dark:bg-primary/20 p-4 dark:text-white">
        <p className="text-[10px] font-black uppercase mb-2">Storage Status</p>
        <div className="h-4 w-full neo-border bg-white dark:bg-slate-700">
          <div className="h-full bg-primary" style={{ width: '65%' }}></div>
        </div>
        <p className="text-[10px] font-black uppercase mt-1">65% Capacity</p>
      </div>
    </aside>
  );
};
