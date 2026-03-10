import { User, AutomationRule, ExecutionLog, Permission, Notification, AnalyticsData } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@brutalsuite.io', role: 'Admin', status: 'Active', lastActive: '2 mins ago', avatar: 'https://picsum.photos/seed/Alex/100' },
  { id: '2', name: 'Jordan Smith', email: 'jordan@brutalsuite.io', role: 'Editor', status: 'Active', lastActive: '1 hour ago', avatar: 'https://picsum.photos/seed/Jordan/100' },
  { id: '3', name: 'Taylor Wong', email: 'taylor@brutalsuite.io', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago', avatar: 'https://picsum.photos/seed/Taylor/100' },
  { id: '4', name: 'Morgan Lee', email: 'morgan@brutalsuite.io', role: 'Admin', status: 'Active', lastActive: 'Just now', avatar: 'https://picsum.photos/seed/Morgan/100' },
  { id: '5', name: 'Casey Cross', email: 'casey@brutalsuite.io', role: 'Editor', status: 'Pending', lastActive: 'Never', avatar: 'https://picsum.photos/seed/Casey/100' },
  { id: '6', name: 'Sam Vance', email: 'sam@brutalsuite.io', role: 'Viewer', status: 'Active', lastActive: '5 mins ago', avatar: 'https://picsum.photos/seed/Sam/100' },
  { id: '7', name: 'Riley Quinn', email: 'riley@brutalsuite.io', role: 'Editor', status: 'Active', lastActive: '10 mins ago', avatar: 'https://picsum.photos/seed/Riley/100' },
  { id: '8', name: 'Jamie Lane', email: 'jamie@brutalsuite.io', role: 'Admin', status: 'Inactive', lastActive: '1 week ago', avatar: 'https://picsum.photos/seed/Jamie/100' },
  { id: '9', name: 'Skyler Page', email: 'skyler@brutalsuite.io', role: 'Viewer', status: 'Pending', lastActive: 'Never', avatar: 'https://picsum.photos/seed/Skyler/100' },
  { id: '10', name: 'Dakota Grey', email: 'dakota@brutalsuite.io', role: 'Editor', status: 'Active', lastActive: '3 hours ago', avatar: 'https://picsum.photos/seed/Dakota/100' },
];

export const MOCK_RULES: AutomationRule[] = [
  { id: 'r1', name: 'Data Sync', description: 'Syncing CRM with Marketing Cloud', status: 'bg-neo-green', active: true },
  { id: 'r2', name: 'Lead Scoring', description: 'Processing incoming leads', status: 'bg-neo-yellow', active: true },
  { id: 'r3', name: 'Error Alert', description: 'Notifying Slack on timeouts', status: 'bg-neo-pink', active: false },
  { id: 'r4', name: 'Invoice Gen', description: 'Auto-generate monthly invoices', status: 'bg-neo-green', active: true },
  { id: 'r5', name: 'User Onboarding', description: 'Trigger welcome email sequence', status: 'bg-neo-yellow', active: true },
];

export const MOCK_LOGS: ExecutionLog[] = [
  { id: 'l1', name: 'Invoice Processing', status: 'Success', duration: '1.2s', timestamp: 'Oct 24, 14:02:11', color: 'bg-neo-green' },
  { id: 'l2', name: 'Backup Cloud Storage', status: 'Success', duration: '45.8s', timestamp: 'Oct 24, 13:55:00', color: 'bg-neo-green' },
  { id: 'l3', name: 'Websocket Handshake', status: 'Failed', duration: '0.4s', timestamp: 'Oct 24, 13:48:22', color: 'bg-neo-pink' },
  { id: 'l4', name: 'Lead Scoring', status: 'Success', duration: '2.1s', timestamp: 'Oct 24, 13:30:05', color: 'bg-neo-green' },
  { id: 'l5', name: 'Data Sync', status: 'Success', duration: '5.4s', timestamp: 'Oct 24, 13:15:12', color: 'bg-neo-green' },
];

export const MOCK_PERMISSIONS: Permission[] = [
  { module: 'User Management', read: true, write: true, delete: false },
  { module: 'Analytics Dashboard', read: true, write: false, delete: false },
  { module: 'System Settings', read: true, write: true, delete: true },
  { module: 'Automation Rules', read: true, write: true, delete: false },
  { module: 'Billing & Invoices', read: true, write: false, delete: false },
  { module: 'API Access', read: false, write: false, delete: false },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'System Update', message: 'Version 2.4.0 has been deployed successfully.', time: '5m ago', read: false, type: 'success' },
  { id: 'n2', title: 'New User', message: 'Jamie Lane has joined the Engineering team.', time: '1h ago', read: false, type: 'info' },
  { id: 'n3', title: 'Security Alert', message: 'Failed login attempt from IP 192.168.1.105.', time: '3h ago', read: true, type: 'warning' },
  { id: 'n4', title: 'Storage Warning', message: 'Cluster B is nearing 90% capacity.', time: '5h ago', read: true, type: 'error' },
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { name: 'Mon', volume: 4000, active: 2400 },
  { name: 'Tue', volume: 3000, active: 1398 },
  { name: 'Wed', volume: 2000, active: 9800 },
  { name: 'Thu', volume: 2780, active: 3908 },
  { name: 'Fri', volume: 1890, active: 4800 },
  { name: 'Sat', volume: 2390, active: 3800 },
  { name: 'Sun', volume: 3490, active: 4300 },
];
