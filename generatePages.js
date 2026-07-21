const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages', 'Hospital owner');

const filesToCreate = [
  { path: 'Dashboard.jsx', title: 'Dashboard', icon: 'LayoutDashboard', usefulness: 'Provides an overview of the organization.' },
  { path: 'organization/Profile.jsx', title: 'Organization Profile', icon: 'UserCog', usefulness: 'Manage organization details.' },
  { path: 'organization/Settings.jsx', title: 'Organization Settings', icon: 'Settings', usefulness: 'Configure organization preferences.' },
  { path: 'organization/Branding.jsx', title: 'Branding', icon: 'Palette', usefulness: 'Customize the appearance of the organization.' },
  { path: 'regions/List.jsx', title: 'Regions', icon: 'MapPin', usefulness: 'Manage geographical regions.' },
  { path: 'regions/Admins.jsx', title: 'Region Admins', icon: 'UserCheck', usefulness: 'Manage administrators for regions.' },
  { path: 'groups/List.jsx', title: 'Groups', icon: 'Users', usefulness: 'Manage organizational groups.' },
  { path: 'groups/Admins.jsx', title: 'Group Admins', icon: 'UserCheck', usefulness: 'Manage group administrators.' },
  { path: 'hospitals/List.jsx', title: 'Hospital List', icon: 'List', usefulness: 'View and manage hospitals.' },
  { path: 'hospitals/Create.jsx', title: 'Create Hospital', icon: 'PlusSquare', usefulness: 'Add new hospitals to the organization.' },
  { path: 'hospitals/BranchHeads.jsx', title: 'Branch Heads', icon: 'UserCheck', usefulness: 'Manage heads of different branches.' },
  { path: 'users/OrganizationUsers.jsx', title: 'Organization Users', icon: 'Users', usefulness: 'Manage all users within the organization.' },
  { path: 'users/RoleManagement.jsx', title: 'Role Management', icon: 'Shield', usefulness: 'Define and assign roles to users.' },
  { path: 'users/PermissionManagement.jsx', title: 'Permission Management', icon: 'Key', usefulness: 'Manage fine-grained permissions.' },
  { path: 'subscription/Plans.jsx', title: 'Plans', icon: 'ClipboardList', usefulness: 'View available subscription plans.' },
  { path: 'subscription/Billing.jsx', title: 'Billing', icon: 'Receipt', usefulness: 'Manage billing information and history.' },
  { path: 'subscription/Licenses.jsx', title: 'Licenses', icon: 'FileText', usefulness: 'Manage software licenses.' },
  { path: 'reports/Organization.jsx', title: 'Organization Reports', icon: 'BarChart2', usefulness: 'View organization-wide analytics.' },
  { path: 'reports/Hospital.jsx', title: 'Hospital Reports', icon: 'BarChart2', usefulness: 'View hospital-specific reports.' },
  { path: 'reports/Revenue.jsx', title: 'Revenue Reports', icon: 'DollarSign', usefulness: 'Analyze revenue generation.' },
  { path: 'compliance/Licenses.jsx', title: 'Compliance Licenses', icon: 'FileText', usefulness: 'Track compliance-related licenses.' },
  { path: 'compliance/AuditLogs.jsx', title: 'Audit Logs', icon: 'ListChecks', usefulness: 'Review system activity logs.' },
  { path: 'Notifications.jsx', title: 'Notifications', icon: 'Bell', usefulness: 'Manage system notifications.' },
  { path: 'Integrations.jsx', title: 'Integrations', icon: 'Link', usefulness: 'Manage third-party integrations.' },
  { path: 'Settings.jsx', title: 'Settings', icon: 'Settings', usefulness: 'Manage overall settings.' },
  { path: 'Profile.jsx', title: 'Profile', icon: 'User', usefulness: 'Manage personal profile.' }
];

filesToCreate.forEach(file => {
  const fullPath = path.join(pagesDir, file.path);
  const dirName = path.dirname(fullPath);
  
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  const content = `import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { ${file.icon} } from 'lucide-react';

const ${path.basename(file.path, '.jsx').replace(/[^a-zA-Z0-9]/g, '')} = () => {
  return (
    <ModulePlaceholder
      title="${file.title}"
      icon={${file.icon}}
      description="Manage ${file.title.toLowerCase()} settings and configurations."
      usefulness="${file.usefulness}"
    />
  );
};

export default ${path.basename(file.path, '.jsx').replace(/[^a-zA-Z0-9]/g, '')};
`;

  fs.writeFileSync(fullPath, content);
  console.log('Created:', fullPath);
});
