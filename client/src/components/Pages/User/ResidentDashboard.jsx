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