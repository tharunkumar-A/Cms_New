import React, { useMemo, useState } from "react";
import { Eye, Pencil, Plus } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import DataTable from "../../../components/superadmin/DataTable";
import SearchFilter from "../../../components/superadmin/SearchFilter";
import { admins } from "../mockData";

function Admins() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return admins.filter((admin) => {
      const matchesSearch = [admin.name, admin.email, admin.assignedClinic, admin.role]
        .some((value) => String(value).toLowerCase().includes(query));
      const matchesStatus = status === "All" || admin.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email", width: "minmax(170px, 1.2fr)" },
    { key: "assignedClinic", label: "Assigned Clinic" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      width: "minmax(90px, 0.6fr)",
      render: (admin) => (
        <span className={`sa-badge ${admin.status === "Active" ? "is-active" : "is-danger"}`}>
          {admin.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "minmax(112px, 0.7fr)",
      render: (admin) => (
        <div className="sa-actions">
          <button className="sa-icon-btn" onClick={() => setSelectedAdmin(admin)} title="View admin">
            <Eye size={15} />
          </button>
          <button className="sa-icon-btn" onClick={() => setSelectedAdmin(admin)} title="Edit admin">
            <Pencil size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header
        title="Admin Management"
        subtitle={`${rows.length} admins found`}
        action={
          <button className="sa-btn sa-btn-primary" onClick={() => setShowForm((value) => !value)}>
            <Plus size={16} />
            Create Admin
          </button>
        }
      />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Search admins by name, email, clinic, or role..."
        filters={["All", "Active", "Inactive"]}
        selectedFilter={status}
        onFilterChange={setStatus}
      />

      {showForm || selectedAdmin ? (
        <div className="sa-form-card" style={{ marginBottom: 16 }}>
          <h3>{selectedAdmin ? "Edit Admin" : "Create Admin"}</h3>
          <div className="sa-form-grid">
            {["name", "email", "assignedClinic", "role"].map((key) => (
              <div className="sa-form-field" key={key}>
                <label>{key === "assignedClinic" ? "Assigned Clinic" : key.replace(/^\w/, (letter) => letter.toUpperCase())}</label>
                <input defaultValue={selectedAdmin?.[key] || ""} />
              </div>
            ))}
            <div className="sa-form-field">
              <label>Status</label>
              <select defaultValue={selectedAdmin?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="sa-page-actions" style={{ marginTop: 14 }}>
            <button className="sa-btn" onClick={() => { setShowForm(false); setSelectedAdmin(null); }}>
              Close
            </button>
            <button className="sa-btn sa-btn-primary">Save Admin</button>
          </div>
        </div>
      ) : null}

      <DataTable columns={columns} rows={rows} emptyMessage="No admins match your filters." />
    </>
  );
}

export default Admins;

