import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Users } from 'lucide-react';

const Patients = () => {
  return (
    <ModulePlaceholder
      title="Patients"
      icon={Users}
      description="Manage organization users settings and configurations."
      usefulness="Manage all users within the organization."
    />
  );
};

export default Patients;
