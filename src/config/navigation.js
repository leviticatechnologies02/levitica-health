import {
  LayoutDashboard,
  Building2,
  CreditCard,
  ClipboardList,
  Megaphone,
  User,
  Settings,
  Plus
} from 'lucide-react';

export const SUPERADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/superadmin',
    icon: LayoutDashboard,
  },
  {
    name: 'Hospitals',
    path: '/superadmin/hospitals',
    icon: Building2,
  },
  {
    name: 'Add Hospital',
    path: '/superadmin/hospitals/add',
    icon: Plus,
  },
  {
    name: 'Subscriptions',
    path: '/superadmin/subscriptions',
    icon: CreditCard,
  },
  {
    name: 'Plans',
    path: '/superadmin/plans',
    icon: ClipboardList,
  },
  {
    name: 'Announcements',
    path: '/superadmin/announcements',
    icon: Megaphone,
  },
  {
    name: 'Profile',
    path: '/superadmin/profile',
    icon: User,
  },
  {
    name: 'Settings',
    path: '/superadmin/settings',
    icon: Settings,
  }
];
