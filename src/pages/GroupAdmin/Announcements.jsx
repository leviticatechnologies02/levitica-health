import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Megaphone } from 'lucide-react';

const Announcements = () => {
  return (
    <ModulePlaceholder
      title="Notifications & Announcements"
      icon={Megaphone}
      description="Broadcast announcements to branches."
      usefulness="This module allows Group Admins to effectively manage announcements across their designated group, ensuring compliance and operational efficiency."
    />
  );
};

export default Announcements;
