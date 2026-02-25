import { useState, useEffect } from "react";
import axios from "../../../components/axiosInstance"
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import AdminLayout from "./AdminLayout";

function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ stats
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalMsg, setModalMsg] = useState("");

  const [statusSelect, setStatusSelect] = useState("");
  const [adminText, setAdminText] = useState("");
  const [responseImage, setResponseImage] = useState(null);

  const [pageMsg, setPageMsg] = useState("");

  const [showResidentsModal, setShowResidentsModal] = useState(false);
const [selectedResidents, setSelectedResidents] = useState([]);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const showTempMessage = (msg, ms = 2200) => {
    setPageMsg(msg);
    setTimeout(() => setPageMsg(""), ms);
  };

  const openResidentsModal = (residents) => {
  setSelectedResidents(residents || []);
  setShowResidentsModal(true);
};

  const fetchList = async () => {
    try {
      setLoading(true);
      const url = filter
        ? `/api/admin/complaints?status=${encodeURIComponent(filter)}`
        : "/api/admin/complaints";

      const res = await axios.get(url, authHeader);
      const data = res.data.complaints || [];

      // 🔥 Sort by duplicateCount (high priority first)
const sortedData = data.sort((a, b) => 
  (b.duplicateCount || 1) - (a.duplicateCount || 1)
);

setComplaints(sortedData);


      // ✅ derive stats from SAME data
      const total = data.length;
      const resolved = data.filter(c => c.status === "Resolved").length;
      const pending = data.filter(
        c => c.status === "Pending" || c.status === "In Progress"
      ).length;

      setStats({ total, resolved, pending });
    } catch (err) {
      showTempMessage("❌ Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, [filter]);

  const openModal = (complaint) => {
    setSelected(complaint);
    setStatusSelect(complaint.status);
    setAdminText(complaint.adminResponse?.text || "");
    setResponseImage(null);
    setModalMsg("");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!selected) return;
    try {
      const fd = new FormData();
      fd.append("status", statusSelect);
      fd.append("adminText", adminText);
      if (responseImage) fd.append("responseImage", responseImage);

      await axios.put(`/api/admin/complaints/${selected._id}`, fd, authHeader);

      setShowModal(false);
      fetchList();
      showTempMessage("✅ Complaint updated");
    } catch (err) {
      setModalMsg("❌ Failed to update complaint");
    }
  };

  const quickUpdateStatus = async (id, newStatus) => {
    try {
      const fd = new FormData();
      fd.append("status", newStatus);
      await axios.put(`/api/admin/complaints/${id}`, fd, authHeader);
      fetchList();
      showTempMessage(`✅ Marked as ${newStatus}`);
    } catch (err) {
      showTempMessage("❌ Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>📝 Manage Complaints</h2>
        <Form.Select
          style={{ width: 200 }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </Form.Select>
      </div>

      {/* ✅ TOP STATS */}
      <Row className="mb-3">
        <Col md={4} className="mb-2">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h6>Total Complaints</h6>
              <h3>{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-2">
          <Card className="text-center shadow-sm border-success">
            <Card.Body>
              <h6 className="text-success">Resolved</h6>
              <h3 className="text-success">{stats.resolved}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-2">
          <Card className="text-center shadow-sm border-warning">
            <Card.Body>
              <h6 className="text-warning">Pending / In Progress</h6>
              <h3 className="text-warning">{stats.pending}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {pageMsg && (
        <div
          style={{
            background: pageMsg.startsWith("❌") ? "#f8d7da" : "#d1e7dd",
            color: pageMsg.startsWith("❌") ? "#842029" : "#0f5132",
            padding: "10px",
            borderRadius: 8,
            marginBottom: "12px",
          }}
        >
          {pageMsg}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <Row>
          {complaints.map((c) => (
            <Col md={4} key={c._id} className="mb-3">
              <Card>
                {c.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={c.imageUrl}
                    style={{ height: 180, objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{c.title}</Card.Title>
                  <Card.Text style={{ minHeight: 60 }}>
                    {c.description}
                  </Card.Text>
                  <small className="text-muted">
                    By: {c.residentId?.firstName} {c.residentId?.lastName} (
                    {c.residentId?.flatNumber})
                  </small>
                  <br />
                  <small className="text-muted">
                    Status: <b>{c.status}</b>
                  </small>
                  {c?.duplicateCount > 1 && (
  <div className="mt-2">
    <span className="badge bg-danger">🔥 High Priority</span>
    <br />
    <small
  className="text-primary"
  style={{ cursor: "pointer", textDecoration: "underline" }}
  onClick={() => openResidentsModal(c.reportedResidents)}
>
  👥 {c.duplicateCount} residents reported this issue
</small>
  </div>
)}

{c?.duplicateCount > 1 && (
  <div className="alert alert-warning mt-2 p-2">
    🔥 High Priority Issue <br />
    {c.duplicateCount} residents are affected.
  </div>
)}


                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => openModal(c)}
                  >
                    Open
                  </Button>
                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        quickUpdateStatus(c._id, "In Progress")
                      }
                    >
                      In Progress
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        if (!window.confirm("Mark as Resolved?")) return;
                        quickUpdateStatus(c._id, "Resolved");
                      }}
                    >
                      Resolve
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal SAME as before */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Complaint Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMsg && (
            <div className="alert alert-danger">{modalMsg}</div>
          )}

          {selected && (
            <>
              <h5>{selected.title}</h5>
              <p>{selected.description}</p>
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                  }}
                />
              )}
              <hr />
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={statusSelect}
                  onChange={(e) => setStatusSelect(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Admin Response</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={adminText}
                  onChange={(e) => setAdminText(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Attach response image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setResponseImage(e.target.files[0])}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
  show={showResidentsModal}
  onHide={() => setShowResidentsModal(false)}
>
  <Modal.Header closeButton>
    <Modal.Title>Residents Who Reported</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedResidents.length === 0 ? (
      <p>No data available</p>
    ) : (
      selectedResidents.map((r, index) => (
        <div key={index} className="mb-2 p-2 border rounded">
          <strong>{r.firstName} {r.lastName}</strong>
          <br />
          Flat No: {r.flatNumber}
        </div>
      ))
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowResidentsModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </AdminLayout>
  );
}

export default ManageComplaints;

