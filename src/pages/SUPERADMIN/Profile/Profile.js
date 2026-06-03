import React, { useState } from "react";
import Header from "../../../components/superadmin/Header";

function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <Header
        title="Profile"
        subtitle="View profile, edit account details, and change password."
        action={
          <button className="sa-btn sa-btn-primary" onClick={() => setEditing((value) => !value)}>
            {editing ? "View Profile" : "Edit Profile"}
          </button>
        }
      />

      <div className="sa-panel">
        <div className="sa-profile-card">
          <div className="sa-profile-avatar">SA</div>
          <div>
            <h3>Super Admin</h3>
            <p>superadmin@medicore.in</p>
            <span className="sa-badge is-active">Active</span>
          </div>
        </div>
      </div>

      <div className="sa-form-card" style={{ marginTop: 16 }}>
        <h3>{editing ? "Edit Profile" : "Account Details"}</h3>
        <div className="sa-form-grid">
          <div className="sa-form-field">
            <label>Name</label>
            <input defaultValue="Super Admin" readOnly={!editing} />
          </div>
          <div className="sa-form-field">
            <label>Email</label>
            <input defaultValue="superadmin@medicore.in" readOnly={!editing} />
          </div>
          <div className="sa-form-field">
            <label>Role</label>
            <input defaultValue="Super Admin" readOnly />
          </div>
          <div className="sa-form-field">
            <label>Phone</label>
            <input defaultValue="+91 98765 40000" readOnly={!editing} />
          </div>
        </div>
      </div>

      <div className="sa-form-card" style={{ marginTop: 16 }}>
        <h3>Change Password</h3>
        <div className="sa-form-grid">
          <div className="sa-form-field">
            <label>Current Password</label>
            <input type="password" />
          </div>
          <div className="sa-form-field">
            <label>New Password</label>
            <input type="password" />
          </div>
        </div>
        <div className="sa-page-actions" style={{ marginTop: 14 }}>
          <button className="sa-btn sa-btn-primary">Update Password</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
