import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { BedDouble } from 'lucide-react';

const Wards = () => {
  return (
    <ModulePlaceholder
      title="Hospital Wards"
      icon={BedDouble}
      description="Configure wards (ICU, General, Maternity) and their capacities."
      usefulness="Defining wards is critical for patient segregation (e.g., separating infectious patients from post-op patients). It also allows admins to track specialized bed availability like ICU or NICU spots instantly."
    />
  );
};

export default Wards;
