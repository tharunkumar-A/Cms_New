import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatToday, parseList, requestJson } from "../receptionApi";

const slots = [
  "09:00 - 09:30",
  "09:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 13:00",
  "14:00 - 14:30",
  "14:30 - 15:00",
  "15:00 - 15:30",
  "15:30 - 16:00",
  "16:00 - 16:30",
  "16:30 - 17:00",
];

function ReceptionAppointments() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: formatToday(),
    chiefComplaints: "",
    bloodPressure: "",
    sugarLevel: "",
    temperature: "",
    weight: "",
    pulseRate: "",
    respiratoryRate: "",
  });

  const refresh = () => {
    Promise.all([
      requestJson("Patient").catch(() => []),
      requestJson("Doctor").catch(() => []),
      requestJson("Appointment").catch(() => []),
    ]).then(([patientData, doctorData, appointmentData]) => {
      const nextPatients = parseList(patientData);
      const nextDoctors = parseList(doctorData);
      setPatients(nextPatients);
      setDoctors(nextDoctors);
      setAppointments(parseList(appointmentData));
      setForm((prev) => ({
        ...prev,
        patientId: prev.patientId || String(nextPatients[0]?.id || ""),
        doctorId: prev.doctorId || String(nextDoctors[0]?.id || ""),
      }));
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const bookedSlots = useMemo(() => {
    return new Set(
      appointments
        .filter((item) => String(item.date || item.appointmentDate || "").startsWith(form.date))
        .filter(
          (item) => String(item.doctorId || item.doctor?.id || "") === String(form.doctorId)
        )
        .map((item) => item.time || item.slot)
    );
  }, [appointments, form.date, form.doctorId]);

  const submit = async (event) => {
    event.preventDefault();
    if (!form.patientId || !form.doctorId || !selectedSlot) {
      setMessage("Please select patient, doctor, date, and time slot.");
      return;
    }

    const selectedPatient = patients.find((item) => String(item.id) === String(form.patientId));
    const selectedDoctor = doctors.find((item) => String(item.id) === String(form.doctorId));
    const body = {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      patientName: selectedPatient?.name,
      doctorName: selectedDoctor?.name,
      date: form.date,
      appointmentDate: form.date,
      time: selectedSlot,
      status: "Scheduled",
      chiefComplaints: form.chiefComplaints,
      bloodPressure: form.bloodPressure,
      sugarLevel: form.sugarLevel,
      temperature: form.temperature,
      weight: form.weight,
      pulseRate: form.pulseRate,
      respiratoryRate: form.respiratoryRate,
    };

    try {
      await requestJson("Appointment", { method: "POST", body: JSON.stringify(body) });
      setMessage("Appointment booked successfully.");
      setSelectedSlot("");
      refresh();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <section className="rc-page">
      <div className="rc-page-head">
        <div>
          <h2>Appointment Booking</h2>
          <p>Select patient, doctor, date, lock a slot, and confirm booking.</p>
        </div>
        <div className="rc-head-actions">
          <button className="rc-btn" onClick={() => navigate("/reception/dashboard")}>
            <ArrowLeft size={16} /> Dashboard
          </button>
        </div>
      </div>

      {message ? <div className="rc-alert">{message}</div> : null}

      <form className="rc-card rc-booking-form" onSubmit={submit}>
        <div className="rc-booking-fields">
          <h3>Book Appointment</h3>
          <label>
            <span>Patient</span>
            <select value={form.patientId} onChange={(e) => setField("patientId", e.target.value)}>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Doctor</span>
            <select value={form.doctorId} onChange={(e) => setField("doctorId", e.target.value)}>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Date</span>
            <input type="date" value={form.date} onChange={(e) => setField("date", e.target.value)} />
          </label>
          {[
            "chiefComplaints",
            "bloodPressure",
            "sugarLevel",
            "temperature",
            "weight",
            "pulseRate",
            "respiratoryRate",
          ].map((field) => (
            <label key={field}>
              <span>{field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
              <input value={form[field]} onChange={(e) => setField(field, e.target.value)} />
            </label>
          ))}
        </div>

        <div className="rc-slot-panel">
          <div className="rc-slot-head">
            <strong>Time Slots</strong>
            <span>Available&nbsp;&nbsp; Booked</span>
          </div>
          <div className="rc-slots">
            {slots.map((slot) => {
              const booked = bookedSlots.has(slot);
              return (
                <button
                  type="button"
                  key={slot}
                  disabled={booked}
                  className={`${selectedSlot === slot ? "selected" : ""}${booked ? " booked" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot} - {booked ? "BOOKED" : "AVAILABLE"}
                </button>
              );
            })}
          </div>
          <button type="submit" className="rc-confirm">
            <CheckCircle size={16} /> Confirm Booking
          </button>
        </div>
      </form>
    </section>
  );
}

export default ReceptionAppointments;
