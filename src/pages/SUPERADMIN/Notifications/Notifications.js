import React, { useState } from "react";
import { Send } from "lucide-react";
import Header from "../../../components/superadmin/Header";
import NotificationPanel from "../../../components/superadmin/NotificationPanel";
import { notifications } from "../mockData";

function Notifications() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header
        title="Notifications"
        subtitle="Create and send platform notifications."
        action={
          <button className="sa-btn sa-btn-primary" onClick={() => setShowForm((value) => !value)}>
            <Send size={16} />
            Send Notification
          </button>
        }
      />

      {showForm ? (
        <div className="sa-form-card" style={{ marginBottom: 16 }}>
          <div className="sa-form-grid">
            <div className="sa-form-field">
              <label>Title</label>
              <input placeholder="Notification title" />
            </div>
            <div className="sa-form-field">
              <label>Target Users</label>
              <select>
                <option>All Clinics</option>
                <option>Clinic Admins</option>
                <option>Active Users</option>
              </select>
            </div>
            <div className="sa-form-field">
              <label>Status</label>
              <select>
                <option>Draft</option>
                <option>Sent</option>
              </select>
            </div>
            <div className="sa-form-field sa-form-field-full">
              <label>Message</label>
              <textarea placeholder="Write the notification message" />
            </div>
          </div>
          <div className="sa-page-actions" style={{ marginTop: 14 }}>
            <button className="sa-btn">Save Draft</button>
            <button className="sa-btn sa-btn-primary">Send Now</button>
          </div>
        </div>
      ) : null}

      <div className="sa-panel">
        <h3>Notification List</h3>
        <p>Recent messages and delivery status.</p>
        <NotificationPanel items={notifications} />
      </div>
    </>
  );
}

export default Notifications;

