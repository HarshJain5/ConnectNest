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
          min-height: 100dvh;
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
