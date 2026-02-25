// import { useNavigate } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";

// function AdminLayout({ children }) {
//   const navigate = useNavigate();
//   const loginName = localStorage.getItem("loginName");
//   const lastName = localStorage.getItem("lastName");
//   const communityName = localStorage.getItem("communityName");
//   const communityCode = localStorage.getItem("communityCode");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/admin-login");
//   };

//   return (
//     <div className="dashboard-page">
//       <style>
//         {`
//         .dashboard-page {
//   display: flex;
//   height: 100vh;        /* IMPORTANT */
//   overflow: hidden;     /* Prevent full page scroll */
//   background-color: #2C3E50;
// }

// .main-content {
//   flex: 1;
//   background-color: #f4f7f9;
//   padding: 2rem;
//   border-top-left-radius: 2rem;
//   border-bottom-left-radius: 2rem;

//   overflow-y: auto;     /* Scroll only this */
// }

// /* Hide scrollbar */
// .main-content::-webkit-scrollbar {
//   display: none;
// }
// .main-content {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }

//         .header-bar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//         }
//         .btn-logout {
//           background-color: #E74C3C;
//           color: white;
//           border: none;
//           padding: 0.5rem 1.2rem;
//           border-radius: 8px;
//           font-weight: 600;
//         }
//         .btn-logout:hover {
//           background-color: #C0392B;
//         }
//         @media (max-width: 768px) {
//           .dashboard-page {
//             flex-direction: column;
//           }
//           .main-content {
//             border-radius: 0;
//           }
//         }
//         `}
//       </style>

//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="header-bar">
//           <h4>
//             Welcome Admin, {loginName} {lastName}
//           </h4>
//           <button className="btn-logout" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//         <p className="text-muted">
//           Community: {communityName} ({communityCode})
//         </p>
//         <hr />

//         {/* ✅ Page Content */}
//         {children}
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import { Menu } from "lucide-react";

// function AdminLayout({ children }) {
//   const navigate = useNavigate();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   const loginName = localStorage.getItem("loginName");
//   const lastName = localStorage.getItem("lastName");
//   const communityName = localStorage.getItem("communityName");
//   const communityCode = localStorage.getItem("communityCode");

//   return (
//     <div className="dashboard-page">
//       <style>
//         {`
//         .dashboard-page {
//           display: flex;
//           height: 100vh;
//           overflow: hidden;
//           background-color: #2C3E50;
//         }

//         .sidebar-overlay {
//           display: none;
//         }

//         @media (max-width: 768px) {
//           .sidebar-overlay {
//             display: ${isMobileOpen ? "block" : "none"};
//             position: fixed;
//             inset: 0;
//             background: rgba(0,0,0,0.4);
//             z-index: 998;
//           }
//         }

//         .main-content {
//           flex: 1;
//           background-color: #f4f7f9;
//           border-top-left-radius: 2rem;
//           border-bottom-left-radius: 2rem;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//         }

//         @media (max-width: 768px) {
//           .main-content {
//             border-radius: 0;
//           }
//         }

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
//         }

//         // .fixed-header {
//         //   padding: 1.5rem 2rem 1rem 2rem;
//         // }

//         // @media (max-width: 768px) {
//         //   .fixed-header {
//         //     padding: 1rem;
//         //   }
//         // }

//         .fixed-header {
//   padding: 1.5rem 2rem 1rem 2rem;
//   background-color: #f4f7f9;
// }

// /* 👇 Mobile me sticky bana do */
// @media (max-width: 768px) {
//   .fixed-header {
//     position: sticky;
//     top: 0;
//     z-index: 5;
//     background: #f4f7f9;
//     padding: 1rem;
//   }
// }

//         .header-bar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .community-text {
//           font-size: 0.9rem;
//           color: #666;
//         }

//         hr {
//           margin-top: 10px;
//         }

//         .content-wrapper {
//           padding: 0 2rem 2rem 2rem;
//         }

//         @media (max-width: 768px) {
//           .content-wrapper {
//             padding: 1rem;
//           }
//         }

//         .main-content::-webkit-scrollbar {
//           display: none;
//         }
//         .main-content {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         `}
//       </style>

//       {/* Overlay */}
//       <div
//         className="sidebar-overlay"
//         onClick={() => setIsMobileOpen(false)}
//       ></div>

//       <AdminSidebar
//         isMobileOpen={isMobileOpen}
//         setIsMobileOpen={setIsMobileOpen}
//       />

//       <div className="main-content">

//         {/* Mobile Header */}
//         <div className="mobile-header">
//           <Menu size={24} onClick={() => setIsMobileOpen(true)} />
//           <div>🏠 MyColonyConnect</div>
//         </div>

//         <div className="fixed-header">
//           <div className="header-bar">
//             <h4>
//               Welcome Admin, {loginName} {lastName}
//             </h4>

//             <div className="community-text">
//               {communityName} ({communityCode})
//             </div>
//           </div>
//           <hr />
//         </div>

//         <div className="content-wrapper">{children}</div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [sessionModal, setSessionModal] = useState({
    show: false,
    message: ""
  });

  const loginName = localStorage.getItem("loginName");
  const lastName = localStorage.getItem("lastName");
  const communityName = localStorage.getItem("communityName");
  const communityCode = localStorage.getItem("communityCode");

  // 🔐 Session Expiry Listener
  useEffect(() => {
    const handleSessionExpired = (event) => {
      setSessionModal({
        show: true,
        message: event.detail || "Session expired. Please login again."
      });
    };

    window.addEventListener("sessionExpired", handleSessionExpired);

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  return (
    <div className="dashboard-page">
      <style>{`
        .dashboard-page {
          display: flex;
          height: 100vh;
          background-color: #2C3E50;
        }

        .sidebar-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar-overlay {
            display: ${isMobileOpen ? "block" : "none"};
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 998;
          }
        }

        .main-content {
          flex: 1;
          background-color: #f4f7f9;
          border-top-left-radius: 2rem;
          border-bottom-left-radius: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .main-content {
            border-radius: 0;
          }
        }

        .mobile-header {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2C3E50;
            color: white;
            padding: 1rem;
            font-weight: 600;
          }
        }

        .fixed-header {
          padding: 1.5rem 2rem 1rem 2rem;
          background-color: #f4f7f9;
        }

        .content-wrapper {
          padding: 0 2rem 2rem 2rem;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1rem;
          }
        }
      `}</style>

      <div
        className="sidebar-overlay"
        onClick={() => setIsMobileOpen(false)}
      ></div>

      <AdminSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="main-content">

        <div className="mobile-header">
          <Menu size={24} onClick={() => setIsMobileOpen(true)} />
          <div>🏠 MyColonyConnect</div>
        </div>

        <div className="fixed-header">
          <h4>
            Welcome Admin, {loginName} {lastName}
          </h4>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            {communityName} ({communityCode})
          </div>
          <hr />
        </div>

        <div className="content-wrapper">
          {children}
        </div>

      </div>

      {/* 🔐 Session Modal */}
      {sessionModal.show && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                <div style={{ fontSize: "50px" }}>⚠️</div>
                <h5 className="fw-bold text-danger">Session Expired</h5>
                <p className="my-3">{sessionModal.message}</p>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/admin-login");
                  }}
                >
                  Login Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;


