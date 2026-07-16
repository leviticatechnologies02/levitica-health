import { LayoutDashboard, Users, Settings, Activity } from 'lucide-react';

export const SUPERADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/superadmin',
    icon: LayoutDashboard,
  },
  {
    name: 'User Management',
    path: '/superadmin/users',
    icon: Users,
  },
  {
    name: 'Activity Logs',
    path: '/superadmin/logs',
    icon: Activity,
  },
  {
    name: 'Settings',
    path: '/superadmin/settings',
    icon: Settings,
  },
];
