import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Receipt } from 'lucide-react';

const Billing = () => {
  return (
    <ModulePlaceholder
      title="Billing & Invoicing"
      icon={Receipt}
      description="Manage patient bills, insurance claims, and payments."
      usefulness="An integrated billing system auto-generates invoices based on pharmacy, lab, and consultation records. It ensures financial accuracy, speeds up insurance claims processing, and provides a transparent financial breakdown for patients."
    />
  );
};

export default Billing;
