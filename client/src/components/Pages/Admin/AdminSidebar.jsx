import React, { useState } from "react";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  Receipt,
  MessageSquare,
  X,
  LogOut
} from "lucide-react";

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };

  return (
    <div
      className={`sidebar 
      ${isCollapsed ? "collapsed" : ""} 
      ${isMobileOpen ? "mobile-open" : ""}`}
    >
      <style>
        {`
        .sidebar {
          position: relative;
          width: 250px;
          height: 100vh;
          flex-shrink: 0;
          background-color: #2C3E50;
          color: white;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .collapsed {
          width: 70px;
        }

        .collapsed .sidebar-header h3,
        .collapsed .nav-text {
          display: none;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -260px;
            z-index: 999;
          }

          .mobile-open {
            left: 0;
          }

          .desktop-toggle {
            display: none;
          }
        }

        .sidebar-header {
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-align: center;
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin-top: 1.5rem;
        }

        .sidebar-nav-item a {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: background 0.3s ease;
        }

        .sidebar-nav-item a:hover {
          background-color: #34495E;
        }

        .sidebar-nav-item svg {
          min-width: 22px;
        }

        .nav-text {
          margin-left: 1rem;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          margin-top: 1rem;
        }

        .logout-btn {
          width: 100%;
          background: #E74C3C;
          color: white;
          border: none;
          padding: 0.6rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-top: 1rem;
        }

        .collapsed .logout-text {
          display: none;
        }
        `}
      </style>

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
          <li className="sidebar-nav-item">
            <a href="/admin/dashboard" onClick={handleLinkClick}>
              <LayoutDashboard size={20} />
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li className="sidebar-nav-item">
            <a href="/admin/manage-announcements" onClick={handleLinkClick}>
              <Megaphone size={20} />
              <span className="nav-text">Announcements</span>
            </a>
          </li>

          <li className="sidebar-nav-item">
            <a href="/admin/manage-residents" onClick={handleLinkClick}>
              <Users size={20} />
              <span className="nav-text">Residents</span>
            </a>
          </li>

          <li className="sidebar-nav-item">
            <a href="/admin/manage-bills" onClick={handleLinkClick}>
              <Receipt size={20} />
              <span className="nav-text">Bills</span>
            </a>
          </li>

          <li className="sidebar-nav-item">
            <a href="/admin/complaints" onClick={handleLinkClick}>
              <MessageSquare size={20} />
              <span className="nav-text">Complaints</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
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

export default AdminSidebar;




