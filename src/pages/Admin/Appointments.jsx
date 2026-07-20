import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Calendar } from 'lucide-react';

const Appointments = () => {
  return (
    <ModulePlaceholder
      title="Appointments"
      icon={Calendar}
      description="Schedule and manage patient appointments with doctors."
      usefulness="Efficient appointment scheduling minimizes patient wait times, optimizes doctor availability, and reduces no-shows through automated reminders. It directly improves patient satisfaction and hospital throughput."
    />
  );
};

export default Appointments;
