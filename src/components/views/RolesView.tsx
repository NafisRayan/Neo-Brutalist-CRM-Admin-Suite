import { Permission } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface RolesViewProps {
  permissions: Permission[];
  auditLogs: any[];
  securityPolicies: any;
  onTogglePermission: (index: number, field: 'read' | 'write' | 'delete') => void;
  onTogglePolicy: (key: string) => void;
  onSave: () => void;
}

export const RolesView = ({ permissions, auditLogs, securityPolicies, onTogglePermission, onTogglePolicy, onSave }: RolesViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white">Roles & <span className="text-neo-pink">Permissions</span></h2>
        <NeoButton variant="pink" onClick={onSave}>Save Changes</NeoButton>
      </div>

      <NeoCard title="Admin Role Configuration">
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-black dark:border-white bg-slate-50 dark:bg-slate-700">
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white">Module</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white text-center">Read</th>
                <th className="p-4 font-black uppercase text-sm border-r-2 border-black dark:border-white text-center">Write</th>
                <th className="p-4 font-black uppercase text-sm text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black dark:divide-white">
              {permissions.map((p, i) => (
                <tr key={i} className="hover:bg-neo-pink/5 transition-colors">
                  <td className="p-4 border-r-2 border-black dark:border-white font-black uppercase text-xs">{p.module}</td>
                  <td className="p-4 border-r-2 border-black dark:border-white text-center">
                    <input 
                      type="checkbox" 
                      checked={p.read} 
                      onChange={() => onTogglePermission(i, 'read')}
                      className="w-6 h-6 neo-border accent-neo-pink cursor-pointer" 
                    />
                  </td>
                  <td className="p-4 border-r-2 border-black dark:border-white text-center">
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
