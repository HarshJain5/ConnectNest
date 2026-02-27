// import React, { useState } from "react";

// const Sidebar = ({ handleLogout }) => {
//   const [isOpen, setIsOpen] = useState(true); // sidebar open/close state

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

//           body {
//             font-family: 'Poppins', sans-serif;
//             background-color: #f4f7f9;
//             color: #2C3E50;
//           }

//           .sidebar {
//             width: 250px;
//             background-color: #2C3E50;
//             color: #ffffff;
//             padding: 2rem 1rem;
//             box-shadow: 2px 0 5px rgba(0,0,0,0.1);
//             display: flex;
//             flex-direction: column;
//             justify-content: space-between;
//             transition: width 0.3s ease;
//           }

//           .sidebar.closed {
//             width: 60px;
//           }

//           .sidebar-header {
//             padding-bottom: 2rem;
//             border-bottom: 1px solid rgba(255,255,255,0.1);
//             text-align: center;
//           }

//           .sidebar-header h3 {
//             font-size: 1.4rem;
//             font-weight: 700;
//             color: #ECF0F1;
//             margin: 0;
//             letter-spacing: 1px;
//             transition: opacity 0.3s ease;
//           }

//           .sidebar.closed .sidebar-header h3 {
//             opacity: 0;
//           }

//           .sidebar-nav {
//             list-style: none;
//             padding: 0;
//             flex-grow: 1;
//             margin-top: 1.5rem;
//           }

//           .sidebar-nav-item a {
//             color: #ffffff;
//             text-decoration: none;
//             display: flex;
//             align-items: center;
//             padding: 0.75rem 1rem;
//             border-radius: 0.5rem;
//             transition: background-color 0.3s ease;
//           }

//           .sidebar-nav-item a:hover {
//             background-color: #34495E;
//           }

//           .sidebar-nav-item a svg {
//             margin-right: 1rem;
//             min-width: 22px;
//           }

//           .sidebar.closed .sidebar-nav-item span {
//             display: none;
//           }

//           .toggle-btn {
//             background: none;
//             border: none;
//             color: white;
//             font-size: 1.5rem;
//             cursor: pointer;
//             margin-top: 1rem;
//           }

//           .btn-logout {
//             background-color: #E74C3C;
//             color: white;
//             border: none;
//             padding: 0.5rem 1.5rem;
//             border-radius: 9999px;
//             font-weight: 600;
//             transition: background-color 0.3s ease;
//           }

//           .btn-logout:hover {
//             background-color: #C0392B;
//           }
//         `}
//       </style>

//       <div className="sidebar-header">
//         <h3>🏠 MyColonyConnect</h3>
//       </div>

//       <ul className="sidebar-nav">
//         <li className="sidebar-nav-item">
//           <a href="/resident/dashboard">
//             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4 0v-8m5-2l2 2m-2-2v10a2 2 0 01-2 2h-3m-6 0H5a2 2 0 01-2-2V10z"/>
//             </svg>
//             <span>Dashboard</span>
//           </a>
//           <a href="/resident/bills">
//             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15V7a2 2 0 0 0-2-2h-4V3a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v8m18 0a2 2 0 0 1-2 2h-2m4-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2m0 0a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//             </svg>
//             <span>My Bills</span>
//           </a>
//           <a href="/resident/profile">
//             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M6 20c0-2.21 3.58-4 6-4s6 1.79 6 4"/>
//             </svg>
//             <span>Profile</span>
//           </a>
//           <a href="/resident/complaints">
//             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//             </svg>
//             <span>Complaints</span>
//           </a>
//         </li>
//       </ul>

//       <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? "⬅️" : "➡️"}
//       </button>

//       <button className="btn-logout mt-3" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import { Menu, X, LogOut } from "lucide-react";

// const Sidebar = ({ handleLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleLinkClick = () => {
//     if (window.innerWidth <= 768) {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//         body {
//           font-family: 'Poppins', sans-serif;
//         }

//         .sidebar {
//           width: 250px;
//           height: 100vh;
//           background-color: #2C3E50;
//           color: white;
//           padding: 2rem 1rem;
//           display: flex;
//           flex-direction: column;
//           transition: all 0.3s ease;
//           position: relative;
//           z-index: 1000;
//         }

//         .collapsed {
//           width: 70px;
//         }

//         .collapsed h3,
//         .collapsed span {
//           display: none;
//         }

//         .sidebar-header {
//           text-align: center;
//           padding-bottom: 2rem;
//           border-bottom: 1px solid rgba(255,255,255,0.1);
//         }

//         .sidebar-nav {
//           list-style: none;
//           padding: 0;
//           margin-top: 1.5rem;
//           flex: 1;
//         }

//         .sidebar-nav a {
//           color: white;
//           text-decoration: none;
//           display: flex;
//           align-items: center;
//           padding: 0.75rem 1rem;
//           border-radius: 0.5rem;
//           transition: background 0.3s;
//         }

//         .sidebar-nav a:hover {
//           background-color: #34495E;
//         }

//         .sidebar-nav svg {
//           min-width: 22px;
//           margin-right: 1rem;
//         }

//         .logout-btn {
//           background-color: #E74C3C;
//           color: white;
//           border: none;
//           padding: 0.6rem;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           cursor: pointer;
//           margin-top: 1rem;
//         }

