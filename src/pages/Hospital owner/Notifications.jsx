import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <ModulePlaceholder
      title="Notifications"
      icon={Bell}
      description="Manage notifications settings and configurations."
      usefulness="Manage system notifications."
    />
  );
};

export default Notifications;
