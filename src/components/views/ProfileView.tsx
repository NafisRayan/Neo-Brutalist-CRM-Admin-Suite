import { useState } from 'react';
import { User } from '../../types';
import { NeoButton } from '../ui/NeoButton';
import { NeoCard } from '../ui/NeoCard';

interface ProfileViewProps {
  user: User;
  onUpdate: (u: Partial<User>) => void;
}

export const ProfileView = ({ user, onUpdate }: ProfileViewProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 neo-border-thick overflow-hidden bg-slate-200">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter dark:text-white">{user.name}</h2>
          <p className="text-xl font-bold text-primary uppercase">{user.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NeoCard title="Personal Information">
          <div className="space-y-4 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Full Name</label>
              <input 
                className="w-full neo-border p-2 font-bold uppercase text-sm dark:bg-slate-700 dark:text-white" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Email Address</label>
              <input 
                className="w-full neo-border p-2 font-bold text-sm dark:bg-slate-700 dark:text-white" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <NeoButton variant="primary" className="w-full mt-2" onClick={() => onUpdate({ name, email })}>Update Profile</NeoButton>
          </div>
        </NeoCard>

        <NeoCard title="Account Security">
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center p-3 neo-border bg-slate-50 dark:bg-slate-700">
              <div>
                <p className="text-xs font-black uppercase">Two-Factor Auth</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Enabled via Authenticator App</p>
              </div>
              <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('2FA Settings')}>Manage</NeoButton>
            </div>
            <div className="flex justify-between items-center p-3 neo-border bg-slate-50 dark:bg-slate-700">
              <div>
                <p className="text-xs font-black uppercase">Password</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Last changed 3 months ago</p>
              </div>
              <NeoButton variant="secondary" className="text-[10px]" onClick={() => alert('Change Password')}>Change</NeoButton>
            </div>
          </div>
        </NeoCard>
      </div>
    </div>
  );
};
