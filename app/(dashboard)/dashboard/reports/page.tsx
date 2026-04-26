import { ComingSoonPage } from "@/components/shared/ComingSoonPage";
import { withRoles } from "@/components/shared/withRoles";

export const metadata = {
  title: "التقارير - Smart Vision",
};

function ReportsPage() {
  return (
    <ComingSoonPage
      title="التقارير"
      description="صفحة التقارير قيد التطوير. ستتمكن من عرض التقارير وتحليل البيانات."
    />
  );
}

export default withRoles("reports")(ReportsPage);
