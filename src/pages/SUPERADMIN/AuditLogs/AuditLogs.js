import React, { useMemo, useState } from "react";
import Header from "../../../components/superadmin/Header";
import DataTable from "../../../components/superadmin/DataTable";
import SearchFilter from "../../../components/superadmin/SearchFilter";
import { auditLogs } from "../mockData";

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("All");

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return auditLogs.filter((log) => {
      const matchesSearch = [log.user, log.action, log.timestamp]
        .some((value) => String(value).toLowerCase().includes(query));
      const matchesModule = module === "All" || log.module === module;
      return matchesSearch && matchesModule;
    });
  }, [search, module]);

  const columns = [
    { key: "user", label: "User" },
    { key: "action", label: "Action", width: "minmax(240px, 1.6fr)" },
    { key: "timestamp", label: "Timestamp", width: "minmax(170px, 1fr)" },
    { key: "module", label: "Module" },
  ];

  return (
    <>
      <Header title="Audit Logs" subtitle="Track user, action, and timestamp records." />
      <SearchFilter
        value={search}
        onChange={setSearch}
        placeholder="Search audit logs by user, action, or timestamp..."
        filters={["All", "Clinics", "Reports", "Notifications"]}
        selectedFilter={module}
        onFilterChange={setModule}
      />
      <DataTable columns={columns} rows={rows} emptyMessage="No audit logs match your filters." />
    </>
  );
}

export default AuditLogs;

