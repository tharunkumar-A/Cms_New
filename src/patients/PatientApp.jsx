import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  Download,
  Edit3,
  FileText,
  Link as LinkIcon,
  LogOut,
  Pill,
  Stethoscope,
  Trash2,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { formatIndianCurrency } from "../utils/format";
import "./PatientApp.css";

const patient = {
  name: "Ananya Sharma",
  firstName: "Ananya",
  email: "ananya.sharma@example.com",
  phone: "+91 98765 43210",
  dob: "1994-06-14",
  gender: "Female",
  bloodGroup: "O+",
  address: "204 Rosewood Apartments, Bandra West, Mumbai 400050",
  emergency: {
    name: "Rahul Sharma",
    relation: "Spouse",
    phone: "+91 91234 56789",
  },
  allergies: ["Penicillin", "Dust mites"],
  conditions: ["Mild Asthma"],
  medications: ["Levocetirizine 5mg (as needed)"],
};

const visits = [
  {
    id: "v1",
    date: "2026-06-12",
    doctor: "Dr. Arjun Rao",
    department: "Cardiology",
    diagnosis: "Mild hypertension, stress-related",
  },
  {
    id: "v2",
    date: "2026-05-08",
    doctor: "Dr. Vikram Shah",
    department: "General Medicine",
    diagnosis: "Allergic rhinitis",
  },
];

const prescriptions = [
  {
    id: "rx1",
    date: "2026-06-12",
    title: "Mild hypertension, stress-related",
    doctor: "Dr. Arjun Rao",
    department: "Cardiology",
    medicines: [
      { name: "Amlodipine", dosage: "5 mg", frequency: "Once daily", duration: "30 days" },
      { name: "Ecosprin", dosage: "75 mg", frequency: "Once daily", duration: "30 days" },
    ],
    notes: "Reduce salt intake. Walk 30 minutes daily. Review in 4 weeks.",
  },
  {
    id: "rx2",
    date: "2026-05-08",
    title: "Allergic rhinitis",
    doctor: "Dr. Vikram Shah",
    department: "General Medicine",
    medicines: [
      { name: "Levocetirizine", dosage: "5 mg", frequency: "At night", duration: "7 days" },
      { name: "Saline spray", dosage: "2 sprays", frequency: "Twice daily", duration: "7 days" },
    ],
    notes: "Avoid dust exposure and keep hydration adequate.",
  },
];

const initialNotifications = [
  {
    id: "n1",
    icon: Stethoscope,
    title: "Appointment confirmed",
    message: "Your appointment APT-2026-8663 is confirmed for 2026-07-06 at 12:15.",
    time: "7/2/2026, 12:47:00 PM",
    unread: true,
  },
  {
    id: "n2",
    icon: Stethoscope,
    title: "Appointment confirmed",
    message: "Your appointment APT-2026-3229 is confirmed for 2026-07-05 at 13:45.",
    time: "7/2/2026, 12:27:17 PM",
    unread: true,
  },
  {
    id: "n3",
    icon: Stethoscope,
    title: "Upcoming appointment with Dr. Priya Menon",
    message: "Scheduled on 2026-07-04 at 10:30 AM at Aurora Health Clinic.",
    time: "7/2/2026, 11:36:21 AM",
    unread: true,
  },
  {
    id: "n4",
    icon: CreditCard,
    title: "New bill INV-2026-0212",
    message: "A new bill is available for your recent consultation.",
    time: "7/2/2026, 10:36:21 AM",
    unread: true,
  },
  {
    id: "n5",
    icon: LinkIcon,
    title: "Prescription from Dr. Arjun Rao",
    message: "Your prescription is ready to view and download.",
    time: "6/30/2026, 11:36:21 AM",
    unread: false,
  },
];

const bills = [
  {
    id: "b1",
    invoiceNo: "INV-2026-0212",
    appointmentId: "APT-2026-8663",
    date: "2026-06-12",
    doctor: "Dr. Arjun Rao",
    department: "Cardiology",
    status: "Pending",
    paymentMode: "UPI",
    dueDate: "2026-07-07",
    charges: [
      { label: "Consultation charges", amount: 700 },
      { label: "Lab charges", amount: 1850 },
      { label: "Medicine charges", amount: 1240 },
      { label: "ECG / procedure charges", amount: 650 },
      { label: "Service charges", amount: 120 },
    ],
  },
  {
    id: "b2",
    invoiceNo: "INV-2026-0184",
    appointmentId: "APT-2026-3229",
    date: "2026-05-08",
    doctor: "Dr. Vikram Shah",
    department: "General Medicine",
    status: "Paid",
    paymentMode: "Card",
    dueDate: "2026-05-08",
    charges: [
      { label: "Consultation charges", amount: 500 },
      { label: "Lab charges", amount: 0 },
      { label: "Medicine charges", amount: 480 },
      { label: "Other charges", amount: 75 },
    ],
  },
];

