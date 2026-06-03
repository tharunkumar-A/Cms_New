export const clinics = [
  {
    id: "CLN-1001",
    name: "MediCore Central",
    address: "MG Road, Bengaluru",
    contactNumber: "+91 98765 41001",
    email: "central@medicore.in",
    status: "Active",
    revenue: 842000,
    users: 214,
  },
  {
    id: "CLN-1002",
    name: "MediCore North",
    address: "Salt Lake, Kolkata",
    contactNumber: "+91 98765 41002",
    email: "north@medicore.in",
    status: "Active",
    revenue: 621000,
    users: 168,
  },
  {
    id: "CLN-1003",
    name: "MediCore West",
    address: "Andheri East, Mumbai",
    contactNumber: "+91 98765 41003",
    email: "west@medicore.in",
    status: "Inactive",
    revenue: 305000,
    users: 92,
  },
];

export const admins = [
  {
    id: "ADM-501",
    name: "Ananya Rao",
    email: "ananya.rao@medicore.in",
    assignedClinic: "MediCore Central",
    role: "Clinic Admin",
    status: "Active",
  },
  {
    id: "ADM-502",
    name: "Kabir Mehta",
    email: "kabir.mehta@medicore.in",
    assignedClinic: "MediCore North",
    role: "Billing Admin",
    status: "Active",
  },
  {
    id: "ADM-503",
    name: "Neha Singh",
    email: "neha.singh@medicore.in",
    assignedClinic: "MediCore West",
    role: "Operations Admin",
    status: "Inactive",
  },
];

export const users = [
  {
    id: "USR-9001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    clinic: "MediCore Central",
    type: "Patient",
    status: "Active",
    lastActive: "Today, 10:30 AM",
  },
  {
    id: "USR-9002",
    name: "Dr. Isha Menon",
    email: "isha.menon@medicore.in",
    clinic: "MediCore North",
    type: "Doctor",
    status: "Active",
    lastActive: "Today, 9:15 AM",
  },
  {
    id: "USR-9003",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    clinic: "MediCore West",
    type: "Patient",
    status: "Inactive",
    lastActive: "May 30, 2026",
  },
];

export const roles = [
  {
    id: "ROL-01",
    name: "Super Admin",
    users: 2,
    permissions: ["View", "Create", "Edit", "Delete"],
  },
  {
    id: "ROL-02",
    name: "Clinic Admin",
    users: 12,
    permissions: ["View", "Create", "Edit"],
  },
  {
    id: "ROL-03",
    name: "Report Viewer",
    users: 7,
    permissions: ["View"],
  },
];

export const activities = [
  {
    id: 1,
    title: "New clinic added",
    detail: "MediCore North was created by Ananya Rao",
    time: "12 min ago",
  },
  {
    id: 2,
    title: "Admin status updated",
    detail: "Neha Singh was marked inactive",
    time: "48 min ago",
  },
  {
    id: 3,
    title: "Monthly revenue exported",
    detail: "Revenue report downloaded as Excel",
    time: "2 hrs ago",
  },
  {
    id: 4,
    title: "Notification sent",
    detail: "System maintenance notice sent to all clinics",
    time: "Yesterday",
  },
];

export const revenueData = [
  { name: "Jan", revenue: 480000, users: 360 },
  { name: "Feb", revenue: 560000, users: 410 },
  { name: "Mar", revenue: 610000, users: 455 },
  { name: "Apr", revenue: 690000, users: 498 },
  { name: "May", revenue: 760000, users: 540 },
  { name: "Jun", revenue: 842000, users: 592 },
];

export const auditLogs = [
  {
    id: "AUD-301",
    user: "Ananya Rao",
    action: "Created clinic MediCore North",
    timestamp: "2026-06-03 10:24 AM",
    module: "Clinics",
  },
  {
    id: "AUD-302",
    user: "Kabir Mehta",
    action: "Exported revenue report",
    timestamp: "2026-06-03 09:40 AM",
    module: "Reports",
  },
  {
    id: "AUD-303",
    user: "System",
    action: "Sent appointment reminder batch",
    timestamp: "2026-06-02 06:00 PM",
    module: "Notifications",
  },
];

export const notifications = [
  {
    id: "NTF-01",
    title: "System maintenance",
    message: "Scheduled maintenance tonight from 11 PM to 12 AM.",
    targetUsers: "All Clinics",
    status: "Sent",
  },
  {
    id: "NTF-02",
    title: "Payment gateway update",
    message: "New settlement report format is available.",
    targetUsers: "Clinic Admins",
    status: "Draft",
  },
];

