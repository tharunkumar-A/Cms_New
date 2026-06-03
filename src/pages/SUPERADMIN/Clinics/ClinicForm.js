import React, { useMemo, useState } from "react";
import { Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/superadmin/Header";
import { clinics } from "../mockData";

const emptyClinic = {
  name: "",
  address: "",
  contactNumber: "",
  email: "",
  status: "Active",
};

function ClinicForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingClinic = useMemo(() => clinics.find((clinic) => clinic.id === id), [id]);
  const [form, setForm] = useState(existingClinic || emptyClinic);
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      navigate("/superadmin/clinics");
    }, 350);
  };

  return (
    <>
      <Header
        title={mode === "edit" ? "Edit Clinic" : "Add Clinic"}
        subtitle="Manage clinic profile and availability status."
      />

      <form className="sa-form-card" onSubmit={handleSubmit}>
        <div className="sa-form-grid">
          <div className="sa-form-field">
            <label>Clinic Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="sa-form-field">
            <label>Contact Number</label>
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
          </div>
          <div className="sa-form-field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="sa-form-field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="sa-form-field sa-form-field-full">
            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} required />
          </div>
        </div>

        <div className="sa-page-actions" style={{ marginTop: 16 }}>
          <button type="button" className="sa-btn" onClick={() => navigate("/superadmin/clinics")}>
            Cancel
          </button>
          <button type="submit" className="sa-btn sa-btn-primary" disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save Clinic"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ClinicForm;

