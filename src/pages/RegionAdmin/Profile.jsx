import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <ModulePlaceholder
      title="My Profile"
      icon={User}
      description="Manage your region admin profile."
      usefulness="This module allows Region Admins to effectively manage my profile across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Profile;