//         .collapsed .logout-text {
//           display: none;
//         }

//         .toggle-btn {
//           background: none;
//           border: none;
//           color: white;
//           font-size: 1.2rem;
//           cursor: pointer;
//           margin-top: 1rem;
//         }

//         /* ===== MOBILE ===== */
//         .mobile-header {
//           display: none;
//         }

//         @media (max-width: 768px) {

//           .mobile-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             background: #2C3E50;
//             color: white;
//             padding: 1rem;
//             font-weight: 600;
//           }

//           .sidebar {
//             position: fixed;
//             top: 0;
//             left: -260px;
//           }

//           .sidebar.mobile-open {
//             left: 0;
//           }

//           .overlay {
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,0.4);
//             z-index: 999;
//           }

//           .desktop-toggle {
//             display: none;
//           }
//         }
//         `}
//       </style>

//       {/* ===== MOBILE HEADER ===== */}
//       <div className="mobile-header">
//         <Menu size={24} onClick={() => setIsOpen(true)} />
//         <div>🏠 MyColonyConnect</div>
//       </div>

//       {/* ===== OVERLAY ===== */}
//       {isOpen && window.innerWidth <= 768 && (
//         <div className="overlay" onClick={() => setIsOpen(false)}></div>
//       )}

//       {/* ===== SIDEBAR ===== */}
//       <div
//         className={`sidebar 
//         ${isCollapsed ? "collapsed" : ""} 
//         ${isOpen ? "mobile-open" : ""}`}
//       >
//         {/* Mobile Close */}
//         {isOpen && window.innerWidth <= 768 && (
//           <div
//             style={{
//               position: "absolute",
//               top: "15px",
//               right: "15px",
//               cursor: "pointer",
//             }}
//             onClick={() => setIsOpen(false)}
//           >
//             <X size={24} />
//           </div>
//         )}

//         <div className="sidebar-header">
//           <h3>🏠 MyColonyConnect</h3>
//         </div>

//         <ul className="sidebar-nav">
//           <li>
//             <a href="/resident/dashboard" onClick={handleLinkClick}>
//               🏠 <span>Dashboard</span>
//             </a>
//           </li>

//           <li>
//             <a href="/resident/bills" onClick={handleLinkClick}>
//               💳 <span>My Bills</span>
//             </a>
//           </li>

//           <li>
//             <a href="/resident/profile" onClick={handleLinkClick}>
//               👤 <span>Profile</span>
//             </a>
//           </li>

//           <li>
//             <a href="/resident/complaints" onClick={handleLinkClick}>
//               📝 <span>Complaints</span>
//             </a>
//           </li>
//         </ul>

//         <div>
//           <button className="logout-btn" onClick={handleLogout}>
//             <LogOut size={18} />
//             <span className="logout-text">Logout</span>
//           </button>

//           <button
//             className="toggle-btn desktop-toggle"
//             onClick={() => setIsCollapsed(!isCollapsed)}
//           >
//             {isCollapsed ? "➡️" : "⬅️"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  LayoutDashboard,
  Receipt,
  User,
  MessageSquare,
  LogOut,
  X
} from "lucide-react";

const ResidentSidebar = ({ isMobileOpen, setIsMobileOpen, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`sidebar 
        ${isCollapsed ? "collapsed" : ""} 
        ${isMobileOpen ? "mobile-open" : ""}`}
    >
      <style>{`
        .sidebar {
          width: 250px;
          background-color: #2C3E50;
          color: white;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
          position: relative;
          z-index: 999;
        }

        .collapsed {
          width: 70px;
        }

        .collapsed .nav-text,
        .collapsed h3 {
          display: none;
        }

        .sidebar-header {
          text-align: center;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin-top: 1.5rem;
        }

        .sidebar-nav a {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: 0.3s;
        }

        .sidebar-nav a:hover {
          background-color: #34495E;
        }

        .sidebar-nav svg {
          min-width: 22px;
        }

        .nav-text {
          margin-left: 1rem;
        }

        .logout-btn {
          width: 100%;
          background: #E74C3C;
          border: none;
          padding: 0.6rem;
          border-radius: 8px;
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .collapsed .logout-text {
          display: none;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -260px;
          }

          .mobile-open {
            left: 0;
          }

          .desktop-toggle {
            display: none;
          }
        }

      `}</style>

      {/* Mobile Close */}
      {isMobileOpen && window.innerWidth <= 768 && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={24} />
        </div>
      )}

      <div>
        <div className="sidebar-header">
          <h3>🏠 MyColonyConnect</h3>
        </div>

        <ul className="sidebar-nav">
          <li>
            <a href="/resident/dashboard">
              <LayoutDashboard size={20} />
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/resident/bills">
              <Receipt size={20} />
              <span className="nav-text">My Bills</span>
            </a>
          </li>

          <li>
            <a href="/resident/complaints">
              <MessageSquare size={20} />
              <span className="nav-text">Complaints</span>
            </a>
          </li>

          <li>
            <a href="/resident/profile">
              <User size={20} />
              <span className="nav-text">Profile</span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span className="logout-text">Logout</span>
        </button>

        <button
          className="toggle-btn desktop-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>
    </div>
  );
};

export default ResidentSidebar;