const paymentModes = ["UPI", "Cash", "Card", "Net Banking", "Insurance", "Wallet"];

const formatLongDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

const getBillTotal = (bill) =>
  bill.charges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0);

const steps = ["Clinic", "Department", "Doctor", "Date & time", "Confirm"];

function Shell({ notifications, children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const logout = () => {
    ["token", "userRole", "patientName", "patientId", "patientToken"].forEach((key) =>
      localStorage.removeItem(key)
    );
    setMenuOpen(false);
    navigate("/patients/register", { replace: true });
  };

  return (
    <div className="patient-portal">
      <aside className="pp-sidebar">
        <div className="pp-brand">
          <div className="pp-brand-mark">+</div>
          <div>
            <strong>CMS</strong>
            <span>Patient Portal</span>
          </div>
        </div>
        <nav className="pp-nav">
          <span className="pp-nav-label">Care</span>
          <NavItem to="/patient/dashboard" icon={ClipboardList} label="Dashboard" />
          <NavItem to="/patient/appointments/book" icon={Calendar} label="Appointments" />
          <NavItem to="/patient/medical-history" icon={FileText} label="Medical History" />
          <NavItem to="/patient/prescriptions" icon={Pill} label="Prescriptions" />
          <NavItem to="/patient/bills" icon={CreditCard} label="Bills" />
          <NavItem to="/patient/notifications" icon={Bell} label="Notifications" badge={unreadCount} />
          <NavItem to="/patient/profile" icon={UserRound} label="My Profile" />
        </nav>
        <div className="pp-patient-chip">
          <div className="pp-avatar">AS</div>
          <div>
            <strong>{patient.name}</strong>
            <span>{patient.bloodGroup} - {patient.gender}</span>
          </div>
        </div>
      </aside>
      <main className="pp-main">
        <header className="pp-topbar">
          <div />
          <div className="pp-top-actions">
            <NavLink to="/patient/notifications" className="pp-icon-btn">
              <Bell size={17} />
              {unreadCount ? <span className="pp-dot" /> : null}
            </NavLink>
            <div className="pp-account-menu" ref={menuRef}>
              <button
                className="pp-account-toggle"
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span className="pp-avatar">AS</span>
                <span className="pp-account-name">{patient.firstName}</span>
                <ChevronDown size={15} />
              </button>
              {menuOpen ? (
                <div className="pp-account-dropdown" role="menu">
                  <div className="pp-account-summary">
                    <strong>{patient.name}</strong>
                    <span>{patient.email}</span>
                  </div>
                  <button type="button" onClick={logout} role="menuitem">
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, badge }) {
  return (
    <NavLink to={to} className={({ isActive }) => `pp-nav-item ${isActive ? "active" : ""}`}>
      <Icon size={16} />
      <span>{label}</span>
      {badge ? <em>{badge}</em> : null}
    </NavLink>
  );
}

function Page({ title, subtitle, action, children }) {
  return (
    <>
      <section className="pp-page-head">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {action}
      </section>
      <section className="pp-content">{children}</section>
    </>
  );
}

function Dashboard({ notifications }) {
  const navigate = useNavigate();
  const next = { date: "2026-07-04", time: "10:30", doctor: "Dr. Priya Menon" };
  const pendingBills = bills.filter((bill) => bill.status.toLowerCase() !== "paid");
  const pendingTotal = pendingBills.reduce((sum, bill) => sum + getBillTotal(bill), 0);

  return (
    <Page
      title={`Good day, ${patient.firstName}`}
      subtitle="Here's what's happening with your care."
      action={
        <button className="pp-primary" onClick={() => navigate("/patient/appointments/book")}>
          <Calendar size={15} /> Book appointment
        </button>
      }
    >
      <div className="pp-stats">
        <Stat label="Upcoming appointment" value={formatLongDate(next.date)} text={`${next.time} - ${next.doctor}`} />
        <Stat label="Previous visits" value={visits.length} text="Completed consultations" />
        <Stat label="Prescriptions" value={prescriptions.length} text="Available to download" />
        <Stat label="Bills pending" value={formatIndianCurrency(pendingTotal, { minimumFractionDigits: 0 })} text={`${pendingBills.length} invoice pending`} />
      </div>
      <div className="pp-dashboard-grid">
        <div className="pp-card pp-appointment-card">
          <div className="pp-card-head">
            <h2>Upcoming appointment</h2>
            <button type="button" onClick={() => navigate("/patient/appointments/book")}>View all</button>
          </div>
          <div className="pp-visit-row">
            <div className="pp-doctor-avatar">DR</div>
            <div>
              <strong>{next.doctor}</strong>
              <p>General Medicine - Aurora Health Clinic</p>
              <small>{formatLongDate(next.date)} at {next.time}</small>
              <span className="pp-badge">Confirmed</span>
            </div>
            <div className="pp-row-actions">
              <button className="pp-primary small">View details</button>
              <button className="pp-secondary small">Reschedule</button>
            </div>
          </div>
        </div>
        <div className="pp-card">
          <div className="pp-card-head">
            <h2>Notifications</h2>
          </div>
          <div className="pp-mini-list">
            {notifications.slice(0, 4).map((item) => (
              <div className="pp-mini-note" key={item.id}>
                <span />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.message}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="pp-link-btn" onClick={() => navigate("/patient/notifications")}>
            Open notifications
          </button>
        </div>
      </div>
      <div className="pp-quick-actions">
        <button onClick={() => navigate("/patient/appointments/book")}><Calendar size={18} /> Book appointment</button>
        <button onClick={() => navigate("/patient/reports")}><FileText size={18} /> View reports</button>
        <button onClick={() => navigate("/patient/prescriptions")}><Pill size={18} /> View prescriptions</button>
        <button onClick={() => navigate("/patient/bills")}><CreditCard size={18} /> Payments</button>
      </div>
    </Page>
  );
}

function Stat({ label, value, text }) {
  return (
    <div className="pp-card pp-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{text}</p>
    </div>
  );
}

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [booking, setBooking] = useState({
    clinic: "Aurora Health Clinic",
    department: "Cardiology",
    doctor: "Dr. Arjun Rao",
    date: "2026-07-06",
    time: "13:00",
    reason: "",
  });

  const dates = ["2026-07-02", "2026-07-03", "2026-07-04", "2026-07-05", "2026-07-06", "2026-07-07", "2026-07-08"];
  const times = ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];
  const canContinue = Boolean([booking.clinic, booking.department, booking.doctor, booking.date && booking.time][Math.min(step, 3)]);
  const handleContinue = () => {
    if (step === 4) {
      setShowSuccess(true);
      return;
    }

    setStep(Math.min(4, step + 1));
  };

  return (
    <Page title="Book appointment" subtitle="Follow the steps to reserve your slot.">
      <div className="pp-booking">
        <div className="pp-steps">
          {steps.map((label, index) => (
            <button className={index === step ? "active" : index < step ? "done" : ""} key={label} onClick={() => index <= step && setStep(index)}>
              <span>{index < step ? <Check size={12} /> : index + 1}</span>{label}
            </button>
          ))}
        </div>
        <div className="pp-card pp-book-card">
          {step === 0 ? (
            <ChoiceGrid title="Clinic" items={["Aurora Health Clinic", "Meadow Family Practice"]} selected={booking.clinic} onSelect={(clinic) => setBooking({ ...booking, clinic })} />
          ) : null}
          {step === 1 ? (
            <ChoiceGrid title="Department" items={["General Medicine", "Cardiology", "Dermatology"]} selected={booking.department} onSelect={(department) => setBooking({ ...booking, department })} />
          ) : null}
          {step === 2 ? (
            <ChoiceGrid title="Doctor" items={["Dr. Arjun Rao"]} selected={booking.doctor} onSelect={(doctor) => setBooking({ ...booking, doctor })} />
          ) : null}
          {step === 3 ? (
            <div>
              <h2>Date & time</h2>
              <label className="pp-field-label">Select date</label>
              <div className="pp-date-row">
                {dates.map((date) => (
                  <button className={booking.date === date ? "selected" : ""} key={date} onClick={() => setBooking({ ...booking, date })}>
                    {new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </button>
                ))}
              </div>
              <label className="pp-field-label">Available slots</label>
              <div className="pp-slot-grid">
                {times.map((time) => (
                  <button className={booking.time === time ? "selected" : ""} key={time} onClick={() => setBooking({ ...booking, time })}>{time}</button>
                ))}
              </div>
            </div>
          ) : null}
          {step === 4 ? (
            <div>
              <h2>Confirm</h2>
              <Summary label="Clinic" value={booking.clinic} />
              <Summary label="Department" value={booking.department} />
              <Summary label="Doctor" value={booking.doctor} />
              <Summary label="Date & time" value={`${booking.date} - ${booking.time}`} />
              <label className="pp-field-label">Reason for visit</label>
              <textarea value={booking.reason} onChange={(event) => setBooking({ ...booking, reason: event.target.value })} placeholder="Briefly describe your symptoms or reason..." />
            </div>
          ) : null}
        </div>
        <div className="pp-book-actions">
          <button className="pp-back-btn" onClick={() => (step ? setStep(step - 1) : null)}>
            <ChevronLeft size={16} /> {step ? "Back" : "Cancel"}
          </button>
          <button className="pp-primary" disabled={!canContinue} onClick={handleContinue}>
            {step === 4 ? "Confirm booking" : "Continue"}
          </button>
        </div>
      </div>
      {showSuccess ? (
        <div className="pp-modal-backdrop">
          <div className="pp-success-modal" role="dialog" aria-modal="true" aria-labelledby="booking-success-title">
            <div className="pp-success-icon">
              <Check size={34} />
            </div>
            <h2 id="booking-success-title">Appointment booked successfully</h2>
            <p>
              Your appointment with {booking.doctor} is confirmed for {booking.date} at {booking.time}.
            </p>
            <button className="pp-primary" onClick={() => navigate("/patient/dashboard")}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </Page>
  );
}

function ChoiceGrid({ title, items, selected, onSelect }) {
  return (
    <div>
      <h2>{title}</h2>
      <div className="pp-choice-grid">
        {items.map((item) => (
          <button className={selected === item ? "selected" : ""} key={item} onClick={() => onSelect(item)}>
            <strong>{item}</strong>
            <span>{title === "Clinic" ? (item.includes("Aurora") ? "12 Marine Drive, Mumbai" : "88 Park Avenue, Pune") : title === "Doctor" ? "MBBS, DM Cardiology - 18 years experience" : "Specialist care"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="pp-summary-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MedicalHistory() {
  return (
    <Page title="Medical history" subtitle="Your record of visits and conditions.">
      <div className="pp-info-grid">
        <InfoCard title="Chronic conditions" items={patient.conditions} />
        <InfoCard title="Allergies" items={patient.allergies} />
        <InfoCard title="Current medications" items={patient.medications} />
      </div>
      <div className="pp-card pp-list-card">
        <h2>Previous visits</h2>
        {visits.map((visit) => (
          <div className="pp-history-row" key={visit.id}>
            <span>{formatLongDate(visit.date)}</span>
            <strong>{visit.doctor}</strong>
            <em>{visit.department}</em>
          </div>
        ))}
      </div>
    </Page>
  );
}

function PatientReports() {
  const reports = [
    {
      id: "r1",
      date: "2026-06-15",
      title: "Complete Blood Count",
      type: "Lab test",
      doctor: "Dr. Arjun Rao",
      status: "Available",
      summary: "All values are within the normal range.",
      tests: [
        { label: "Hemoglobin", value: "13.5 g/dL", normal: "12.0 - 15.5 g/dL" },
        { label: "WBC", value: "6.8 x10^9/L", normal: "4.0 - 11.0 x10^9/L" },
        { label: "Platelets", value: "250 x10^9/L", normal: "150 - 450 x10^9/L" },
      ],
    },
    {
      id: "r2",
      date: "2026-05-25",
      title: "Chest X-ray",
      type: "Imaging",
      doctor: "Dr. Vikram Shah",
      status: "Available",
      summary: "No active lung opacities. Heart size is normal.",
      tests: [
        { label: "Radiologist notes", value: "Clear lungs with no consolidation.", normal: "N/A" },
      ],
    },
    {
      id: "r3",
      date: "2026-04-10",
      title: "Liver Function Panel",
      type: "Lab test",
      doctor: "Dr. Arjun Rao",
      status: "Available",
      summary: "Liver enzymes are slightly elevated; follow up after 4 weeks.",
      tests: [
        { label: "ALT", value: "62 U/L", normal: "7 - 56 U/L" },
        { label: "AST", value: "55 U/L", normal: "10 - 40 U/L" },
        { label: "ALP", value: "98 U/L", normal: "44 - 147 U/L" },
      ],
    },
  ];

  const downloadReport = (report) => {
    const reportLines = [
      `Medical test result: ${report.title}`,
      `Date: ${formatLongDate(report.date)}`,
      `Doctor: ${report.doctor}`,
      `Type: ${report.type}`,
      `Status: ${report.status}`,
      "",
      `Summary: ${report.summary}`,
      "",
      "Test details:",
      ...report.tests.map((test) => `${test.label}: ${test.value} (Normal: ${test.normal})`),
    ];

    const blob = new Blob([reportLines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, "_")}-${report.date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Page title="Medical reports" subtitle="View your medical test results and download your lab reports.">
      <div className="pp-report-grid">
        {reports.map((report) => (
          <div key={report.id} className="pp-card pp-report-card">
            <div className="pp-report-header">
              <div>
                <strong>{report.title}</strong>
                <span>{formatLongDate(report.date)} · {report.doctor}</span>
                <small>{report.type}</small>
              </div>
              <span className={`pp-badge ${report.status === "Available" ? "available" : "downloaded"}`}>
                {report.status}
              </span>
            </div>
            <p className="pp-report-summary">{report.summary}</p>
            <table className="pp-table pp-report-table">
              <thead>
                <tr>
                  <th>Test item</th>
                  <th>Result</th>
                  <th>Normal range</th>
                </tr>
              </thead>
              <tbody>
                {report.tests.map((test) => (
                  <tr key={test.label}>
                    <td>{test.label}</td>
                    <td>{test.value}</td>
                    <td>{test.normal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pp-report-actions">
              <button className="pp-primary small" onClick={() => downloadReport(report)}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function InfoCard({ title, items }) {
  return (
    <div className="pp-card pp-info-card">
      <h2>{title}</h2>
      <div>{items.map((item) => <span className="pp-badge" key={item}>{item}</span>)}</div>
    </div>
  );
}

function Prescriptions() {
  const [active, setActive] = useState(null);

  return (
    <Page title="Prescriptions" subtitle="View, download or share your prescriptions.">
      <div className="pp-list-stack">
        {prescriptions.map((prescription) => (
          <div className="pp-card pp-prescription-row" key={prescription.id}>
            <div>
              <small>{formatLongDate(prescription.date)}</small>
              <strong>{prescription.title}</strong>
              <p>Prescribed by {prescription.doctor} - {prescription.medicines.length} medicine(s)</p>
            </div>
            <div>
              <button className="pp-secondary" onClick={() => setActive(prescription)}>View</button>
              <button className="pp-primary"><Download size={14} /> Download</button>
            </div>
          </div>
        ))}
      </div>
      {active ? <PrescriptionModal prescription={active} onClose={() => setActive(null)} /> : null}
    </Page>
  );
}

function PrescriptionModal({ prescription, onClose }) {
  return (
    <div className="pp-modal-backdrop">
      <div className="pp-modal">
        <button className="pp-close" onClick={onClose}><X size={16} /></button>
        <h2>Prescription - {formatLongDate(prescription.date)}</h2>
        <div className="pp-rx-head">
          <div><strong>{prescription.doctor}</strong><span>MBBS, DM {prescription.department} - 18 yrs</span></div>
          <div><span>Aurora Care</span><strong>{formatLongDate(prescription.date)}</strong></div>
        </div>
        <label className="pp-field-label">Diagnosis</label>
        <strong>{prescription.title}</strong>
        <table className="pp-table">
          <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr></thead>
          <tbody>{prescription.medicines.map((medicine) => <tr key={medicine.name}><td>{medicine.name}</td><td>{medicine.dosage}</td><td>{medicine.frequency}</td><td>{medicine.duration}</td></tr>)}</tbody>
        </table>
        <label className="pp-field-label">Doctor's notes</label>
        <p>{prescription.notes}</p>
        <div className="pp-modal-actions">
          <button className="pp-secondary">Print</button>
          <button className="pp-secondary">Share</button>
          <button className="pp-primary"><Download size={14} /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

function Notifications({ notifications, setNotifications }) {
  const markAll = () => setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  const markRead = (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, unread: false } : item));
  const remove = (id) => setNotifications((items) => items.filter((item) => item.id !== id));

  return (
    <Page title="Notifications" subtitle="Reminders and updates in one place." action={<button className="pp-secondary" onClick={markAll}><Check size={15} /> Mark all as read</button>}>
      <div className="pp-list-stack">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div className={`pp-card pp-notification-row ${item.unread ? "unread" : ""}`} key={item.id}>
              <Icon size={18} />
              <div>
                <strong>{item.title}</strong>
                <small>{item.time}{item.unread ? "  -" : ""}</small>
                <p>{item.message}</p>
                <button className="pp-secondary small">View</button>
                {item.unread ? <button className="pp-link-btn" onClick={() => markRead(item.id)}><Check size={14} /> Mark as read</button> : null}
                <button className="pp-danger" onClick={() => remove(item.id)}><Trash2 size={14} /> Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

function Profile() {
  return (
    <Page title="My Profile" subtitle="Keep your details accurate for faster, safer care." action={<button className="pp-primary"><Edit3 size={15} /> Edit details</button>}>
      <div className="pp-profile-grid">
        <div className="pp-card">
          <h2>Personal details</h2>
          <div className="pp-form-grid">
            <ReadOnly label="Full name" value={patient.name} />
            <ReadOnly label="Gender" value={patient.gender} />
            <ReadOnly label="Date of birth" value="06/14/1994" />
            <ReadOnly label="Blood group" value={patient.bloodGroup} />
          </div>
        </div>
        <div className="pp-card">
          <h2>At a glance</h2>
          <div className="pp-glance"><div className="pp-avatar big">AS</div><div><strong>{patient.name}</strong><span>{patient.email}</span></div></div>
          <span className="pp-badge">{patient.gender}</span><span className="pp-badge">Blood {patient.bloodGroup}</span>
        </div>
        <div className="pp-card">
          <h2>Contact</h2>
          <div className="pp-form-grid">
            <ReadOnly label="Mobile" value={patient.phone} />
            <ReadOnly label="Email" value={patient.email} />
            <ReadOnly label="Address" value={patient.address} wide />
          </div>
        </div>
        <div className="pp-card">
          <h2>Emergency contact</h2>
          <ReadOnly label="Name" value={patient.emergency.name} />
          <ReadOnly label="Relationship" value={patient.emergency.relation} />
          <ReadOnly label="Phone" value={patient.emergency.phone} />
        </div>
        <div className="pp-card pp-wide">
          <h2>Medical information</h2>
          <div className="pp-info-grid">
            <InfoCard title="Allergies" items={patient.allergies} />
            <InfoCard title="Chronic diseases" items={patient.conditions} />
            <InfoCard title="Current medications" items={patient.medications} />
          </div>
        </div>
      </div>
    </Page>
  );
}

function ReadOnly({ label, value, wide }) {
  return (
    <label className={wide ? "wide" : ""}>
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}

function Bills() {
  const [activeBill, setActiveBill] = useState(null);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState(() =>
    bills.reduce((modes, bill) => ({ ...modes, [bill.id]: bill.paymentMode || "UPI" }), {})
  );
  const pendingTotal = bills
    .filter((bill) => bill.status.toLowerCase() !== "paid")
    .reduce((sum, bill) => sum + getBillTotal(bill), 0);
  const paidTotal = bills
    .filter((bill) => bill.status.toLowerCase() === "paid")
    .reduce((sum, bill) => sum + getBillTotal(bill), 0);

  return (
    <Page title="Bills" subtitle="Track billing, lab charges, medicine charges, invoices and payments.">
      <div className="pp-bill-stats">
        <Stat label="Pending amount" value={formatIndianCurrency(pendingTotal, { minimumFractionDigits: 0 })} text="Needs payment" />
        <Stat label="Paid amount" value={formatIndianCurrency(paidTotal, { minimumFractionDigits: 0 })} text="Settled invoices" />
        <Stat label="Invoices" value={bills.length} text="Available to view" />
        <Stat label="Payment modes" value={paymentModes.length} text="UPI, cash, card and more" />
      </div>
      <div className="pp-list-stack pp-bills-list">
        {bills.map((bill) => {
          const total = getBillTotal(bill);
          const isPaid = bill.status.toLowerCase() === "paid";
          const selectedMode = selectedPaymentModes[bill.id] || bill.paymentMode || "UPI";
          const billWithPaymentMode = { ...bill, paymentMode: selectedMode };

          return (
            <div className="pp-card pp-bill-card" key={bill.id}>
              <div className="pp-bill-head">
                <div>
                  <small>{formatLongDate(bill.date)} - {bill.appointmentId}</small>
                  <strong>{bill.invoiceNo}</strong>
                  <p>{bill.department} with {bill.doctor}</p>
                </div>
                <div className="pp-bill-head-meta">
                  <span className={`pp-bill-status ${isPaid ? "paid" : "pending"}`}>{bill.status}</span>
                  <small>{isPaid ? "Paid by" : "Pay with"} {selectedMode}</small>
                </div>
              </div>
              <div className="pp-payment-mode-panel">
                <div>
                  <Wallet size={16} />
                  <span>Mode of payment</span>
                </div>
                <div className="pp-payment-options">
                  <label className="pp-payment-select-wrapper" htmlFor={`payment-mode-${bill.id}`}>
                    <span className="sr-only">Payment mode for {bill.invoiceNo}</span>
                    <select
                      id={`payment-mode-${bill.id}`}
                      className="pp-payment-select"
                      value={selectedMode}
                      disabled={isPaid}
                      onChange={(event) =>
                        setSelectedPaymentModes((current) => ({
                          ...current,
                          [bill.id]: event.target.value,
                        }))
                      }
                    >
                      {paymentModes.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              <div className="pp-bill-charges">
                {bill.charges.map((charge) => (
                  <div key={charge.label}>
                    <span>{charge.label}</span>
                    <b>{formatIndianCurrency(charge.amount)}</b>
                  </div>
                ))}
              </div>
              <div className="pp-bill-total">
                <span>Total invoice</span>
                <strong>{formatIndianCurrency(total)}</strong>
              </div>
              <div className="pp-bill-actions">
                <button className="pp-secondary" onClick={() => setActiveBill(billWithPaymentMode)}>
                  <FileText size={14} /> View invoice
                </button>
                <button className="pp-primary">
                  <Download size={14} /> Download
                </button>
                {!isPaid ? <button className="pp-primary"><CreditCard size={14} /> Pay by {selectedMode}</button> : null}
              </div>
            </div>
          );
        })}
      </div>
      {activeBill ? <BillInvoiceModal bill={activeBill} onClose={() => setActiveBill(null)} /> : null}
    </Page>
  );
}

function BillInvoiceModal({ bill, onClose }) {
  const total = getBillTotal(bill);

  return (
    <div className="pp-modal-backdrop">
      <div className="pp-modal pp-invoice-modal">
        <button className="pp-close" onClick={onClose}><X size={16} /></button>
        <div className="pp-invoice-title">
          <div>
            <h2>Bill invoice</h2>
            <span>{bill.invoiceNo}</span>
          </div>
          <span className={`pp-bill-status ${bill.status.toLowerCase() === "paid" ? "paid" : "pending"}`}>{bill.status}</span>
        </div>
        <div className="pp-invoice-grid">
          <Summary label="Patient" value={patient.name} />
          <Summary label="Doctor" value={bill.doctor} />
          <Summary label="Department" value={bill.department} />
          <Summary label="Appointment" value={bill.appointmentId} />
          <Summary label="Invoice date" value={formatLongDate(bill.date)} />
          <Summary label="Payment mode" value={bill.paymentMode} />
        </div>
        <table className="pp-table">
          <thead><tr><th>Particulars</th><th>Amount</th></tr></thead>
          <tbody>
            {bill.charges.map((charge) => (
              <tr key={charge.label}>
                <td>{charge.label}</td>
                <td>{formatIndianCurrency(charge.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pp-bill-total invoice">
          <span>Total payable</span>
          <strong>{formatIndianCurrency(total)}</strong>
        </div>
        <div className="pp-modal-actions">
          <button className="pp-secondary">Print</button>
          <button className="pp-primary"><Download size={14} /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

function PatientApp() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const notificationProps = useMemo(() => ({ notifications, setNotifications }), [notifications]);

  return (
    <Shell notifications={notifications}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard notifications={notifications} />} />
        <Route path="appointments" element={<Navigate to="book" replace />} />
        <Route path="appointments/book" element={<Booking />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="bills" element={<Bills />} />
        <Route path="notifications" element={<Notifications {...notificationProps} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Shell>
  );
}

export default PatientApp;
