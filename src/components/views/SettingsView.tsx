import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface SettingsViewProps {
  settings: any;
  onUpdate: (key: string, val: any) => void;
}

export const SettingsView = ({ settings, onUpdate }: SettingsViewProps) => (
  <div className="space-y-6">
    <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white">System <span className="text-neo-yellow">Settings</span></h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <NeoCard title="General Configuration">
        <div className="space-y-4 mt-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase">Organization Name</label>
            <input 
              className="w-full neo-border p-2 font-bold uppercase text-sm dark:bg-slate-700 dark:text-white" 
              value={settings.orgName} 
              onChange={(e) => onUpdate('orgName', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase">Admin Email</label>
            <input 
              className="w-full neo-border p-2 font-bold text-sm dark:bg-slate-700 dark:text-white" 
              value={settings.adminEmail} 
              onChange={(e) => onUpdate('adminEmail', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="darkModeToggle"
              checked={settings.darkMode} 
              onChange={(e) => onUpdate('darkMode', e.target.checked)}
              className="w-5 h-5 neo-border accent-primary cursor-pointer" 
            />
            <label htmlFor="darkModeToggle" className="text-xs font-black uppercase cursor-pointer">Enable Dark Mode (Beta)</label>
          </div>
        </div>
      </NeoCard>
      <NeoCard title="API Access Tokens">
        <div className="space-y-4 mt-4">
          <div className="p-3 neo-border bg-slate-50 dark:bg-slate-700 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Production Key</p>
              <p className="font-mono text-xs">bs_live_••••••••••••••••</p>
            </div>
            <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('Token Revoked')}>Revoke</NeoButton>
          </div>
          <div className="p-3 neo-border bg-slate-50 dark:bg-slate-700 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400">Staging Key</p>
              <p className="font-mono text-xs">bs_test_••••••••••••••••</p>
            </div>
            <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('Token Revoked')}>Revoke</NeoButton>
          </div>
          <NeoButton variant="primary" className="w-full py-2 text-xs" onClick={() => alert('Generating Token...')}>+ Generate New Token</NeoButton>
        </div>
      </NeoCard>
      <NeoCard title="Danger Zone" className="border-red-500">
        <p className="text-xs font-bold text-red-500 uppercase mb-4">Irreversible actions. Use with extreme caution.</p>
        <NeoButton 
          variant="secondary" 
          className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => {
            if (confirm('Wipe all local data? This will reset the app to factory defaults.')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          Factory Reset App
        </NeoButton>
      </NeoCard>
    </div>
  </div>
);
