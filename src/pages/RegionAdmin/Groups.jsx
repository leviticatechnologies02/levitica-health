import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Users } from 'lucide-react';

const Groups = () => {
  return (
    <ModulePlaceholder
      title="Groups"
      icon={Users}
      description="Manage organizational groups within your region."
      usefulness="This module allows Region Admins to effectively manage groups across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Groups;
