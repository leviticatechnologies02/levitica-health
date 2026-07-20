import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Headphones } from 'lucide-react';

const Receptionists = () => {
  return (
    <ModulePlaceholder
      title="Receptionists"
      icon={Headphones}
      description="Manage front-desk staff, OPD access, and scheduling rights."
      usefulness="Receptionists are the first point of contact. Giving them dedicated access profiles ensures they can efficiently book appointments, register new patients, and handle inquiries without accessing sensitive clinical data."
    />
  );
};

export default Receptionists;
