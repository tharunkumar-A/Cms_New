import React, { useMemo, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import DataTable from "../../../components/superadmin/DataTable";
import PermissionMatrix from "../../../components/superadmin/PermissionMatrix";
import { roles } from "../mockData";

function RolesPermissions() {
  const [showForm, setShowForm] = useState(false);

  const columns = useMemo(() => [
    { key: "name", label: "Role" },
    { key: "users", label: "Assigned Users", width: "minmax(110px, 0.7fr)" },
    {
      key: "permissions",
      label: "Permissions",
      width: "minmax(220px, 1.3fr)",
      render: (role) => role.permissions.join(", "),
    },
    {
      key: "actions",
      label: "Actions",
      width: "minmax(80px, 0.5fr)",
      render: () => (
        <button className="sa-icon-btn" onClick={() => setShowForm(true)} title="Edit role">
          <Pencil size={15} />
        </button>
      ),
    },
  ], []);

  return (
    <>
      <Header
        title="Roles & Permissions"
        subtitle="Create roles and assign View, Create, Edit, and Delete permissions."
        action={
          <button className="sa-btn sa-btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={16} />
            Create Role
          </button>
        }
      />

      {showForm ? (
        <div className="sa-form-card" style={{ marginBottom: 16 }}>
          <h3>Create Role</h3>
          <div className="sa-form-grid">
            <div className="sa-form-field">
              <label>Role Name</label>
              <input placeholder="Enter role name" />
            </div>
            <div className="sa-form-field">
              <label>Status</label>
              <select>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="sa-page-actions" style={{ marginTop: 14 }}>
            <button className="sa-btn" onClick={() => setShowForm(false)}>Close</button>
            <button className="sa-btn sa-btn-primary">Save Role</button>
          </div>
        </div>
      ) : null}

      <DataTable columns={columns} rows={roles} />

      <div className="sa-panel" style={{ marginTop: 16 }}>
        <h3>Assign Permissions</h3>
        <p>Permission matrix for the current role list.</p>
        <PermissionMatrix roles={roles} />
      </div>
    </>
  );
}

export default RolesPermissions;

