import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Activity } from 'lucide-react';

const Radiology = () => {
  return (
    <ModulePlaceholder
      title="Radiology Module"
      icon={Activity}
      description="Manage X-Rays, MRIs, scans, and imaging reports."
      usefulness="Radiology integration allows for secure storage and sharing of large medical images (DICOM). It enables remote consultations and ensures imaging results are immediately available in the doctor's consultation room."
    />
  );
};

export default Radiology;
