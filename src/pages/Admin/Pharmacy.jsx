import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Store } from 'lucide-react';

const Pharmacy = () => {
  return (
    <ModulePlaceholder
      title="Pharmacy Module"
      icon={Store}
      description="Manage medicine inventory, prescriptions, and dispensations."
      usefulness="This module allows the hospital admin to track medication stock in real-time, prevent stockouts of critical drugs, and seamlessly integrate prescriptions from doctors directly to the pharmacy for faster patient service."
    />
  );
};

export default Pharmacy;
