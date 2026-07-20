import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Stethoscope } from 'lucide-react';

const Nurses = () => {
  return (
    <ModulePlaceholder
      title="Nurses Management"
      icon={Stethoscope}
      description="Manage nursing staff, shift allocations, and ward assignments."
      usefulness="Efficient nurse scheduling ensures optimal patient-to-nurse ratios across all wards. It helps prevent staff burnout and guarantees that critical care units are always adequately staffed."
    />
  );
};

export default Nurses;
