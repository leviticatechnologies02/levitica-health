import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { DoorClosed } from 'lucide-react';

const Rooms = () => {
  return (
    <ModulePlaceholder
      title="Hospital Rooms"
      icon={DoorClosed}
      description="Manage room allocations, types, and pricing configurations."
      usefulness="Tracking rooms individually allows the hospital to manage different room types (e.g., Private, Semi-Private, General) and auto-calculate room tariffs during the billing process, ensuring accurate patient charging."
    />
  );
};

export default Rooms;
