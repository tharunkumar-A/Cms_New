import React, { useEffect, useRef, useState } from "react";
import { Bell, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, markNotificationRead } from "../pages/SUPERADMIN/superAdminApi";
import "./NotificationPopup.css";

const getCurrentRole = () =>
  localStorage.getItem("superAdminRole") ||
  localStorage.getItem("adminRole") ||
  localStorage.getItem("doctorRole") ||
  localStorage.getItem("receptionistRole") ||
  localStorage.getItem("userRole") ||
  "";

const normalizeRole = (role = "") =>
  String(role).trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

const isSentNotification = (notification = {}) =>
  String(notification.status || "").toLowerCase() === "sent";

const matchesTargetUsers = (notification = {}, role = "") => {
  const target = String(notification.targetUsers || "all clinics").trim().toLowerCase();
  const r = normalizeRole(role);

  if (!target || target.includes("all")) return true; // everyone

  if (target.includes("admin")) {
    return ["admin", "superadmin", "clinicadmin"].includes(r);
  }

  if (target.includes("active")) {
    // active users means any logged-in user role (doctors, receptionists, admins, end users)
    return ["admin", "superadmin", "doctor", "receptionist", "user", "clinicadmin"].includes(r);
  }

  // fallback: show to everyone
  return true;
};

function NotificationPopup({ isSuperAdmin = false }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeNotification, setActiveNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();
  const role = normalizeRole(getCurrentRole());

  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const items = await fetchNotifications();
      const filtered = items.filter(
        (item) => isSentNotification(item) && matchesTargetUsers(item, role)
      );
      setNotifications(filtered);
    } catch (requestError) {
      setError(requestError.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = window.setInterval(() => {
      loadNotifications();
    }, 30000);

    const onFocus = () => loadNotifications();
    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleNotifications = notifications;
  const notificationCount = visibleNotifications.length;

  const handleToggle = () => {
    setOpen((current) => !current);
  };

  const handleViewAll = () => {
    setOpen(false);
    if (isSuperAdmin) {
      navigate("/superadmin/notifications");
    }
  };

  return (
    <div className="notification-popup" ref={ref}>
      <button
        type="button"
        className="notification-trigger"
        onClick={handleToggle}
        aria-label="Open notifications"
      >
        <Bell size={18} />
        {notificationCount > 0 ? (
          <span className="notification-badge">
            {notificationCount > 99 ? "99+" : notificationCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <span>Notifications</span>
            {isSuperAdmin ? (
              <button
                type="button"
                className="notification-view-all"
                onClick={handleViewAll}
              >
                View All
                <ExternalLink size={14} />
              </button>
            ) : null}
          </div>

          {loading ? (
            <div className="notification-empty">Loading notifications...</div>
          ) : error ? (
            <div className="notification-empty notification-error">{error}</div>
          ) : visibleNotifications.length === 0 ? (
            <div className="notification-empty">No notifications available.</div>
          ) : (
            <div className="notification-items">
              <div className="notification-list">
                {visibleNotifications.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`notification-item-button ${activeNotification?.id === item.id ? "is-active" : ""}`}
                    onClick={async () => {
                      setActiveNotification(item);
                      try {
                        await markNotificationRead(item.id);
                      } catch {}
                      setNotifications((current) => current.filter((n) => n.id !== item.id));
                    }}
                  >
                    <div>
                      <b>{item.title}</b>
                      <p>{item.message}</p>
                    </div>
                    <span className={`notification-status ${item.status === "Sent" ? "is-active" : "is-muted"}`}>
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>

              <div className="notification-detail">
                {activeNotification ? (
                  <>
                    <div className="notification-detail-header">
                      <div>
                        <h4>{activeNotification.title}</h4>
                        <span>{activeNotification.targetUsers}</span>
                      </div>
                      <button
                        type="button"
                        className="notification-close"
                        onClick={() => setActiveNotification(null)}
                      >
                        Close
                      </button>
                    </div>
                    <p>{activeNotification.message}</p>
                  </>
                ) : (
                  <div className="notification-detail-empty">
                    Select a message to view its full content.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NotificationPopup;
