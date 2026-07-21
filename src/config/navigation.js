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
  BarChart2,
  Building,
  Map,
  MapPin,
  UserCheck,
  List,
  PlusSquare,
  Shield,
  Key,
  FileText,
  DollarSign,
  ShieldCheck,
  ListChecks,
  Bell,
  Link,
  Palette
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

export const HOSPITAL_OWNER_NAV = [
  {
    name: 'Dashboard',
    path: '/hospital-owner',
    icon: LayoutDashboard,
  },
  {
    name: 'Organization',
    icon: Building,
    children: [
      { name: 'Organization Profile', path: '/hospital-owner/organization/profile', icon: UserCog },
      { name: 'Organization Settings', path: '/hospital-owner/organization/settings', icon: Settings },
      { name: 'Branding', path: '/hospital-owner/organization/branding', icon: Palette },
    ]
  },
  {
    name: 'Regions',
    icon: Map,
    children: [
      { name: 'Regions', path: '/hospital-owner/regions/list', icon: MapPin },
      { name: 'Region Admins', path: '/hospital-owner/regions/admins', icon: UserCheck },
    ]
  },
  {
    name: 'Groups',
    icon: Users,
    children: [
      { name: 'Groups', path: '/hospital-owner/groups/list', icon: Users },
      { name: 'Group Admins', path: '/hospital-owner/groups/admins', icon: UserCheck },
    ]
  },
  {
    name: 'Hospitals',
    icon: Building2,
    children: [
      { name: 'Hospital List', path: '/hospital-owner/hospitals/list', icon: List },
      { name: 'Create Hospital', path: '/hospital-owner/hospitals/create', icon: PlusSquare },
      { name: 'Branch Heads', path: '/hospital-owner/hospitals/branch-heads', icon: UserCheck },
    ]
  },
  {
    name: 'Users',
    icon: UsersRound,
    children: [
      { name: 'Organization Users', path: '/hospital-owner/users/organization-users', icon: Users },
      { name: 'Role Management', path: '/hospital-owner/users/role-management', icon: Shield },
      { name: 'Permission Management', path: '/hospital-owner/users/permission-management', icon: Key },
    ]
  },
  {
    name: 'Subscription',
    icon: CreditCard,
    children: [
      { name: 'Plans', path: '/hospital-owner/subscription/plans', icon: ClipboardList },
      { name: 'Billing', path: '/hospital-owner/subscription/billing', icon: Receipt },
      { name: 'Licenses', path: '/hospital-owner/subscription/licenses', icon: FileText },
    ]
  },
  {
    name: 'Reports',
    icon: BarChart2,
    children: [
      { name: 'Organization Reports', path: '/hospital-owner/reports/organization', icon: BarChart2 },
      { name: 'Hospital Reports', path: '/hospital-owner/reports/hospital', icon: BarChart2 },
      { name: 'Revenue Reports', path: '/hospital-owner/reports/revenue', icon: DollarSign },
    ]
  },
  {
    name: 'Compliance',
    icon: ShieldCheck,
    children: [
      { name: 'Licenses', path: '/hospital-owner/compliance/licenses', icon: FileText },
      { name: 'Audit Logs', path: '/hospital-owner/compliance/audit-logs', icon: ListChecks },
    ]
  },
  {
    name: 'Notifications',
    path: '/hospital-owner/notifications',
    icon: Bell,
  },
  {
    name: 'Integrations',
    path: '/hospital-owner/integrations',
    icon: Link,
  },
  {
    name: 'Settings',
    path: '/hospital-owner/settings',
    icon: Settings,
  },
  {
    name: 'Profile',
    path: '/hospital-owner/profile',
    icon: User,
  }
];
