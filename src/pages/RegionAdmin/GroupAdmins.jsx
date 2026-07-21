import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UserCheck } from 'lucide-react';

const GroupAdmins = () => {
  return (
    <ModulePlaceholder
      title="Group Admins"
      icon={UserCheck}
      description="Manage administrators for groups."
      usefulness="This module allows Region Admins to effectively manage group admins across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default GroupAdmins;
