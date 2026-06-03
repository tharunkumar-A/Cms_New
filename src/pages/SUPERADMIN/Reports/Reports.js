import React from "react";
import { Download } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import Charts from "../../../components/superadmin/Charts";
import DataTable from "../../../components/superadmin/DataTable";
import { clinics, revenueData } from "../mockData";

function Reports() {
  const columns = [
    { key: "name", label: "Clinic" },
    {
      key: "revenue",
      label: "Revenue Report",
      render: (clinic) => `Rs. ${clinic.revenue.toLocaleString("en-IN")}`,
    },
    { key: "users", label: "User Activity" },
    {
      key: "performance",
      label: "Clinic Performance",
      render: (clinic) => (clinic.status === "Active" ? "Healthy" : "Needs Review"),
    },
  ];

  return (
    <>
      <Header
        title="Reports"
        subtitle="Revenue, user activity, and clinic performance reports."
        action={
          <>
            <button className="sa-btn">
              <Download size={16} />
              Export PDF
            </button>
            <button className="sa-btn sa-btn-primary">
              <Download size={16} />
              Export Excel
            </button>
          </>
        }
      />

      <div className="sa-panel">
        <h3>Reports Dashboard</h3>
        <p>Monthly revenue report and usage trend.</p>
        <Charts data={revenueData} type="line" dataKey="revenue" secondaryKey="users" />
      </div>

      <div style={{ marginTop: 16 }}>
        <DataTable columns={columns} rows={clinics} />
      </div>
    </>
  );
}

export default Reports;

