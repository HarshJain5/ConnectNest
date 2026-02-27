// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import ResidentSidebar from "./ResidentSidebar";
// import { Menu } from "lucide-react";

// function ResidentLayout({ children }) {
//   const navigate = useNavigate();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   const residentName = localStorage.getItem("residentName");
//   const communityName = localStorage.getItem("communityName");
//   const communityCode = localStorage.getItem("communityCode");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/resident-login");
//   };

//   return (
//     <div className="dashboard-page">
//       <style>{`
//         .dashboard-page {
//           display: flex;
//           height: 100vh;
//           background-color: #2C3E50;
//         }

//         /* Overlay */
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

//         /* Main content (Scrollable) */
//         .main-content {
//           flex: 1;
//           background-color: #f4f7f9;
//           border-top-left-radius: 2rem;
//           border-bottom-left-radius: 2rem;
//           display: flex;
//           flex-direction: column;
//           overflow-y: auto;
//         }

//         @media (max-width: 768px) {
//           .main-content {
//             border-radius: 0;
//           }
//         }

//         .main-content::-webkit-scrollbar {
//           display: none;
//         }

//         /* Mobile Header (scrollable) */
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

//         /* Sticky Welcome Header */
//         .fixed-header {
//           padding: 1.5rem 2rem 1rem 2rem;
//           background: #f4f7f9;
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }

//         @media (max-width: 768px) {
//           .fixed-header {
//             padding: 1rem;
//           }
//         }

//         .header-bar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .page-content {
//           padding: 2rem;
//         }

//         @media (max-width: 768px) {
//           .page-content {
//             padding: 1rem;
//           }
//         }

//       `}</style>

//       {/* Overlay */}
//       <div
//         className="sidebar-overlay"
//         onClick={() => setIsMobileOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <ResidentSidebar
//         isMobileOpen={isMobileOpen}
//         setIsMobileOpen={setIsMobileOpen}
//         handleLogout={handleLogout}
//       />

//       <div className="main-content">

//         {/* Mobile Header (Scroll ho jayega) */}
//         <div className="mobile-header">
//           <Menu size={24} onClick={() => setIsMobileOpen(true)} />
//           <div>🏠 MyColonyConnect</div>
//         </div>

//         {/* Sticky Welcome Header */}
//         <div className="fixed-header">
//           <div className="header-bar">
//             <h4>Welcome Resident, {residentName}</h4>
//           </div>

//           <p style={{ marginTop: "6px", color: "#777" }}>
//             Community: {communityName} 
//           </p>
//           <hr />
//         </div>

//         {/* Page Content */}
//         <div className="page-content">
//           {children}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default ResidentLayout;

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ResidentSidebar from "./ResidentSidebar";
import { Menu } from "lucide-react";
import { Contextapi } from "../../../contextapi/Contextapi";

function ResidentLayout({ children }) {
  const navigate = useNavigate();
  const { user, clearAuthData } = useContext(Contextapi);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [sessionModal, setSessionModal] = useState({
    show: false,
    message: ""
  });

  const handleLogout = () => {
    clearAuthData();
    navigate("/resident-login");
  };

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
          min-height: 100dvh;
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
          display: flex;
          flex-direction: column;
          overflow-y: auto;
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

        .page-content {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .page-content {
            padding: 1rem;
          }
        }
      `}</style>

      {/* Sidebar Overlay */}
      <div
        className="sidebar-overlay"
        onClick={() => setIsMobileOpen(false)}
      ></div>

      <ResidentSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        handleLogout={handleLogout}
      />

      <div className="main-content">

        {/* Mobile Header */}
        <div className="mobile-header">
          <Menu size={24} onClick={() => setIsMobileOpen(true)} />
          <div>🏠 ConnectNest</div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>

      </div>

      {/* 🔐 Session Expired Modal */}
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
                    clearAuthData();
                    navigate("/resident-login");
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

export default ResidentLayout;