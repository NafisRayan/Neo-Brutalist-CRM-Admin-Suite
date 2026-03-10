import { Search, Sun, Moon, Bell, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NeoButton } from '../ui/NeoButton';
import { NotificationDropdown } from './NotificationDropdown';
import { Notification } from '../../types';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  globalSearch: string;
  setGlobalSearch: (search: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  notifications: Notification[];
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
}

export const Header = ({
  activeView,
  setActiveView,
  globalSearch,
  setGlobalSearch,
  darkMode,
  onToggleTheme,
  notifications,
  showNotifications,
  setShowNotifications,
  onMarkNotificationRead,
  onLogout
}: HeaderProps) => {
  return (
    <header className="neo-border-thick bg-white dark:bg-slate-800 dark:text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 m-4 neo-shadow">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
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
            className="neo-border bg-white dark:bg-slate-700 w-full py-2 pl-10 pr-4 text-sm font-bold focus:ring-0 focus:outline-none uppercase" 
            placeholder="Search..." 
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 relative">
          <NeoButton 
            variant="secondary" 
            className="p-2"
            onClick={onToggleTheme}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} className="text-neo-yellow" /> : <Moon size={20} />}
          </NeoButton>
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
          <NeoButton 
            variant="black" 
            className="p-2"
            onClick={onLogout}
            title="Logout"
          >
            <LogOut size={20} />
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
                  onMarkRead={onMarkNotificationRead}
                  onClose={() => setShowNotifications(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
