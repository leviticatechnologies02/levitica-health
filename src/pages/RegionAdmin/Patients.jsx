import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UsersRound } from 'lucide-react';

const Patients = () => {
  return (
    <ModulePlaceholder
      title="Patients"
      icon={UsersRound}
      description="View patient records across the region."
      usefulness="This module allows Region Admins to effectively manage patients across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Patients;
