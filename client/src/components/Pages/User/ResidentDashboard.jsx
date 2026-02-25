// import { useContext, useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../../../components/axiosInstance"
// import { Contextapi } from "../../../contextapi/Contextapi";
// import Sidebar from "./ResidentSidebar";
// import ResidentLayout from "./ResidentLayout";

// function ResidentDashboard() {
//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);   
//   const [name, setName] = useState("");
//   const [community, setCommunity] = useState("");
//   const [code, setCode] = useState("");
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/resident-login");
//     } else {
//       setName(localStorage.getItem("loginName") || "Resident");
//       setCommunity(localStorage.getItem("communityName") || "My Colony Connect");
//       setCode(localStorage.getItem("communityCode") || "MYCC123");

//       // ✅ Fetch Announcements
//       fetchAnnouncements(token);
//     }
//   }, [navigate]);

//   const fetchAnnouncements = async (token) => {
//     try {
//       const res = await axios.get("/api/resident/announcements", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setAnnouncements(res.data);
//     } catch (err) {
//       console.error("Error fetching announcements", err);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   return (
//     <>
//         <ResidentLayout/>
//     <div className="dashboard-page">
        
//         <style>
//             {`
//             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
//             body {
//                 font-family: 'Poppins', sans-serif;
//                 background-color: #f4f7f9;
//                 color: #2C3E50;
//             }
//             .dashboard-page {
//                 display: flex;
//                 min-height: 100vh;
//                 background-color: #2C3E50;
//             }
//             .sidebar {
//                 width: 250px;
//                 background-color: #2C3E50;
//                 color: #ffffff;
//                 padding: 2rem 1rem;
//                 box-shadow: 2px 0 5px rgba(0,0,0,0.1);
//                 display: flex;
//                 flex-direction: column;
//                 justify-content: space-between;
//             }
//             .sidebar-header {
//                 padding-bottom: 2rem;
//                 border-bottom: 1px solid rgba(255,255,255,0.1);
//             }
//             .sidebar-nav {
//                 list-style: none;
//                 padding: 0;
//                 flex-grow: 1;
//             }
//             .sidebar-nav-item a {
//                 color: #ffffff;
//                 text-decoration: none;
//                 display: flex;
//                 align-items: center;
//                 padding: 0.75rem 1rem;
//                 border-radius: 0.5rem;
//                 transition: background-color 0.3s ease;
//             }
//             .sidebar-nav-item a:hover {
//                 background-color: #34495E;
//             }
//             .sidebar-nav-item a svg {
//                 margin-right: 1rem;
//             }
//             .main-content {
//                 flex-grow: 1;
//                 background-color: #f4f7f9;
//                 padding: 2rem;
//                 border-top-left-radius: 2rem;
//                 border-bottom-left-radius: 2rem;
//             }
//             .header-bar {
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 margin-bottom: 2rem;
//             }
//             .header-bar .btn-logout {
//                 background-color: #E74C3C;
//                 color: white;
//                 border: none;
//                 padding: 0.5rem 1.5rem;
//                 border-radius: 9999px;
//                 font-weight: 600;
//                 transition: background-color 0.3s ease;
//             }
//             .header-bar .btn-logout:hover {
//                 background-color: #C0392B;
//             }
//             .card-announcement {
//                 background-color: #ffffff;
//                 border: 1px solid #e5e7eb;
//                 border-radius: 1rem;
//                 padding: 1.5rem;
//                 margin-bottom: 1rem;
//                 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//             }
//             .card-announcement h5 {
//                 color: #2C3E50;
//                 font-weight: 600;
//             }
//             @media (max-width: 768px) {
//                 .dashboard-page {
//                     flex-direction: column;
//                 }
//                 .sidebar {
//                     width: 100%;
//                     height: auto;
//                     padding: 1rem;
//                     border-bottom-left-radius: 0;
//                     border-bottom-right-radius: 0;
//                     flex-direction: row;
//                     flex-wrap: wrap;
//                     box-shadow: none;
//                 }
//                 .sidebar-header {
//                     width: 100%;
//                     text-align: center;
//                     padding-bottom: 1rem;
//                     border-bottom: none;
//                 }
//                 .sidebar-nav {
//                     width: 100%;
//                     flex-direction: row;
//                     justify-content: center;
//                     gap: 0.5rem;
//                 }
//                 .sidebar-nav-item {
//                     font-size: 0.75rem;
//                 }
//                 .main-content {
//                     border-radius: 0;
//                 }
//             }
//             `}
//         </style>
        
