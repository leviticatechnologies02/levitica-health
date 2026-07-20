import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Megaphone } from 'lucide-react';

const Announcements = () => {
  return (
    <ModulePlaceholder
      title="Announcements"
      icon={Megaphone}
      description="Broadcast important notices to hospital staff and patients."
      usefulness="Centralized announcements ensure that all hospital staff receive critical updates immediately (e.g., policy changes, emergency protocols, or system downtime). It replaces inefficient email chains with a unified communication dashboard."
    />
  );
};

export default Announcements;
