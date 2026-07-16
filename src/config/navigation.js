import { LayoutDashboard, Hospital,Subscription,Plan,Announcement,Profile,settings } from 'lucide-react';

export const SUPERADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/superadmin',
    icon: LayoutDashboard,
  },
  {
    name: 'Hospitals',
    path: '/superadmin/hospitals',
    icon: Hospital,
  },
  {
    name: 'Subscriptions',
    path: '/superadmin/subscriptions',
    icon: Subscription,
  },
  {
    name: 'Plans',
    path: '/superadmin/plans',
    icon: Plan,
  },
   {
    name: 'Announcements',
    path: '/superadmin/announcements',
    icon: Announcement,
  },
   {
    name: 'Profile',
    path: '/superadmin/profile',
    icon: Plan,
  },
   {
    name: 'settings',
    path: '/superadmin/settings',
    icon: settings,
  },
];
