import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Users } from 'lucide-react';

const Employees = () => {
  return (
    <ModulePlaceholder
      title="General Staff & Employees"
      icon={Users}
      description="Manage janitorial, security, maintenance, and administrative staff."
      usefulness="A complete employee directory allows the administration to manage payroll, track attendance, and assign specific operational tasks to non-clinical staff, ensuring the hospital facility runs smoothly 24/7."
    />
  );
};

export default Employees;
