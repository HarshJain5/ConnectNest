import { useState, useEffect } from "react";
import axios from "../../../components/axiosInstance"
import { Modal, Button } from "react-bootstrap";
import AdminLayout from "./AdminLayout";

function ManageResidents() {
  const [residents, setResidents] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [passwordError, setPasswordError] = useState("");


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    flatNumber: "",
    totalFamilyMembers: ""
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

  // Fetch residents
  const fetchResidents = async () => {
    try {
      const res = await axios.get("/api/admin/residents-with-family", authHeader);
      setResidents(res.data || []);
    } catch (err) {
      showTempMessage("❌ Failed to load residents");
    }
  };

  useEffect(() => {
    fetchResidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });

  if (name === "password") {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character"
      );
    } else {
      setPasswordError("");
    }
  }
};


  // Add Resident
  const openAddModal = () => {
    setFormData({ firstName: "", lastName: "", email: "", mobile: "", password: "", flatNumber: "", totalFamilyMembers: "" });
    setAddModalMsg("");
    setShowAdd(true);
  };

  const handleAddResident = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/add-resident", formData, authHeader);
      setAddModalMsg("✅ Resident added");
      setTimeout(() => {
        setShowAdd(false);
        fetchResidents();
        showTempMessage("✅ Resident added");
        setAddModalMsg("");
      }, 900);
    } catch (err) {
      setAddModalMsg(err?.response?.data?.error || "❌ Failed to add resident");
    }
  };

  // Edit Resident
  const openEditModal = (resident) => {
    setSelectedResident(resident);
    setFormData(resident);
    setEditModalMsg("");
    setShowEdit(true);
  };

  const handleEditResident = async (e) => {
    e.preventDefault();
    if (!selectedResident?._id) return;
    try {
      await axios.put(`/api/admin/residents/${selectedResident._id}`, formData, authHeader);
      setShowEdit(false);
      fetchResidents();
      showTempMessage("✏️ Resident updated");
    } catch (err) {
      setEditModalMsg("❌ Failed to update resident");
    }
  };

  // Delete Resident
  const handleDeleteResident = async (id) => {
    if (!window.confirm("Delete this resident?")) return;
    try {
      await axios.delete(`/api/admin/residents/${id}`, authHeader);
      fetchResidents();
      showTempMessage("🗑️ Resident deleted");
    } catch (err) {
      showTempMessage("❌ Failed to delete resident");
    }
  };

  // Details Modal
  const openDetailsModal = (resident) => {
    setSelectedResident(resident);
    setShowDetails(true);
  };

  return (
    <AdminLayout>
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>🏠 Manage Residents</h2>
        <Button onClick={openAddModal}>+ New Resident</Button>
      </div>

{/* 🔹 TOP SUMMARY CARD */}
<div className="row mb-12">
  <div className="col-md-12">
    <div className="card shadow-sm text-center">
      <div className="card-body">
        <h6>Total Residents</h6>
        <h3>{residents.length}</h3>
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
            marginBottom: "12px",
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
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ width: 270 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((res) => (
              <tr key={res._id}>
                <td>{res.flatNumber}</td>
                <td>{res.firstName} {res.lastName}</td>
                <td>{res.email}</td>
                <td>{res.status}</td>
                <td>
                  <Button size="sm" onClick={() => openEditModal(res)} className="me-1">Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteResident(res._id)} className="me-1">Delete</Button>
                  <Button size="sm" variant="info" onClick={() => openDetailsModal(res)}>More Details</Button>
                </td>
              </tr>
            ))}
            {residents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No residents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Resident Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addModalMsg && (
            <div
              style={{
                background: addModalMsg.includes("✅") ? "#d1e7dd" : "#f8d7da",
                color: addModalMsg.includes("✅") ? "#0f5132" : "#842029",
                padding: "8px",
                borderRadius: 5,
                marginBottom: 10
              }}
            >
              {addModalMsg}
            </div>
          )}
          <form onSubmit={handleAddResident}>

  {/* 🔹 Normal fields */}
  {["firstName","lastName","email","mobile","flatNumber","totalFamilyMembers"].map((field) => (
    <div key={field} className="mb-2">
      <label>{field}</label>
      <input
        type="text"
        name={field}
        className="form-control"
        value={formData[field] || ""}
        onChange={handleChange}
        required
      />
    </div>
  ))}

  {/* 🔐 Password Field (SPECIAL) */}
  <div className="mb-2">
    <label>Password</label>
    <input
      type="password"
      name="password"
      className={`form-control ${passwordError ? "is-invalid" : ""}`}
      value={formData.password}
      onChange={handleChange}
      required
    />
    {passwordError && (
      <small className="text-danger">{passwordError}</small>
    )}
  </div>

  <Button type="submit" className="mt-2" disabled={!!passwordError}>
    Save
  </Button>
</form>

        </Modal.Body>
      </Modal>

      {/* Edit Resident Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editModalMsg && <div className="alert alert-info">{editModalMsg}</div>}
          <form onSubmit={handleEditResident}>
            {["firstName","lastName","email","mobile","flatNumber","totalFamilyMembers"].map((field) => (
              <div key={field} className="mb-2">
                <label>{field}</label>
                <input
                  type="text"
                  name={field}
                  className="form-control"
                  value={formData[field] || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <Button type="submit" className="mt-2">Update</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Resident Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResident && (
            <>
              <h5>👤 Resident Info</h5>
              <p><strong>Name:</strong> {selectedResident.firstName} {selectedResident.lastName}</p>
              <p><strong>Email:</strong> {selectedResident.email}</p>
              <p><strong>Mobile:</strong> {selectedResident.mobile}</p>
              <p><strong>Flat Number:</strong> {selectedResident.flatNumber}</p>
              <p><strong>Total Family Members:</strong> {selectedResident.totalFamilyMembers}</p>
              <p><strong>Status:</strong> {selectedResident.status}</p>

              <hr />
              <h5>👨‍👩‍👧 Family Members</h5>
              {selectedResident.family && selectedResident.family.length > 0 ? (
                <table className="table table-sm table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Relation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedResident.family.map((f) => (
                      <tr key={f._id}>
                        <td>{f.name}</td>
                        <td>{f.age}</td>
                        <td>{f.gender}</td>
                        <td>{f.relation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No family members added.</p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}

export default ManageResidents;
