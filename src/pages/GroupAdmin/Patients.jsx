import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UsersRound } from 'lucide-react';

const Patients = () => {
  return (
    <ModulePlaceholder
      title="Patients"
      icon={UsersRound}
      description="View patient records across the group."
      usefulness="This module allows Group Admins to effectively manage patients across their designated group, ensuring compliance and operational efficiency."
    />
  );
};

export default Patients;
