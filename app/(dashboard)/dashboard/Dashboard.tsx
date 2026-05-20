"use client";

import { LayoutDashboard } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useProducts";
import { useGetAllUsers } from "@/hooks/useUsers";
import { useGetAllRoles } from "@/hooks/useRoles";
import { useGetAllActivities } from "@/hooks/useActivity";
import LoadingState from "@/components/shared/Loading";
import { WelcomeBanner } from "./_components/WelcomeBanner";
import { StatsGrid } from "./_components/StatsGrid";
import { RecentActivity } from "./_components/RecentActivity";
import { QuickLinks } from "./_components/QuickLinks";
import { SystemActivityChart } from "./_components/charts/SystemActivityChart";
import { RolesDistributionChart } from "./_components/charts/RolesDistributionChart";
import { SystemOverview } from "./_components/SystemOverview";

export default function DashboardPage() {
  const { data: products, isLoading: productsLoading } = useGetAllProducts();
  const { data: users, isLoading: usersLoading } = useGetAllUsers();
  const { data: roles, isLoading: rolesLoading } = useGetAllRoles();
  const { data: activities, isLoading: activitiesLoading } =
    useGetAllActivities();

  if (productsLoading && usersLoading && rolesLoading && activitiesLoading) {
    return <LoadingState icon={LayoutDashboard} />;
  }

  return (
    <div className="space-y-5 sm:space-y-7 pb-10" dir="rtl">
      <WelcomeBanner />
      <StatsGrid
        users={users}
        products={products}
        roles={roles}
        activities={activities}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-3">
          <SystemOverview />
        </div>
        <div className="lg:col-span-2">
          <SystemActivityChart activities={activities || []} />
        </div>
        <div>
          <RolesDistributionChart users={users || []} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} />
        </div>
        <div>
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}
