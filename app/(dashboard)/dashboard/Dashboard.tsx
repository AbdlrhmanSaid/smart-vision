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
    <div className="space-y-7 pb-10" dir="rtl">
      <WelcomeBanner />
      <StatsGrid users={users} products={products} roles={roles} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RecentActivity activities={activities} />
        <QuickLinks />
      </div>
    </div>
  );
}
