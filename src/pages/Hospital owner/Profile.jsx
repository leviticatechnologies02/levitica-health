import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <ModulePlaceholder
      title="Profile"
      icon={User}
      description="Manage profile settings and configurations."
      usefulness="Manage personal profile."
    />
  );
};

export default Profile;
