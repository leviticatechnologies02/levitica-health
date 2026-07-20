import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Ambulance as AmbulanceIcon } from 'lucide-react';

const Ambulance = () => {
  return (
    <ModulePlaceholder
      title="Ambulance Fleet"
      icon={AmbulanceIcon}
      description="Manage ambulance dispatch, drivers, and real-time tracking."
      usefulness="A dedicated ambulance dispatch system minimizes emergency response times. By tracking fleet location and driver availability in real-time, hospital admins can ensure critical care reaches patients as fast as possible."
    />
  );
};

export default Ambulance;
