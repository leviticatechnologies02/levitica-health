import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { UserCheck } from 'lucide-react';

const GroupsAdmins = () => {
  return (
    <ModulePlaceholder
      title="Group Admins"
      icon={UserCheck}
      description="Manage group admins settings and configurations."
      usefulness="Manage group administrators."
    />
  );
};

export default GroupsAdmins;
