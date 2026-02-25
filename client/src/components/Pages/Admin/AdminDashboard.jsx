import { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import axios from "../../../components/axiosInstance"

function AdminDashboard() {
  const navigate = useNavigate();

  const loginName = localStorage.getItem("loginName");
  const lastName = localStorage.getItem("lastName");
  const communityName = localStorage.getItem("communityName");
  const communityCode = localStorage.getItem("communityCode");
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    residents: 0,
    complaints: 0,
    bills: 0,
    announcements: 0
  });

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) navigate("/admin-login");
    else fetchStats();
    // eslint-disable-next-line
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard/stats", authHeader);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <AdminLayout>
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>📊 Admin Dashboard</h2>
        
      </div>

      

      <Row className="mt-4">
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Residents</Card.Title>
              <Card.Text>{stats.residents}</Card.Text>
              <Button variant="primary" onClick={() => navigate("/admin/manage-residents")}>
                Manage
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Complaints</Card.Title>
              <Card.Text>{stats.complaints}</Card.Text>
              <Button variant="warning" onClick={() => navigate("/admin/complaints")}>
                Manage
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Bills</Card.Title>
              <Card.Text>{stats.bills}</Card.Text>
              <Button variant="success" onClick={() => navigate("/admin/manage-bills")}>
                Manage
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center p-3 shadow-sm">
            <Card.Body>
              <Card.Title>Announcements</Card.Title>
              <Card.Text>{stats.announcements}</Card.Text>
              <Button variant="info" onClick={() => navigate("/admin/manage-announcements")}>
                Manage
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default AdminDashboard;


