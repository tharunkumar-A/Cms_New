import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clinicBg from "../../assests/clinic-bg.jpg";
import "./PatientRegister.css";

function PatientRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    setSuccess(false);
  };

  const validate = () => {
    const nextErrors = {};
    const requiredFields = {
      firstName: "First name is required.",
      lastName: "Last name is required.",
      gender: "Please select gender.",
      dob: "Date of birth is required.",
      mobile: "Mobile number is required.",
      email: "Email is required.",
      address: "Address is required.",
      password: "Password is required.",
      confirmPassword: "Confirm password is required.",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!String(form[field] || "").trim()) {
        nextErrors[field] = message;
      }
    });

    if (form.firstName && !/^[a-zA-Z\s]+$/.test(form.firstName)) {
      nextErrors.firstName = "Only alphabets are allowed.";
    }

    if (form.lastName && !/^[a-zA-Z\s]+$/.test(form.lastName)) {
      nextErrors.lastName = "Only alphabets are allowed.";
    }

    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      nextErrors.mobile = "Enter a valid 10 digit mobile number.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.password && form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate("/patient/dashboard", { replace: true });
    }, 600);
  };

  return (
    <div className="register-page">
      <div
        className="register-bg"
        style={{ backgroundImage: `url(${clinicBg})` }}
        aria-hidden="true"
      />
      <div className="register-veil" aria-hidden="true" />

      <div className="register-card">
        <header className="register-header">
          <h1>Patient Registration</h1>
          <p>Enter your details to create a patient account and access your dashboard.</p>
        </header>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="register-section">
            <h2>Personal Information</h2>
            <div className="register-grid">
              <label>
                <span>First Name</span>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
                {errors.firstName ? <em className="register-field-error">{errors.firstName}</em> : null}
              </label>
              <label>
                <span>Last Name</span>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
                {errors.lastName ? <em className="register-field-error">{errors.lastName}</em> : null}
              </label>
              <label>
                <span>Select Gender</span>
                <select name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender ? <em className="register-field-error">{errors.gender}</em> : null}
              </label>
              <label>
                <span>Date of birth</span>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} />
                {errors.dob ? <em className="register-field-error">{errors.dob}</em> : null}
              </label>
            </div>
          </div>

          <div className="register-section">
            <h2>Contact Information</h2>
            <div className="register-grid">
              <label>
                <span>Mobile Number</span>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  inputMode="numeric"
                  maxLength={10}
                />
                {errors.mobile ? <em className="register-field-error">{errors.mobile}</em> : null}
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                {errors.email ? <em className="register-field-error">{errors.email}</em> : null}
              </label>
              <label className="wide">
                <span>Address</span>
                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" />
                {errors.address ? <em className="register-field-error">{errors.address}</em> : null}
              </label>
            </div>
          </div>

          <div className="register-section">
            <h2>Security</h2>
            <div className="register-grid">
              <label>
                <span>Password</span>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                {errors.password ? <em className="register-field-error">{errors.password}</em> : null}
              </label>
              <label>
                <span>Confirm Password</span>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                {errors.confirmPassword ? <em className="register-field-error">{errors.confirmPassword}</em> : null}
              </label>
            </div>
          </div>

          {success ? <div className="register-success">Registration completed successfully.</div> : null}

          <div className="register-actions">
            <button type="submit" className="register-submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientRegister;
