import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Contextapi } from "../contextapi/Contextapi";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const navigate = useNavigate();
  const { token, role, clearAuthData } = useContext(Contextapi);

  const handleLogout = () => {
    clearAuthData();
    navigate("/");
  };

  if (!token) return null; // agar login nahi → hide header

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">
          {role === "admin" ? "Admin Portal" : "Resident Portal"}
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {role === "admin" && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/admin/manage-residents")}
                  >
                    Manage Residents
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/admin/manage-announcements")}
                  >
                    Manage Announcements
                  </button>
                </li>
                {/* ✅ New Bills Option */}
    <li className="nav-item">
      <button
        className="btn btn-link nav-link"
        onClick={() => navigate("/admin/manage-bills")}
      >
        Manage Bills
      </button>
    </li>
    <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/admin/complaints")}
                  >
                    Manage Complaints
                  </button>
                </li>
              </>
            )}

            {role === "resident" && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/resident/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                <button
          className="btn btn-link nav-link"
          onClick={() => navigate("/resident/bills")}
        >
          My Bills
        </button>
        </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/resident/profile")}
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => navigate("/resident/complaints")}
                  >
                    Complaints
                  </button>
                </li>
                
              </>
            )}
          </ul>

          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;