import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parseList, requestJson } from "../receptionApi";

function ReceptionBilling() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [form, setForm] = useState({
    appointmentId: "",
    paymentMode: "UPI",
    consultationCharge: 600,
    medicineCharges: 0,
    labCharges: 0,
  });

  useEffect(() => {
    requestJson("Appointment")
      .then((data) => {
        const list = parseList(data);
        setAppointments(list);
        setForm((prev) => ({
          ...prev,
          appointmentId: String(list[0]?.id || list[0]?.appointmentId || ""),
        }));
      })
      .catch((error) => setMessage(error.message));
  }, []);

  const selectedAppointment = useMemo(() => {
    return appointments.find(
      (item) => String(item.id || item.appointmentId) === String(form.appointmentId)
    );
  }, [appointments, form.appointmentId]);

  const total =
    Number(form.consultationCharge || 0) +
    Number(form.medicineCharges || 0) +
    Number(form.labCharges || 0);

  const generate = async (event) => {
    event.preventDefault();
    const body = {
      appointmentId: Number(form.appointmentId),
      paymentMode: form.paymentMode,
      consultationCharge: Number(form.consultationCharge || 0),
      medicineCharges: Number(form.medicineCharges || 0),
      labCharges: Number(form.labCharges || 0),
      total,
    };

    try {
      const data = await requestJson("Billing", {
        method: "POST",
        body: JSON.stringify(body),
      });
      setInvoice(data || body);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
      setInvoice({
        ...body,
        patientName: selectedAppointment?.patientName || selectedAppointment?.patient?.name || "charitha",
        status: "Pending",
      });
    }
  };

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  return (
    <section className="rc-page">
      <div className="rc-page-head">
        <div>
          <h2>Billing</h2>
          <p>Fetch appointment, add charges, confirm payment, and generate invoice.</p>
        </div>
        <button className="rc-btn" onClick={() => navigate("/reception/dashboard")}>
          <ArrowLeft size={16} /> Dashboard
        </button>
      </div>

      {message ? <div className="rc-alert error">{message}</div> : null}

      <form className="rc-card rc-billing-form" onSubmit={generate}>
        <h3>Generate Bill</h3>
        <div className="rc-patient-summary">
          <strong>
            {selectedAppointment?.patientName || selectedAppointment?.patient?.name || "charitha"}
          </strong>
          <span>
            {selectedAppointment?.patientId || selectedAppointment?.patient?.id || "2"} |{" "}
            {selectedAppointment?.doctorName ||
              selectedAppointment?.doctor?.name ||
              "Arepally Bharadwaj"}
          </span>
        </div>
        <label>
          <span>Appointment</span>
          <select value={form.appointmentId} onChange={(e) => setField("appointmentId", e.target.value)}>
            {appointments.map((a) => (
              <option value={a.id || a.appointmentId} key={a.id || a.appointmentId}>
                {a.patientName || a.patient?.name || "Patient"} - {a.time || "09:00"} -{" "}
                {a.status || "Consulted"}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Payment Mode</span>
          <select value={form.paymentMode} onChange={(e) => setField("paymentMode", e.target.value)}>
            <option>UPI</option>
            <option>Cash</option>
            <option>Card</option>
            <option>Insurance</option>
          </select>
        </label>
        <label>
          <span>Consultation Charge</span>
          <input
            type="number"
            value={form.consultationCharge}
            onChange={(e) => setField("consultationCharge", e.target.value)}
          />
        </label>
        <label>
          <span>Medicine Charges</span>
          <input
            type="number"
            value={form.medicineCharges}
            onChange={(e) => setField("medicineCharges", e.target.value)}
          />
        </label>
        <label>
          <span>Lab Charges</span>
          <input type="number" value={form.labCharges} onChange={(e) => setField("labCharges", e.target.value)} />
        </label>
        <div className="rc-total">
          <span>Total</span>
          <strong>₹ {total}</strong>
        </div>
        <button className="rc-confirm" type="submit">
          <FileText size={15} /> Confirm Payment and Generate Invoice
        </button>
      </form>

      <div className="rc-card rc-invoice">
        <h3>Latest Invoice</h3>
        <div className="rc-invoice-box">
          <div>
            <strong>{invoice?.patientName || selectedAppointment?.patientName || "charitha"}</strong>
            <span>{invoice ? "Pending invoice" : "No invoice generated yet"}</span>
          </div>
          <FileText size={18} />
          <p>
            Status <b>{invoice?.status || "Pending"}</b>
          </p>
          <p>
            Total <b>Rs {invoice?.total || total}</b>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReceptionBilling;

