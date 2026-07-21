import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Users } from 'lucide-react';

const GroupsList = () => {
  return (
    <ModulePlaceholder
      title="Groups"
      icon={Users}
      description="Manage groups settings and configurations."
      usefulness="Manage organizational groups."
    />
  );
};

export default GroupsList;
