import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { ListChecks } from 'lucide-react';

const CompAuditLogs = () => {
  return (
    <ModulePlaceholder
      title="Audit Logs"
      icon={ListChecks}
      description="Manage audit logs settings and configurations."
      usefulness="Review system activity logs."
    />
  );
};

export default CompAuditLogs;
