// import React, { useEffect, useState } from "react";

// import "./RevenueReport.css";

// import { ArrowLeft, Download } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// import { useNavigate } from "react-router-dom";

// // ================= APIs =================

// const REPORT_API =
//   "/api/Report/revenue";

// const DOCTOR_API =
//   "/api/Doctor";

// // ================= COMPONENT =================

// function RevenueReport() {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);

//   const [doctors, setDoctors] = useState([]);

//   const [loading, setLoading] = useState(false);

//   const [fromDate, setFromDate] = useState("");

//   const [toDate, setToDate] = useState("");

//   const [doctorId, setDoctorId] = useState(0);

//   // ================= LOAD =================

//   useEffect(() => {
//     fetchDoctors();

//     fetchRevenue();
//   }, []);

//   // ================= DOCTORS =================

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetch(DOCTOR_API, {
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//         },
//       });

//       const result = await response.json();

//       setDoctors(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ================= REVENUE =================

//   const fetchRevenue = async () => {
//     try {
//       setLoading(true);

//       let url = `${REPORT_API}?doctorId=${doctorId}`;

//       if (fromDate) {
//         url += `&fromDate=${fromDate}`;
//       }

//       if (toDate) {
//         url += `&toDate=${toDate}`;
//       }

//       const response = await fetch(url, {
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//         },
//       });

//       const result = await response.json();

//       console.log("REVENUE:", result);

//       setData(result);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= CSV =================

//   const exportCSV = () => {
//     const rows = [
//       ["Month", "Revenue", "Growth"],

//       ...data.map((x) => [x.month, x.revenue, x.growth]),
//     ];

//     const csvContent = rows.map((e) => e.join(",")).join("\n");

//     const blob = new Blob([csvContent], {
//       type: "text/csv",
//     });

//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");

//     a.href = url;

//     a.download = "revenue-report.csv";

//     a.click();
//   };

//   return (
//     <div className="report-page">
//       {/* HEADER */}

//       <div className="report-header">
//         <div>
//           <button className="back" onClick={() => navigate("/reports")}>
//             <ArrowLeft size={16} />
//             All reports
//           </button>

//           <h2>Revenue Report</h2>

//           <p>Earnings, refunds, net revenue</p>
//         </div>

//         <button className="export" onClick={exportCSV}>
//           <Download size={16} />
//           Export CSV
//         </button>
//       </div>

//       {/* FILTER */}

//       <div className="filter-card">
//         {/* FROM */}

//         <div>
//           <label>From</label>

//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>

//         {/* TO */}

//         <div>
//           <label>To</label>

//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>

//         {/* DOCTOR */}

//         <div>
//           <label>Doctor</label>

//           <select
//             value={doctorId}
//             onChange={(e) => setDoctorId(Number(e.target.value))}
//           >
//             <option value={0}>All doctors</option>

//             {doctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>
//                 Dr. {doctor.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* APPLY */}

//         <button className="apply" onClick={fetchRevenue}>
//           Apply
//         </button>
//       </div>

//       {/* CHART */}

//       <div className="chart-card">
//         <h3>Revenue Visualization</h3>

//         {loading ? (
//           <div className="empty">Loading...</div>
//         ) : data.length === 0 ? (
//           <div className="empty">No revenue data found</div>
//         ) : (
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="month" />

//               <YAxis />

//               <Tooltip
//                 contentStyle={{
//                   borderRadius: "10px",
//                   border: "1px solid #e5e7eb",
//                 }}
//                 formatter={(value) => [`₹${value}`, "Revenue"]}
//               />

//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#159a8c"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </div>

//       {/* TABLE */}

//       <div className="table-card">
//         <div className="thead">
//           <span>Month</span>

//           <span>Revenue</span>

//           <span>Growth</span>
//         </div>

//         {data.map((d, i) => (
//           <div className="row" key={i}>
//             <span>{d.month}</span>

//             <span>₹{d.revenue?.toLocaleString()}</span>

//             <span className="growth">{d.growth}%</span>
//           </div>
//         ))}

//         {!loading && data.length === 0 && (
//           <div className="empty-table">No revenue data found.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RevenueReport;

import React, { useEffect, useState } from "react";

import "./RevenueReport.css";

import { ArrowLeft, Download } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/api";

// ================= API =================

const REPORT_API =
  apiUrl("Report/revenue");

const DOCTOR_API =
  apiUrl("Doctor");

// ================= COMPONENT =================

function RevenueReport() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [doctorId, setDoctorId] = useState(0);

  // ================= LOAD =================

  useEffect(() => {
    fetchDoctors();

    fetchRevenue();
  }, []);

  // ================= FETCH DOCTORS =================

  const fetchDoctors = async () => {
    try {
      const response = await fetch(DOCTOR_API, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      const result = await response.json();

      setDoctors(result);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH REVENUE =================

  const fetchRevenue = async () => {
    try {
      setLoading(true);

      let url = `${REPORT_API}?doctorId=${doctorId}`;

      if (fromDate) {
        url += `&fromDate=${fromDate}`;
      }

      if (toDate) {
        url += `&toDate=${toDate}`;
      }

      const response = await fetch(url, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      const result = await response.json();

      console.log("REVENUE:", result);

      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= EXPORT CSV =================

  const exportCSV = () => {
    const rows = [
      ["Month", "Revenue", "Growth"],

      ...data.map((x) => [x.month, x.revenue, x.growth]),
    ];

    const csvContent = rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "revenue-report.csv";

    a.click();
  };

  return (
    <div className="report-page">
      {/* HEADER */}

      <div className="report-header">
        <div>
          <button className="back" onClick={() => navigate("/reports")}>
            <ArrowLeft size={16} />
            All reports
          </button>

          <h2>Revenue Report</h2>

          <p>Earnings and total revenue</p>
        </div>

        <button className="export" onClick={exportCSV}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* FILTER */}

      <div className="filter-card">
        {/* FROM */}

        <div>
          <label>From</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* TO */}

        <div>
          <label>To</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* DOCTOR */}

        <div>
          <label>Doctor</label>

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(Number(e.target.value))}
          >
            <option value={0}>All doctors</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* APPLY */}

        <button className="apply" onClick={fetchRevenue}>
          Apply
        </button>
      </div>

      {/* CHART */}

      <div className="chart-card">
        <h3>Revenue Visualization</h3>

        {loading ? (
          <div className="empty">Loading...</div>
        ) : data.length === 0 ? (
          <div className="empty">No revenue data found</div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value) => [`₹${value}`, "Revenue"]}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#159a8c"
                strokeWidth={4}
                dot={{
                  r: 7,
                  fill: "#159a8c",
                }}
                activeDot={{
                  r: 9,
                }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* TABLE */}

      <div className="table-card">
        <div className="thead">
          <span>Month</span>

          <span>Revenue</span>

          <span>Growth</span>
        </div>

        {data.map((d, i) => (
          <div className="row" key={i}>
            <span>{d.month}</span>

            <span>₹{d.revenue?.toLocaleString()}</span>

            <span className="growth">{d.growth}%</span>
          </div>
        ))}

        {!loading && data.length === 0 && (
          <div className="empty-table">No revenue data found.</div>
        )}
      </div>
    </div>
  );
}

export default RevenueReport;
