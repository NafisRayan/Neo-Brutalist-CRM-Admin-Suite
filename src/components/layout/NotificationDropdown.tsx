import { X, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

export const NotificationDropdown = ({ notifications, onMarkRead, onClose }: NotificationDropdownProps) => (
  <div className="absolute top-16 right-0 w-80 bg-white dark:bg-slate-800 dark:text-white neo-border-thick neo-shadow z-[100] p-4">
    <div className="flex justify-between items-center mb-4 border-b-2 border-black dark:border-white pb-2">
      <h3 className="font-black uppercase text-sm">Notifications</h3>
      <button onClick={onClose}><X size={16} /></button>
    </div>
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {notifications.length > 0 ? notifications.map((n) => (
        <div 
          key={n.id} 
          onClick={() => onMarkRead(n.id)}
          className={`p-3 neo-border cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700 ${n.read ? 'opacity-60' : 'bg-primary/5 border-primary dark:bg-primary/10'}`}
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
