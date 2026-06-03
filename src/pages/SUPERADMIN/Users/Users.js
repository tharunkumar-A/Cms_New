import React, { useMemo, useState } from "react";
import { Eye, ToggleLeft, ToggleRight } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import DataTable from "../../../components/superadmin/DataTable";
import SearchFilter from "../../../components/superadmin/SearchFilter";
import { users as userData } from "../mockData";

function Users() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [users, setUsers] = useState(userData);
  const [selectedUser, setSelectedUser] = useState(null);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.clinic, user.type]
        .some((value) => String(value).toLowerCase().includes(query));
      const matchesStatus = status === "All" || user.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status, users]);

  const toggleStatus = (userId) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      )
    );
  };

  const columns = [
    { key: "name", label: "User" },
    { key: "email", label: "Email", width: "minmax(170px, 1.2fr)" },
    { key: "clinic", label: "Clinic" },
    { key: "type", label: "Type", width: "minmax(90px, 0.6fr)" },
    {
      key: "status",
      label: "Status",
      width: "minmax(90px, 0.6fr)",
      render: (user) => (
        <span className={`sa-badge ${user.status === "Active" ? "is-active" : "is-danger"}`}>
          {user.status}
        </span>
      ),
    },
    { key: "lastActive", label: "Last Active" },
    {
      key: "actions",
      label: "Actions",
      width: "minmax(112px, 0.7fr)",
      render: (user) => (
        <div className="sa-actions">
          <button className="sa-icon-btn" onClick={() => setSelectedUser(user)} title="User details">
            <Eye size={15} />
          </button>
          <button className="sa-icon-btn" onClick={() => toggleStatus(user.id)} title="Activate or deactivate user">
            {user.status === "Active" ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title="User Management" subtitle="Search, filter, view, activate, and deactivate users." />

      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Search users by name, email, clinic, or type..."
        filters={["All", "Active", "Inactive"]}
        selectedFilter={status}
        onFilterChange={setStatus}
      />

      <DataTable columns={columns} rows={rows} emptyMessage="No users match your filters." />

      {selectedUser ? (
        <div className="sa-form-card" style={{ marginTop: 16 }}>
          <Header
            title="User Details"
            subtitle={selectedUser.id}
            action={<button className="sa-btn" onClick={() => setSelectedUser(null)}>Close</button>}
          />
          <div className="sa-form-grid">
            {["name", "email", "clinic", "type", "status", "lastActive"].map((key) => (
              <div className="sa-form-field" key={key}>
                <label>{key.replace(/^\w/, (letter) => letter.toUpperCase())}</label>
                <input value={selectedUser[key]} readOnly />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Users;

