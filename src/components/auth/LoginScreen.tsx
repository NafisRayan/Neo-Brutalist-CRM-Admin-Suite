import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sun, Moon } from 'lucide-react';
import { NeoButton } from '../ui/NeoButton';

interface LoginScreenProps {
  onLogin: (e: FormEvent) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const LoginScreen = ({ onLogin, darkMode, onToggleTheme }: LoginScreenProps) => {
  const [email, setEmail] = useState('admin@brutalsuite.io');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-primary/5 dark:bg-slate-900 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <NeoButton 
          variant="secondary" 
          className="p-2"
          onClick={onToggleTheme}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} className="text-neo-yellow" /> : <Moon size={20} />}
        </NeoButton>
      </div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 dark:text-white neo-border-thick neo-shadow-lg p-10"
      >
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="bg-primary neo-border p-3 flex items-center justify-center">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">BrutalSuite</h1>
        </div>

        <form onSubmit={onLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full neo-border p-4 font-bold text-sm focus:bg-primary/5 dark:focus:bg-primary/10 outline-none transition-colors dark:bg-slate-700" 
              placeholder="admin@brutalsuite.io"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full neo-border p-4 font-bold text-sm focus:bg-primary/5 dark:focus:bg-primary/10 outline-none transition-colors dark:bg-slate-700" 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="remember" className="w-5 h-5 neo-border accent-primary" />
            <label htmlFor="remember" className="text-[10px] font-black uppercase cursor-pointer">Remember this device</label>
          </div>
          <NeoButton type="submit" variant="primary" className="w-full py-5 text-lg">Initialize Session</NeoButton>
        </form>

        <div className="mt-8 pt-8 border-t-2 border-black/5 dark:border-white/5 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Protected by BrutalShield™ Enterprise Security
          </p>
        </div>
      </motion.div>
    </div>
  );
};
