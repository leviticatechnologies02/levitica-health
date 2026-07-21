import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { UserCheck } from 'lucide-react';

const RegionsAdmins = () => {
  return (
    <ModulePlaceholder
      title="Region Admins"
      icon={UserCheck}
      description="Manage region admins settings and configurations."
      usefulness="Manage administrators for regions."
    />
  );
};

export default RegionsAdmins;
