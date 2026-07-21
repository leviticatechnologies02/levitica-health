import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { UserCog } from 'lucide-react';

const Profile = () => {
  return (
    <ModulePlaceholder
      title="Organization Profile"
      icon={UserCog}
      description="Manage organization profile settings and configurations."
      usefulness="Manage organization details."
    />
  );
};

export default Profile;
