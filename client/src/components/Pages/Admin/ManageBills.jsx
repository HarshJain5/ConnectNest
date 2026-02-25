import { useEffect, useState } from "react";
import axios from "../../../components/axiosInstance"
import { Modal, Button } from "react-bootstrap";
import AdminLayout from "./AdminLayout";

function ManageBills() {
  const [bills, setBills] = useState([]);
  const [residents, setResidents] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  // ✅ stats
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
  });

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [formData, setFormData] = useState({
    residentId: "",
    month: "",
    year: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });

  const [pageMsg, setPageMsg] = useState("");
  const [addModalMsg, setAddModalMsg] = useState("");
  const [editModalMsg, setEditModalMsg] = useState("");

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const showTempMessage = (msg, ms = 2200) => {
    setPageMsg(msg);
    setTimeout(() => setPageMsg(""), ms);
  };

  // ✅ same API → list + stats
  const fetchBills = async () => {
    try {
      const res = await axios.get("/api/admin/maintenance/bills", authHeader);
      const data = res.data || [];

      setBills(data);

      const total = data.length;
      const paid = data.filter(b => b.status === "Paid").length;
      const pending = data.filter(b => b.status === "Pending").length;

      setStats({ total, paid, pending });
    } catch (err) {
      showTempMessage("❌ Failed to load bills");
    }
  };

  const fetchResidents = async () => {
    try {
      const res = await axios.get("/api/admin/residents", authHeader);
      setResidents(res.data || []);
    } catch (err) {
      showTempMessage("❌ Failed to load residents");
    }
  };

  useEffect(() => {
    fetchBills();
    fetchResidents();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add
  const openAddModal = () => {
    setFormData({
      residentId: "",
      month: "",
      year: "",
      amount: "",
      dueDate: "",
      status: "Pending",
    });
    setAddModalMsg("");
    setShowAdd(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/maintenance/create", formData, authHeader);
      setAddModalMsg("✅ Bill created");
      setTimeout(() => {
        setShowAdd(false);
        fetchBills();
        showTempMessage("✅ Bill created");
      }, 900);
    } catch (err) {
      setAddModalMsg("❌ Failed to create bill");
    }
  };

  // Edit
  const openEditModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      dueDate: bill.dueDate.substring(0, 10),
      status: bill.status,
    });
    setEditModalMsg("");
    setShowEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!selectedBill?._id) return;
    try {
      await axios.put(
        `/api/admin/maintenance/bills/${selectedBill._id}`,
        formData,
        authHeader
      );
      setEditModalMsg("✏️ Updated");
      setTimeout(() => {
        setShowEdit(false);
        fetchBills();
        showTempMessage("✏️ Bill updated");
      }, 900);
    } catch (err) {
      setEditModalMsg("❌ Failed to update bill");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bill?")) return;
    try {
      await axios.delete(`/api/admin/maintenance/bills/${id}`, authHeader);
      fetchBills();
      showTempMessage("🗑️ Deleted");
    } catch (err) {
      showTempMessage("❌ Failed to delete bill");
    }
  };

  // Mark as Paid
  const markAsPaid = async (id) => {
    try {
      await axios.put(`/api/admin/maintenance/bills/${id}/pay`, {}, authHeader);
      fetchBills();
      showTempMessage("✅ Marked as paid");
    } catch (err) {
      showTempMessage("❌ Failed to mark as paid");
    }
  };

  return (
    <AdminLayout>
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>💰 Manage Maintenance Bills</h2>
        <Button onClick={openAddModal}>+ New Bill</Button>
      </div>

      {/* ✅ TOP STATS */}
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6>Total Bills</h6>
              <h3>{stats.total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm text-center border-success">
            <div className="card-body">
              <h6 className="text-success">Paid</h6>
              <h3 className="text-success">{stats.paid}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm text-center border-danger">
            <div className="card-body">
              <h6 className="text-danger">Pending</h6>
              <h3 className="text-danger">{stats.pending}</h3>
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
              <th>Flat No.</th>
              <th>Resident</th>
              <th>Month</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Paid On</th>
              <th style={{ width: 270 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.flatNumber}</td>
                <td>{bill.residentId?.firstName} {bill.residentId?.lastName}</td>
                <td>{bill.month}</td>
                <td>{bill.year}</td>
                <td>₹{bill.amount}</td>
                <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${bill.status === "Paid" ? "bg-success" : "bg-danger"}`}>
                    {bill.status}
                  </span>
                </td>
                <td>{bill.paidAt ? new Date(bill.paidAt).toLocaleDateString() : "--"}</td>
                <td>
                  {bill.status === "Pending" && (
                    <Button size="sm" variant="success" onClick={() => markAsPaid(bill._id)} className="me-1">
                      Mark Paid
                    </Button>
                  )}
                  <Button size="sm" variant="warning" onClick={() => openEditModal(bill)} className="me-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(bill._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">No bills yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Maintenance Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addModalMsg && <div className="alert alert-info">{addModalMsg}</div>}
          <form onSubmit={handleAdd} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Resident</label>
              <select name="residentId" className="form-select" value={formData.residentId} onChange={handleChange} required>
                <option value="">Select Resident</option>
                {residents.map((res) => (
                  <option key={res._id} value={res._id}>{res.firstName} {res.lastName} ({res.flatNumber})</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Month</label>
              <input type="text" name="month" className="form-control" value={formData.month} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Year</label>
              <input type="number" name="year" className="form-control" value={formData.year} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Amount</label>
              <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input type="date" name="dueDate" className="form-control" value={formData.dueDate} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <Button type="submit" className="mt-2">Save</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editModalMsg && <div className="alert alert-info">{editModalMsg}</div>}
          {selectedBill && (
            <form onSubmit={handleEdit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Amount</label>
                <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Due Date</label>
                <input type="date" name="dueDate" className="form-control" value={formData.dueDate} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="col-12">
                <Button type="submit" className="mt-2">Update</Button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}

export default ManageBills;



