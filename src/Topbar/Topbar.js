// import React, { useState } from "react";
// import { Bell, Menu, Search, ChevronDown } from "lucide-react";
// import "./Topbar.css";

// function Topbar({ onMenu }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="topbar">

//       {/* LEFT */}
//       <div className="topbar-left">
//         <button className="topbar-menu-btn" onClick={onMenu}>
//           <Menu size={20} />
//         </button>

//         <div className="topbar-search-box">
//           <Search size={16} className="topbar-search-icon" />
//           <input
//             type="text"
//             placeholder="Search patients, doctors, appointments..."
//           />
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="topbar-right">

//         {/* Notification */}
//         <div className="topbar-notification">
//           <Bell size={18} />
//           <span className="topbar-dot"></span>
//         </div>

//         {/* Profile */}
//         <div className="topbar-profile" onClick={() => setOpen(!open)}>
//           <div className="topbar-avatar">A</div>

//           <div className="topbar-user-info">
//             <p>Admin</p>
//             <span>Administrator</span>
//           </div>

//           <ChevronDown size={14} />

//           {open && (
//             <div className="topbar-dropdown">
//               <div className="topbar-dropdown-header">
//                 <p className="topbar-name">Admin</p>
//                 <span className="topbar-email">admin@medicore.io</span>
//               </div>

//               <div className="topbar-dropdown-item topbar-logout">
//                 Sign out
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }

// export default Topbar;



import React, {
  useState,
  useEffect,
} from "react";

import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import "./Topbar.css";

function Topbar({ onMenu }) {

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const [adminEmail, setAdminEmail] =
    useState("");

  const [adminRole, setAdminRole] =
    useState("Admin");

  /* ================= LOAD LOCAL STORAGE ================= */

  useEffect(() => {

    const email =
      localStorage.getItem(
        "adminEmail"
      );

    const role =
      localStorage.getItem(
        "adminRole"
      );

    if (email) {
      setAdminEmail(email);
    }

    if (role) {
      setAdminRole(role);
    }

  }, []);

  /* ================= GET NAME LETTER ================= */

  const getInitial = () => {

    if (!adminEmail) {
      return "A";
    }

    return adminEmail
      .charAt(0)
      .toUpperCase();
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "doctorToken"
    );

    localStorage.removeItem(
      "adminEmail"
    );

    localStorage.removeItem(
      "doctorEmail"
    );

    localStorage.removeItem(
      "adminRole"
    );

    localStorage.removeItem(
      "doctorRole"
    );

    localStorage.removeItem(
      "userRole"
    );

    localStorage.removeItem(
      "doctorId"
    );

    localStorage.removeItem(
      "doctorName"
    );

    localStorage.removeItem(
      "hospitalId"
    );

    localStorage.removeItem(
      "hospitalName"
    );

    navigate("/login");
  };

  return (

    <header className="topbar">

      {/* LEFT */}

      <div className="topbar-left">

        <button
          className="topbar-menu-btn"
          onClick={onMenu}
        >
          <Menu size={20} />
        </button>

        <div className="topbar-search-box">

          <Search
            size={16}
            className="topbar-search-icon"
          />

          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="topbar-right">

        {/* NOTIFICATION */}

        <div className="topbar-notification">

          <Bell size={18} />

          <span className="topbar-dot"></span>

        </div>

        {/* PROFILE */}

        <div
          className="topbar-profile"
          onClick={() =>
            setOpen(!open)
          }
        >

          {/* AVATAR */}

          <div className="topbar-avatar">
            {getInitial()}
          </div>

          {/* USER INFO */}

          <div className="topbar-user-info">

            <p>
              {adminRole ||
                "Admin"}
            </p>

            <span>
              Administrator
            </span>

          </div>

          <ChevronDown size={14} />

          {/* DROPDOWN */}

          {open && (

            <div className="topbar-dropdown">

              <div className="topbar-dropdown-header">

                <p className="topbar-name">
                  {adminRole ||
                    "Admin"}
                </p>

                <span className="topbar-email">
                  {adminEmail ||
                    "admin@gmail.com"}
                </span>

              </div>

              {/* LOGOUT */}

              <div
                className="topbar-dropdown-item topbar-logout"
                onClick={
                  handleLogout
                }
              >
                Sign out
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;
