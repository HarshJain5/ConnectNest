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