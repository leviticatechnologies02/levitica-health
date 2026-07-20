import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UsersRound } from 'lucide-react';

const Patients = () => {
  return (
    <ModulePlaceholder
      title="Patients Management"
      icon={UsersRound}
      description="Manage patient records, admissions, and history."
      usefulness="A centralized patient database prevents medical errors, ensures doctors have instant access to medical history, and streamlines the admission/discharge process. It is the core of providing personalized and safe healthcare."
    />
  );
};

export default Patients;
