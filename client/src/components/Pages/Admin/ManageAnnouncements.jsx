import { useEffect, useState } from "react";
import axios from "../../../components/axiosInstance"
import { Modal, Button } from "react-bootstrap";
import AdminLayout from "./AdminLayout";

function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selected, setSelected] = useState(null);

  // ✅ stats derived from same API
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    unpublished: 0,
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [formData, setFormData] = useState({ title: "", message: "" });

  const [pageMsg, setPageMsg] = useState("");
  const [addModalMsg, setAddModalMsg] = useState("");
  const [editModalMsg, setEditModalMsg] = useState("");

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const showTempMessage = (msg, ms = 2200) => {
    setPageMsg(msg);
    setTimeout(() => setPageMsg(""), ms);
  };

  // ✅ single API → list + stats
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("/api/admin/announcements", authHeader);
      const data = res.data || [];

      setAnnouncements(data);

      const total = data.length;
      const published = data.filter(a => a.status === "published").length;
      const unpublished = data.filter(a => a.status === "unpublished").length;

      setStats({ total, published, unpublished });
    } catch (err) {
      showTempMessage("❌ Failed to load announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add
  const openAddModal = () => {
    setFormData({ title: "", message: "" });
    setAddModalMsg("");
    setShowAdd(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/add-announcements", formData, authHeader);
      setAddModalMsg("✅ Announcement created");
      setTimeout(() => {
        setShowAdd(false);
        fetchAnnouncements();
        showTempMessage("✅ Announcement created");
      }, 900);
    } catch (err) {
      setAddModalMsg("❌ Failed to create announcement");
    }
  };

  // Edit
  const openEditModal = (ann) => {
    setSelected(ann);
    setFormData({ title: ann.title || "", message: ann.message || "" });
    setEditModalMsg("");
    setShowEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selected?._id) return;
    try {
      await axios.put(`/api/admin/announcements/${selected._id}`, formData, authHeader);
      setEditModalMsg("✏️ Updated");
      setTimeout(() => {
        setShowEdit(false);
        fetchAnnouncements();
        showTempMessage("✏️ Announcement updated");
      }, 900);
    } catch (err) {
      setEditModalMsg("❌ Failed to update announcement");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`/api/admin/announcements/${id}`, authHeader);
      fetchAnnouncements();
      showTempMessage("🗑️ Deleted");
    } catch (err) {
      showTempMessage("❌ Failed to delete");
    }
  };

  // Toggle publish
  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(`/api/admin/announcements/${id}/toggle`, {}, authHeader);
      const state = res?.data?.announcement?.status;
      fetchAnnouncements();
      showTempMessage(state === "published" ? "✅ Published" : "⏸️ Unpublished");
    } catch (err) {
      showTempMessage("❌ Failed to change status");
    }
  };

  const formatDate = (iso) => (iso ? new Date(iso).toLocaleString() : "-");

  return (
    <AdminLayout>
      <div className="page-header d-flex justify-content-between align-items-center">
        <h2>📢 Manage Announcements</h2>
        <Button onClick={openAddModal}>+ New</Button>
      </div>

      {/* ✅ TOP STATS */}
      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Total Announcements</h6>
              <h3>{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center border-success">
            <div className="card-body">
              <h6 className="text-success">Published</h6>
              <h3 className="text-success">{stats.published}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm text-center border-secondary">
            <div className="card-body">
              <h6 className="text-secondary">Unpublished</h6>
              <h3 className="text-secondary">{stats.unpublished}</h3>
            </div>
          </div>
        </div>
      </div>

      {pageMsg && (
        <div
          style={{
            background: pageMsg.startsWith("❌") ? "#f8d7da" : "#d1e7dd",
            color: pageMsg.startsWith("❌") ? "#842029" : "#0f5132",
            padding: "10px",
            borderRadius: 8,
            margin: "12px 0",
          }}
        >
          {pageMsg}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Status</th>
              <th>Created</th>
              <th style={{ width: 270 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((ann) => (
              <tr key={ann._id}>
                <td>{ann.title}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>{ann.message}</td>
                <td>
                  <span className={`badge ${ann.status === "published" ? "bg-success" : "bg-secondary"}`}>
                    {ann.status}
                  </span>
                </td>
                <td>{formatDate(ann.createdAt)}</td>
                <td>
                  <Button size="sm" onClick={() => openEditModal(ann)} className="me-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(ann._id)} className="me-1">
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant={ann.status === "published" ? "warning" : "success"}
                    onClick={() => toggleStatus(ann._id)}
                  >
                    {ann.status === "published" ? "Unpublish" : "Publish"}
                  </Button>
                </td>
              </tr>
            ))}
            {announcements.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No announcements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addModalMsg && <div className="alert alert-info">{addModalMsg}</div>}
          <form onSubmit={handleAdd}>
            <div className="mb-2">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label>Message</label>
              <textarea
                name="message"
                className="form-control"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="mt-2">
              Save
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editModalMsg && <div className="alert alert-info">{editModalMsg}</div>}
          <form onSubmit={handleEdit}>
            <div className="mb-2">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label>Message</label>
              <textarea
                name="message"
                className="form-control"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="mt-2">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}

export default ManageAnnouncements;




