import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 neo-border font-black uppercase text-sm transition-colors ${
      active 
        ? 'bg-primary text-white neo-shadow-sm' 
        : 'bg-white dark:bg-slate-800 dark:text-white text-slate-900 hover:bg-primary/10 dark:hover:bg-primary/20'
    }`}
  >
    <Icon size={18} className={active ? 'text-white' : 'text-slate-900 dark:text-white'} />
    <span className="lg:hidden">{label}</span>
    <span className="hidden lg:inline">{label}</span>
  </button>
);
