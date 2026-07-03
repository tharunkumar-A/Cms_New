import React, { useState, useEffect } from "react";
import "./PatientDashboard.css";
import {
  Calendar,
  FileText,
  DollarSign,
  Clock,
  Bell,
  ChevronRight,
  MapPin,
  Phone,
  MessageSquare,
  Pill,
} from "lucide-react";

function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    // Simulate API call - Replace with actual API endpoint
    const mockData = {
      patient: {
        name: "Ananya",
        id: "P12345",
        email: "ananya@example.com",
        phone: "+91-9876543210",
      },
      upcomingAppointment: {
        id: "APT001",
        date: "Sat, 4 Jul, 2026",
        time: "10:30 to 11:30 am",
        doctorName: "Dr. Priya Menon",
        specialization: "General Medicine",
        clinic: "Aurora Health Clinic",
        status: "Confirmed",
        avatar: "👩‍⚕️",
      },
      stats: {
        previousVisits: 2,
        prescriptions: 2,
        billsPending: 0,
      },
      notifications: [
        {
          id: 1,
          type: "appointment_confirmed",
          title: "Appointment confirmed",
          message: "Your appointment APT-2026-9493 is confirmed for 2026-07-08 at 12:15",
          date: "2 mins ago",
          read: false,
        },
        {
          id: 2,
          type: "appointment_confirmed",
          title: "Appointment confirmed",
          message: "Your appointment APT-2026-9329 is confirmed for 2026-07-07 at 12:15",
          date: "1 hour ago",
          read: false,
        },
        {
          id: 3,
          type: "appointment_upcoming",
          title: "Upcoming appointment with Dr. Priya...",
          message: "Scheduled on 2026-07-04 at 10:30 AM at Aurora Health Clinic",
          date: "5 hours ago",
          read: false,
        },
        {
          id: 4,
          type: "bill",
          title: "New bill INV-2026-0312",
          message: "A new bill is available for your recent consultation",
          date: "1 day ago",
          read: true,
        },
      ],
    };

    // Simulate loading delay
    setTimeout(() => {
      setPatientData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const handleBookAppointment = () => {
    // Navigate to appointment booking
    console.log("Navigate to book appointment");
  };

  const handleViewDetails = () => {
    console.log("View appointment details");
  };

  const handleReschedule = () => {
    console.log("Reschedule appointment");
  };

  const handleViewAllNotifications = () => {
    console.log("View all notifications");
  };

  if (loading) {
    return <div className="patient-dashboard-loading">Loading dashboard...</div>;
  }

  if (!patientData) {
    return <div className="patient-dashboard-error">Failed to load dashboard</div>;
  }

  const { patient, upcomingAppointment, stats, notifications } = patientData;

  return (
    <div className="patient-dashboard">
      {/* Header Section */}
      <div className="pd-header">
        <div className="pd-greeting">
          <h1 className="pd-greeting-title">Good day, {patient.name}</h1>
          <p className="pd-greeting-subtitle">Here's what's happening with your care.</p>
        </div>
        <button className="pd-book-btn" onClick={handleBookAppointment}>
          <Calendar size={18} />
          Book appointment
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="pd-stats-container">
        {/* Upcoming Appointment Card */}
        <div className="pd-stat-card pd-stat-appointment">
          <div className="pd-stat-header">
            <Clock size={20} className="pd-stat-icon" />
            <span className="pd-stat-label">UPCOMING APPOINTMENT</span>
          </div>
          <div className="pd-stat-content">
            <p className="pd-appointment-date">{upcomingAppointment.date}</p>
            <p className="pd-appointment-time">{upcomingAppointment.time}</p>
          </div>
        </div>

        {/* Previous Visits Card */}
        <div className="pd-stat-card pd-stat-visits">
          <div className="pd-stat-header">
            <FileText size={20} className="pd-stat-icon" />
            <span className="pd-stat-label">PREVIOUS VISITS</span>
          </div>
          <div className="pd-stat-content">
            <p className="pd-stat-number">{stats.previousVisits}</p>
            <p className="pd-stat-description">Completed consultations</p>
          </div>
        </div>

        {/* Prescriptions Card */}
        <div className="pd-stat-card pd-stat-prescriptions">
          <div className="pd-stat-header">
            <Pill size={20} className="pd-stat-icon" />
            <span className="pd-stat-label">PRESCRIPTIONS</span>
          </div>
          <div className="pd-stat-content">
            <p className="pd-stat-number">{stats.prescriptions}</p>
            <p className="pd-stat-description">Available to download</p>
          </div>
        </div>

        {/* Bills Pending Card */}
        <div className="pd-stat-card pd-stat-bills">
          <div className="pd-stat-header">
            <DollarSign size={20} className="pd-stat-icon" />
            <span className="pd-stat-label">BILLS PENDING</span>
          </div>
          <div className="pd-stat-content">
            <p className="pd-stat-number">₹{stats.billsPending}</p>
            <p className="pd-stat-description">All settled</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="pd-main-content">
        {/* Upcoming Appointment Details */}
        <div className="pd-appointment-section">
          <div className="pd-section-header">
            <h2>Upcoming appointment</h2>
            <a href="#" className="pd-view-all">
              View all
            </a>
          </div>

          <div className="pd-appointment-card">
            <div className="pd-doctor-info">
              <div className="pd-doctor-avatar">{upcomingAppointment.avatar}</div>
              <div className="pd-doctor-details">
                <h3 className="pd-doctor-name">{upcomingAppointment.doctorName}</h3>
                <p className="pd-doctor-specialty">{upcomingAppointment.specialization}</p>
                <p className="pd-doctor-clinic">{upcomingAppointment.clinic}</p>
              </div>
              <div className="pd-appointment-status">
                <span className="pd-status-badge">{upcomingAppointment.status}</span>
              </div>
            </div>

            <div className="pd-appointment-datetime">
              <Calendar size={18} />
              <span>{upcomingAppointment.date} at {upcomingAppointment.time.split(" to ")[0]}</span>
            </div>

            <div className="pd-appointment-actions">
              <button className="pd-action-btn pd-action-details" onClick={handleViewDetails}>
                View details
              </button>
              <button className="pd-action-btn pd-action-reschedule" onClick={handleReschedule}>
                Reschedule
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="pd-notifications-section">
          <div className="pd-section-header">
            <h2>
              <Bell size={20} />
              Notifications
            </h2>
          </div>

          <div className="pd-notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`pd-notification-item ${notification.read ? "read" : "unread"}`}
                onClick={() => setSelectedNotification(notification.id)}
              >
                <div className="pd-notification-indicator"></div>
                <div className="pd-notification-content">
                  <p className="pd-notification-title">{notification.title}</p>
                  <p className="pd-notification-message">{notification.message}</p>
                  <span className="pd-notification-time">{notification.date}</span>
                </div>
                <ChevronRight size={16} className="pd-notification-icon" />
              </div>
            ))}
          </div>

          <button className="pd-view-all-notifications" onClick={handleViewAllNotifications}>
            Open notifications
          </button>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="pd-action-buttons">
        <button className="pd-action-card" onClick={handleBookAppointment}>
          <Calendar size={24} />
          <span>Book appointment</span>
        </button>
        <button className="pd-action-card">
          <FileText size={24} />
          <span>View reports</span>
        </button>
        <button className="pd-action-card">
          <Pill size={24} />
          <span>View prescriptions</span>
        </button>
        <button className="pd-action-card">
          <DollarSign size={24} />
          <span>Payments</span>
        </button>
      </div>
    </div>
  );
}

export default PatientDashboard;
