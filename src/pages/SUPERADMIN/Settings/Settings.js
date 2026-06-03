import React, { useState } from "react";
import Header from "../../../components/superadmin/Header";

const tabs = ["General Settings", "Email Settings", "SMS Settings", "Payment Settings"];

function Settings() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <Header title="System Settings" subtitle="Configure global platform preferences." />

      <div className="sa-panel">
        <div className="sa-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`sa-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="sa-form-grid">
          <div className="sa-form-field">
            <label>{activeTab.replace(" Settings", "")} Name</label>
            <input defaultValue={activeTab === "General Settings" ? "MediCore Platform" : ""} />
          </div>
          <div className="sa-form-field">
            <label>Status</label>
            <select defaultValue="Enabled">
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>
          <div className="sa-form-field sa-form-field-full">
            <label>Configuration Notes</label>
            <textarea defaultValue={`Update ${activeTab.toLowerCase()} used across all clinics.`} />
          </div>
        </div>

        <div className="sa-page-actions" style={{ marginTop: 14 }}>
          <button className="sa-btn sa-btn-primary">Save Settings</button>
        </div>
      </div>
    </>
  );
}

export default Settings;

