import React, { useEffect, useMemo, useState } from "react";
import { Building2, IndianRupee, ShieldCheck, UserCheck, Users } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import DashboardCards from "../../../components/superadmin/DashboardCards";
import Charts from "../../../components/superadmin/Charts";
import { activities, admins, clinics, revenueData, users } from "../mockData";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, []);

  const cards = useMemo(() => {
    const totalRevenue = clinics.reduce((sum, clinic) => sum + clinic.revenue, 0);
    const activeUsers = users.filter((user) => user.status === "Active").length;

    return [
      { label: "Total Clinics", value: clinics.length, icon: Building2, tone: "teal" },
      { label: "Total Admins", value: admins.length, icon: ShieldCheck, tone: "blue" },
      { label: "Total Users", value: users.length, icon: Users, tone: "amber" },
      { label: "Active Users", value: activeUsers, icon: UserCheck, tone: "green" },
      { label: "Revenue Summary", value: formatCurrency(totalRevenue), icon: IndianRupee, tone: "teal" },
    ];
  }, []);

  if (loading) {
    return <div className="sa-state">Loading Super Admin dashboard...</div>;
  }

  return (
    <>
      <Header
        title="Super Admin Dashboard"
        subtitle="Platform-wide clinics, users, revenue, and operational activity."
      />

      <DashboardCards cards={cards} />

      <div className="sa-grid">
        <div className="sa-panel">
          <h3>Charts & Statistics</h3>
          <p>Revenue and user growth across all clinics.</p>
          <Charts data={revenueData} dataKey="revenue" secondaryKey="users" />
        </div>

        <div className="sa-panel">
          <h3>Recent Activities</h3>
          <p>Latest platform events.</p>
          <div className="sa-activity-list">
            {activities.map((activity) => (
              <div className="sa-activity-item" key={activity.id}>
                <div>
                  <b>{activity.title}</b>
                  <p>{activity.detail}</p>
                </div>
                <span>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

