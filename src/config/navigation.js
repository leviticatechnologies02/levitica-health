import {
  LayoutDashboard,
  Building2,
  CreditCard,
  ClipboardList,
  Megaphone,
  User,
  Settings,
  Plus,
  Hospital,
  UserCog,
  Network,
  Layout,
  Layers,
  BedDouble,
  DoorOpen,
  Bed,
  Users,
  Stethoscope,
  Syringe,
  Headset,
  Pill,
  Briefcase,
  UsersRound,
  Calendar,
  Store,
  Microscope,
  Activity,
  Package,
  Receipt,
  Ambulance,
  BarChart2
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

export const ADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Hospital',
    icon: Hospital,
    children: [
      { name: 'Profile', path: '/admin/hospital/profile', icon: UserCog },
      { name: 'Departments', path: '/admin/hospital/departments', icon: Network },
      { name: 'Blocks', path: '/admin/hospital/blocks', icon: Layout },
      { name: 'Floors', path: '/admin/hospital/floors', icon: Layers },
      { name: 'Wards', path: '/admin/hospital/wards', icon: BedDouble },
      { name: 'Rooms', path: '/admin/hospital/rooms', icon: DoorOpen },
      { name: 'Beds', path: '/admin/hospital/beds', icon: Bed },
    ]
  },
  {
    name: 'Staff',
    icon: Users,
    children: [
      { name: 'Doctors', path: '/admin/staff/doctors', icon: Stethoscope },
      { name: 'Nurses', path: '/admin/staff/nurses', icon: Syringe },
      { name: 'Receptionists', path: '/admin/staff/receptionists', icon: Headset },
      { name: 'Pharmacists', path: '/admin/staff/pharmacists', icon: Pill },
      { name: 'Employees', path: '/admin/staff/employees', icon: Briefcase },
    ]
  },
  {
    name: 'Patients',
    path: '/admin/patients',
    icon: UsersRound,
  },
  {
    name: 'Appointments',
    path: '/admin/appointments',
    icon: Calendar,
  },
  {
    name: 'Pharmacy',
    path: '/admin/pharmacy',
    icon: Store,
  },
  {
    name: 'Laboratory',
    path: '/admin/laboratory',
    icon: Microscope,
  },
  {
    name: 'Radiology',
    path: '/admin/radiology',
    icon: Activity,
  },
  {
    name: 'Inventory',
    path: '/admin/inventory',
    icon: Package,
  },
  {
    name: 'Billing',
    path: '/admin/billing',
    icon: Receipt,
  },
  {
    name: 'Ambulance',
    path: '/admin/ambulance',
    icon: Ambulance,
  },
  {
    name: 'Announcements',
    path: '/admin/announcements',
    icon: Megaphone,
  },
  {
    name: 'Reports',
    path: '/admin/reports',
    icon: BarChart2,
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: Settings,
  },
  {
    name: 'Profile',
    path: '/admin/profile',
    icon: User,
  }
];
