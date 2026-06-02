import React, { useState } from "react";
import { Bell, Calendar, ChevronDown, Menu, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DoctorTopbar.css";

const getInitials = (name) =>
  String(name || "D")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "D";

const clearSession = () => {
  [
    "token",
    "adminToken",
    "doctorToken",
    "adminEmail",
    "doctorEmail",
    "adminRole",
    "doctorRole",
    "userRole",
    "doctorId",
    "doctorName",
    "hospitalId",
    "hospitalName",
  ].forEach((key) => localStorage.removeItem(key));
};

function DoctorTopbar({ title, onMenuToggle }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const doctorName = localStorage.getItem("doctorName") || "Doctor";
  const doctorEmail = localStorage.getItem("doctorEmail") || "";

  const handleLogout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="dr-topbar">
      <div className="dr-topbar-left">
        <button
          className="dr-topbar-icon-btn"
          type="button"
          onClick={onMenuToggle}
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="dr-topbar-title">{title}</h1>
      </div>

      <div className="dr-topbar-search">
        <Search size={15} className="dr-search-icon" />
        <input
          className="dr-search-input"
          placeholder="Search patient by name, ID or phone..."
          readOnly
        />
        <kbd className="dr-search-kbd">Ctrl + K</kbd>
      </div>

      <div className="dr-topbar-right">
        <button className="dr-topbar-icon-btn dr-notif-btn" type="button" title="Notifications">
          <Bell size={18} />
          <span className="dr-notif-badge">1</span>
        </button>

        <button className="dr-topbar-icon-btn" type="button" title="Calendar">
          <Calendar size={18} />
        </button>

        <div className="dr-profile-wrap">
          <button
            className="dr-topbar-profile"
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
          >
            <div className="dr-profile-avatar">{getInitials(doctorName)}</div>
            <span className="dr-profile-name">Dr. {doctorName}</span>
            <ChevronDown size={14} className="dr-profile-chevron" />
          </button>

          {profileOpen ? (
            <div className="dr-profile-menu">
              <div className="dr-profile-menu-head">
                <p>Dr. {doctorName}</p>
                <span>{doctorEmail || "doctor account"}</span>
              </div>
              <button type="button" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default DoctorTopbar;
