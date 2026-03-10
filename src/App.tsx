import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Mock Data
import type { User, AutomationRule, ExecutionLog, Permission, Notification, AnalyticsData } from './types';
import { 
  MOCK_USERS, 
  MOCK_RULES, 
  MOCK_LOGS, 
  MOCK_PERMISSIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_ANALYTICS 
} from './mockData';

// UI Components
import { NeoButton } from './components/ui/NeoButton';
import { Modal } from './components/ui/Modal';

// Auth Components
import { LoginScreen } from './components/auth/LoginScreen';

// Layout Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// View Components
import { DashboardView } from './components/views/DashboardView';
import { UserDirectory } from './components/views/UserDirectory';
import { AnalyticsView } from './components/views/AnalyticsView';
import { RolesView } from './components/views/RolesView';
import { TeamsView } from './components/views/TeamsView';
import { SettingsView } from './components/views/SettingsView';
import { ProfileView } from './components/views/ProfileView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('bs_isLoggedIn') === 'true';
  });
  const [activeView, setActiveView] = useState('dashboard');
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('bs_users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });
  const [rules, setRules] = useState<AutomationRule[]>(() => {
    const saved = localStorage.getItem('bs_rules');
    return saved ? JSON.parse(saved) : MOCK_RULES;
  });
  const [permissions, setPermissions] = useState<Permission[]>(() => {
    const saved = localStorage.getItem('bs_permissions');
    return saved ? JSON.parse(saved) : MOCK_PERMISSIONS;
  });
  const [logs] = useState<ExecutionLog[]>(MOCK_LOGS);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('bs_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });
  const [analytics] = useState<AnalyticsData[]>(MOCK_ANALYTICS);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [securityPolicies, setSecurityPolicies] = useState(() => {
    const saved = localStorage.getItem('bs_securityPolicies');
    const defaults = {
      require2FA: true,
      autoLock: false,
      restrictIP: true
    };
    try {
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return defaults;
    }
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bs_settings');
    const defaults = {
      orgName: 'BrutalSuite Enterprise',
      adminEmail: 'admin@brutalsuite.io',
      darkMode: false
    };
    try {
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) {
      return defaults;
    }
  });
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('bs_auditLogs');
    return saved ? JSON.parse(saved) : [
      { user: 'Alex R.', action: 'Updated Role: Editor', time: '10m ago' },
      { user: 'System', action: 'Auto-backup completed', time: '1h ago' },
      { user: 'Morgan L.', action: 'Deleted User: Taylor W.', time: '3h ago' },
    ];
  });

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('bs_teams');
    return saved ? JSON.parse(saved) : [
      { id: 't1', name: 'Engineering', members: 12, lead: 'Alex Rivera', color: 'bg-primary' },
      { id: 't2', name: 'Design', members: 5, lead: 'Jordan Smith', color: 'bg-neo-pink' },
      { id: 't3', name: 'Marketing', members: 8, lead: 'Riley Quinn', color: 'bg-neo-yellow' },
      { id: 't4', name: 'Support', members: 15, lead: 'Jamie Lane', color: 'bg-neo-green' },
    ];
  });

  // Modal State
  const [modal, setModal] = useState<{ type: string, data?: any } | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('bs_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('bs_rules', JSON.stringify(rules));
  }, [rules]);
  useEffect(() => {
    localStorage.setItem('bs_permissions', JSON.stringify(permissions));
  }, [permissions]);
  useEffect(() => {
    localStorage.setItem('bs_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('bs_securityPolicies', JSON.stringify(securityPolicies));
  }, [securityPolicies]);
  useEffect(() => {
    localStorage.setItem('bs_settings', JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem('bs_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);
  useEffect(() => {
    localStorage.setItem('bs_teams', JSON.stringify(teams));
  }, [teams]);
  useEffect(() => {
    localStorage.setItem('bs_isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  // Dark Mode Effect
  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Dark mode effect running. Mode:', settings.darkMode);
    if (settings.darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [settings.darkMode]);

  const currentUser = users[0] || MOCK_USERS[0];

  const addAuditLog = (action: string) => {
    setAuditLogs([{ user: currentUser.name.split(' ')[0] + '.', action, time: 'Just now' }, ...auditLogs.slice(0, 9)]);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    addAuditLog('User logged in');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveView('dashboard');
  };

  const filteredUsers = useMemo(() => {
    if (!globalSearch) return users;
    const s = globalSearch.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(s) || 
      u.email.toLowerCase().includes(s) ||
      u.role.toLowerCase().includes(s)
    );
  }, [users, globalSearch]);

  const handleUpdateProfile = (updates: Partial<User>) => {
    setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    alert('Profile updated successfully!');
    setActiveView('dashboard');
  };

  const handleTogglePolicy = (key: string) => {
    setSecurityPolicies(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleUpdateSettings = (key: string, val: any) => {
    console.log(`Updating setting ${key} to:`, val);
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleAddUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || 'New User',
      email: userData.email || 'user@example.com',
      role: (userData.role as any) || 'Viewer',
      status: 'Pending',
      lastActive: 'Never',
      avatar: `https://picsum.photos/seed/${userData.name}/100`
    };
    setUsers([newUser, ...users]);
    addAuditLog(`Added user: ${newUser.name}`);
    setModal(null);
  };

  const handleEditUser = (user: User) => {
    setModal({ type: 'edit_user', data: user });
  };

  const handleUpdateUser = (id: string, updates: Partial<User>) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
    addAuditLog(`Updated user: ${users.find(u => u.id === id)?.name}`);
    setModal(null);
  };

  const handleDeleteUser = (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete && confirm(`Are you sure you want to delete ${userToDelete.name}?`)) {
      setUsers(users.filter(u => u.id !== id));
      addAuditLog(`Deleted user: ${userToDelete.name}`);
    }
  };

  const handleToggleRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    addAuditLog(`${rule?.active ? 'Disabled' : 'Enabled'} rule: ${rule?.name}`);
  };

  const handleTogglePermission = (index: number, field: 'read' | 'write' | 'delete') => {
    const newPermissions = [...permissions];
    newPermissions[index] = {
      ...newPermissions[index],
      [field]: !newPermissions[index][field]
    };
    setPermissions(newPermissions);
  };

  const handleSavePermissions = () => {
    addAuditLog('Updated system permissions');
    alert('Permissions saved successfully!');
  };

  const handleAddRule = (ruleData: Partial<AutomationRule>) => {
    const newRule: AutomationRule = {
      id: Math.random().toString(36).substr(2, 9),
      name: ruleData.name || 'New Rule',
      description: ruleData.description || 'No description',
      status: 'bg-neo-green',
      active: true
    };
    setRules([newRule, ...rules]);
    addAuditLog(`Created rule: ${newRule.name}`);
    setModal(null);
  };

  const handleAddTeam = (teamData: any) => {
    const newTeam = {
      id: Math.random().toString(36).substr(2, 9),
      ...teamData,
      members: 0
    };
    setTeams([...teams, newTeam]);
    addAuditLog(`Created team: ${newTeam.name}`);
    setModal(null);
  };

  const handleEditTeam = (team: any) => {
    setModal({ type: 'edit_team', data: team });
  };

  const handleUpdateTeam = (id: string, updates: any) => {
    setTeams(teams.map(t => t.id === id ? { ...t, ...updates } : t));
    addAuditLog(`Updated team: ${teams.find(t => t.id === id)?.name}`);
    setModal(null);
  };

  const handleDeleteTeam = (id: string) => {
    const team = teams.find(t => t.id === id);
    if (team && confirm(`Are you sure you want to delete ${team.name}?`)) {
      setTeams(teams.filter(t => t.id !== id));
      addAuditLog(`Deleted team: ${team.name}`);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return (
        <DashboardView 
          rules={rules} 
          logs={logs} 
          analytics={analytics}
          onToggleRule={handleToggleRule} 
          onViewAllRules={() => alert(`Total Rules: ${rules.length}`)} 
          onCreateRule={() => setModal({ type: 'add_rule' })}
        />
      );
      case 'users': return (
        <UserDirectory 
          users={filteredUsers} 
          onAdd={() => setModal({ type: 'add_user' })} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
        />
      );
      case 'analytics': return <AnalyticsView data={analytics} />;
      case 'teams': return (
        <TeamsView 
          teams={teams} 
          onAdd={() => setModal({ type: 'add_team' })} 
          onEdit={handleEditTeam}
          onDelete={handleDeleteTeam}
        />
      );
      case 'settings': return <SettingsView settings={settings} onUpdate={handleUpdateSettings} />;
      case 'profile': return <ProfileView user={currentUser} onUpdate={handleUpdateProfile} />;
      case 'roles': return (
        <RolesView 
          permissions={permissions} 
          auditLogs={auditLogs}
          securityPolicies={securityPolicies}
          onTogglePermission={handleTogglePermission} 
          onTogglePolicy={handleTogglePolicy}
          onSave={handleSavePermissions} 
        />
      );
      default: return (
        <UserDirectory 
          users={filteredUsers} 
          onAdd={() => setModal({ type: 'add_user' })} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
        />
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginScreen 
        onLogin={handleLogin} 
        darkMode={settings.darkMode} 
        onToggleTheme={() => handleUpdateSettings('darkMode', !settings.darkMode)} 
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 dark:bg-slate-900">
      {/* Modals */}
      {modal?.type === 'add_user' && (
        <Modal title="Add New Member" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddUser({
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              role: formData.get('role') as any
            });
          }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Full Name</label>
              <input name="name" required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Email Address</label>
              <input name="email" type="email" required className="w-full neo-border p-3 font-bold text-sm dark:bg-slate-700" placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Role</label>
              <select name="role" className="w-full neo-border p-3 font-bold uppercase text-sm bg-white dark:bg-slate-700">
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <NeoButton type="submit" variant="primary" className="w-full mt-4 py-4">Create Account</NeoButton>
          </form>
        </Modal>
      )}

      {modal?.type === 'edit_user' && (
        <Modal title="Update Member" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleUpdateUser(modal.data.id, {
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              role: formData.get('role') as any
            });
          }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Full Name</label>
              <input name="name" defaultValue={modal.data.name} required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Email Address</label>
              <input name="email" type="email" defaultValue={modal.data.email} required className="w-full neo-border p-3 font-bold text-sm dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Role</label>
              <select name="role" defaultValue={modal.data.role} className="w-full neo-border p-3 font-bold uppercase text-sm bg-white dark:bg-slate-700">
                <option value="Viewer">Viewer</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <NeoButton type="submit" variant="primary" className="w-full mt-4 py-4">Save Changes</NeoButton>
          </form>
        </Modal>
      )}

      {modal?.type === 'add_rule' && (
        <Modal title="New Automation" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddRule({
              name: formData.get('name') as string,
              description: formData.get('description') as string
            });
          }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Rule Name</label>
              <input name="name" required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" placeholder="Data Sync" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Description</label>
              <textarea name="description" required className="w-full neo-border p-3 font-bold text-sm h-24 dark:bg-slate-700" placeholder="Describe the automation flow..." />
            </div>
            <NeoButton type="submit" variant="primary" className="w-full mt-4 py-4">Deploy Rule</NeoButton>
          </form>
        </Modal>
      )}

      {modal?.type === 'add_team' && (
        <Modal title="Create New Team" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddTeam({
              name: formData.get('name') as string,
              lead: formData.get('lead') as string,
              color: formData.get('color') as string
            });
          }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Team Name</label>
              <input name="name" required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" placeholder="Engineering" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Team Lead</label>
              <input name="lead" required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" placeholder="Alex Rivera" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Accent Color</label>
              <select name="color" className="w-full neo-border p-3 font-bold uppercase text-sm bg-white dark:bg-slate-700">
                <option value="bg-primary">Primary (Orange)</option>
                <option value="bg-neo-pink">Pink</option>
                <option value="bg-neo-yellow">Yellow</option>
                <option value="bg-neo-green">Green</option>
                <option value="bg-black">Black</option>
              </select>
            </div>
            <NeoButton type="submit" variant="primary" className="w-full mt-4 py-4">Initialize Team</NeoButton>
          </form>
        </Modal>
      )}

      {modal?.type === 'edit_team' && (
        <Modal title="Manage Team" onClose={() => setModal(null)}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleUpdateTeam(modal.data.id, {
              name: formData.get('name') as string,
              lead: formData.get('lead') as string,
              color: formData.get('color') as string
            });
          }} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Team Name</label>
              <input name="name" defaultValue={modal.data.name} required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Team Lead</label>
              <input name="lead" defaultValue={modal.data.lead} required className="w-full neo-border p-3 font-bold uppercase text-sm dark:bg-slate-700" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black uppercase">Accent Color</label>
              <select name="color" defaultValue={modal.data.color} className="w-full neo-border p-3 font-bold uppercase text-sm bg-white dark:bg-slate-700">
                <option value="bg-primary">Primary (Orange)</option>
                <option value="bg-neo-pink">Pink</option>
                <option value="bg-neo-yellow">Yellow</option>
                <option value="bg-neo-green">Green</option>
                <option value="bg-black">Black</option>
              </select>
            </div>
            <NeoButton type="submit" variant="primary" className="w-full mt-4 py-4">Save Changes</NeoButton>
          </form>
        </Modal>
      )}

      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        darkMode={settings.darkMode}
        onToggleTheme={() => handleUpdateSettings('darkMode', !settings.darkMode)}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-6">
        <Sidebar 
          activeView={activeView}
          setActiveView={setActiveView}
          orgName={settings.orgName}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
}
