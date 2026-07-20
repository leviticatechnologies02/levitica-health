import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Pill } from 'lucide-react';

const Pharmacists = () => {
  return (
    <ModulePlaceholder
      title="Pharmacists"
      icon={Pill}
      description="Manage pharmacy staff profiles and dispensing permissions."
      usefulness="Managing pharmacist access ensures that only qualified personnel can authorize medication dispensation, manage inventory thresholds, and process digital prescriptions, maintaining strict regulatory compliance."
    />
  );
};

export default Pharmacists;
