import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Bed } from 'lucide-react';

const Beds = () => {
  return (
    <ModulePlaceholder
      title="Bed Management"
      icon={Bed}
      description="Track individual bed status, occupancy, and maintenance schedules."
      usefulness="Granular bed management is crucial for real-time admission decisions. It prevents overbooking and allows staff to instantly see which beds are occupied, being cleaned, or available for new incoming patients."
    />
  );
};

export default Beds;
