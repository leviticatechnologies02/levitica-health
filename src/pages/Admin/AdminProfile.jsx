import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UserCircle } from 'lucide-react';

const AdminProfile = () => {
  return (
    <ModulePlaceholder
      title="Admin Profile"
      icon={UserCircle}
      description="Manage your administrator account details and security."
      usefulness="A dedicated profile section ensures that the hospital admin can securely update their credentials, set up Two-Factor Authentication (2FA), and review their own recent activity logs to maintain strict account security."
    />
  );
};

export default AdminProfile;
