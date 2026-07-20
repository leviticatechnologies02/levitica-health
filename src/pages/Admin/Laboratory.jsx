import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Microscope } from 'lucide-react';

const Laboratory = () => {
  return (
    <ModulePlaceholder
      title="Laboratory Module"
      icon={Microscope}
      description="Manage lab tests, samples, and diagnostic reports."
      usefulness="Digitizing lab workflows ensures that diagnostic reports are instantly attached to patient profiles. This eliminates paper trails, speeds up diagnoses, and alerts doctors immediately when critical results are ready."
    />
  );
};

export default Laboratory;
