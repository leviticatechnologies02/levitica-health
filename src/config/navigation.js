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
    name: 'Patients',
    path: '/hospital-owner/users',
    icon: UsersRound
  },
  {
    name: 'Subscription',
    path: '/hospital-owner/subscription',
    icon: CreditCard
  },
  {
    name: 'Reports',
    path: '/hospital-owner/reports',
    icon: BarChart2
  },
  {
    name: 'Notifications',
    path: '/hospital-owner/notifications',
    icon: Bell,
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

export const REGION_ADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/regionAdmin',
    icon: LayoutDashboard,
  },
  {
    name: 'Group Management',
    icon: Building,
    children: [
      { name: 'Groups', path: '/regionAdmin/groups', icon: Users },
      { name: 'Group Admins', path: '/regionAdmin/group-admins', icon: UserCheck },
    ]
  },
  {
    name: 'Branch Management',
    icon: Building2,
    children: [
      { name: 'Branches', path: '/regionAdmin/branches', icon: Building2 },
      { name: 'Branch Admins', path: '/regionAdmin/branch-admins', icon: UserCheck },
    ]
  },
  {
    name: 'Patients',
    path: '/regionAdmin/patients',
    icon: UsersRound,
  },
  {
    name: 'Reports',
    path: '/regionAdmin/reports',
    icon: BarChart2,
  },
  {
    name: 'Announcements',
    path: '/regionAdmin/announcements',
    icon: Megaphone,
  },
  {
    name: 'Settings',
    path: '/regionAdmin/settings',
    icon: Settings,
  },
  {
    name: 'My Profile',
    path: '/regionAdmin/profile',
    icon: User,
  }
];

export const GROUP_ADMIN_NAV = [
  {
    name: 'Dashboard',
    path: '/groupAdmin',
    icon: LayoutDashboard,
  },
  {
    name: 'Branch Management',
    icon: Building2,
    children: [
      { name: 'Branches', path: '/groupAdmin/branches', icon: Building2 },
      { name: 'Branch Admins', path: '/groupAdmin/branch-admins', icon: UserCheck },
    ]
  },
  {
    name: 'Patients',
    path: '/groupAdmin/patients',
    icon: UsersRound,
  },
  {
    name: 'Reports',
    path: '/groupAdmin/reports',
    icon: BarChart2,
  },
  {
    name: 'Notifications',
    path: '/groupAdmin/announcements',
    icon: Megaphone,
  },
  {
    name: 'Settings',
    path: '/groupAdmin/settings',
    icon: Settings,
  },
  {
    name: 'My Profile',
    path: '/groupAdmin/profile',
    icon: User,
  }
];
export const RECEPTIONIST_NAV = [
  {
    name: "Dashboard",
    path: "/receptionist",
    icon: LayoutDashboard,
  },
  {
    name: "Patient Registration",
    path: "/receptionist/patient-registration",
    icon: UsersRound,
  },
  {
    name: "Patient Search",
    path: "/receptionist/patient-search",
    icon: User,
  },
  {
    name: "Appointment Booking",
    path: "/receptionist/appointment-booking",
    icon: Calendar,
  },
  {
    name: "Admission Initiation",
    path: "/receptionist/admission-initiation",
    icon: Bed,
  },
  {
    name: "Patient Check In",
    path: "/receptionist/patient-checkin",
    icon: UserCheck,
  },
  {
    name: "Patient Queue",
    path: "/receptionist/patient-queue",
    icon: ListChecks,
  },
  {
    name: "Token Generation",
    path: "/receptionist/token-generation",
    icon: FileText,
  },
  {
    name: "Reports",
    path: "/receptionist/reports",
    icon: BarChart2,
  },
  {
    name: "Profile",
    path: "/receptionist/profile",
    icon: User,
  }
];
