export type UserStatus = 'Active' | 'Inactive' | 'Pending';
export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  avatar: string;
};

export type Permission = {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
};

export type AutomationRule = {
  id: string;
  name: string;
  description: string;
  status: 'bg-neo-green' | 'bg-neo-yellow' | 'bg-neo-pink';
  active: boolean;
};

export type ExecutionLog = {
  id: string;
  name: string;
  status: 'Success' | 'Failed';
  duration: string;
  timestamp: string;
  color: string;
};

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface AnalyticsData {
  name: string;
  volume: number;
  active: number;
}
