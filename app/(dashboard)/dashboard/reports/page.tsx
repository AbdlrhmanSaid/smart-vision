"use client";

import { ComingSoonPage } from "@/components/shared/ComingSoonPage";
import { withRoles } from "@/components/shared/withRoles";

function ReportsPage() {
  return (
    <ComingSoonPage title="التقارير" description="صفحة التقارير قيد التطوير." />
  );
}

export default withRoles("reports")(ReportsPage);