//         <div className="main-content">
//             <div className="header-bar">
//                 <h2>Welcome Resident, {name}</h2>
//             </div>
//             <p className="text-muted">Community: {community}</p>
//             <hr />
//             <h3>📢 Announcements</h3>
//             {loading ? (
//                 <p>Loading announcements...</p>
//             ) : announcements.length === 0 ? (
//                 <p className="text-muted">No announcements yet.</p>
//             ) : (
//                 announcements.map((ann) => (
//                     <div key={ann._id} className="card-announcement">
//                         <h5>{ann.title}</h5>
//                         <p>{ann.message}</p>
//                         <small className="text-muted">Published on: {new Date(ann.createdAt).toLocaleString()}</small>
//                     </div>
//                 ))
//             )}
//         </div>
//     </div>
//     </>
//   );
// }

// export default ResidentDashboard;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../components/axiosInstance";
import { Contextapi } from "../../../contextapi/Contextapi";
import ResidentLayout from "./ResidentLayout";

function ResidentDashboard() {
  const navigate = useNavigate();
  const { clearAuthData } = useContext(Contextapi);

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/resident-login");
      return;
    }

    fetchAnnouncements();
  }, [navigate]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("/api/resident/announcements", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResidentLayout>
      <style>
        {`
        .notice-card {
  background: #2F6B3C;
  border: 12px solid #5A3B1E;
  border-radius: 16px;
  color: white;
  padding: 2rem;
  margin: 0 auto 2rem auto;   /* center */
  max-width: 1000px;           /* width control */
  width: 90%;                 /* responsive */
  position: relative;
}

        .notice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .notice-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: bold;
          letter-spacing: 4px;
          margin: 1rem 0;
        }

        .notice-body {
  text-align: center;
  margin-top: 1.5rem;
  max-width: 1000px;        /* Width limit */
  margin-left: auto;
  margin-right: auto;
}

.notice-body p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
}

        .notice-body h4 {
          text-decoration: underline;
          margin-bottom: 1rem;
        }

        .page-header {
  position: sticky;
  top: 0;
  background: #f4f7f9;
  padding: 1.2rem 2rem;
  z-index: 9;
  border-bottom: 1px solid #ddd;
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem;
  }
}

        @media (max-width: 768px) {
          .notice-card {
            padding: 1.2rem;
            border-width: 8px;
          }

          .notice-title {
            font-size: 1.3rem;
            letter-spacing: 2px;
          }

          .notice-body h4 {
            font-size: 1.1rem;
          }
        }
        `}
      </style>

      <div className="page-header">
  <h3 style={{ marginBottom: "1.5rem" }}>📢 Announcements</h3>
</div>
      

      {loading ? (
        <p>Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p style={{ color: "#777" }}>No announcements yet.</p>
      ) : (
        announcements.map((ann) => {
          const dateObj = new Date(ann.createdAt);
          return (
            <div key={ann._id} className="notice-card">
              <div className="notice-header">
                <span>{dateObj.toLocaleDateString()}</span>
                <span>{dateObj.toLocaleTimeString()}</span>
              </div>

              <div className="notice-title">NOTICE</div>

              <hr style={{ borderColor: "rgba(255,255,255,0.4)" }} />

              <div className="notice-body">
                <h4>{ann.title}</h4>
                <p>{ann.message}</p>
              </div>
            </div>
          );
        })
      )}
    </ResidentLayout>
  );
}

export default ResidentDashboard;