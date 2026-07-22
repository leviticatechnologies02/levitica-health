import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { ClipboardList } from 'lucide-react';

const Subscriptions = () => {
  return (
    <ModulePlaceholder
      title="Plans"
      icon={ClipboardList}
      description="Manage plans settings and configurations."
      usefulness="View available subscription plans."
    />
  );
};

export default Subscriptions;
