import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <ModulePlaceholder
      title="My Profile"
      icon={User}
      description="Manage your group admin profile."
      usefulness="This module allows Group Admins to effectively manage my profile across their designated group, ensuring compliance and operational efficiency."
    />
  );
};

export default Profile;
