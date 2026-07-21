import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Megaphone } from 'lucide-react';

const Announcements = () => {
  return (
    <ModulePlaceholder
      title="Announcements"
      icon={Megaphone}
      description="Broadcast announcements to branches."
      usefulness="This module allows Region Admins to effectively manage announcements across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Announcements;
