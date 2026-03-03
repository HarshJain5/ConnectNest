import { useEffect, useState } from "react";
import axios from "../../../components/axiosInstance"

function PendingAdmin() {
  const [admins, setAdmins] = useState([]);

  const [rejectModal, setRejectModal] = useState({
  show: false,
  id: null,
  reason: ""
});

const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success"
});

useEffect(() => {
  if (toast.show) {
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [toast.show]);

  const fetchAdmins = async () => {
    const res = await axios.get("/api/super-admin/pending-admins");
    setAdmins(res.data);
  };

  const handleApprove = async (id) => {
    await axios.put(`/api/super-admin/approve/${id}`);
    setToast({
  show: true,
  message: "Admin approved successfully!",
  type: "success"
});
    fetchAdmins(); // Refresh
  };

  const handleReject = async () => {
  if (!rejectModal.reason.trim()) {
    setToast({
      show: true,
      message: "Please provide rejection reason!",
      type: "danger"
    });
    return;
  }

  await axios.put(`/api/super-admin/reject/${rejectModal.id}`, {
    reason: rejectModal.reason
  });

  setToast({
    show: true,
    message: "Admin rejected successfully!",
    type: "danger"
  });

  setRejectModal({ show: false, id: null, reason: "" });
  fetchAdmins();
};

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
  <div className="container mt-5">
    <div className="text-center mb-4">
      <h2 className="fw-bold">Pending Admin Approvals</h2>
      <hr />
    </div>

    {admins.length === 0 ? (
      <div className="alert alert-info text-center">No pending admin requests.</div>
    ) : (
      admins.map((admin, idx) => (
        <div key={idx} className="card mb-4 shadow-sm">
          <div className="card-header bg-light">
            <h5 className="mb-0">
              {admin.firstName} {admin.lastName} <span className="text-muted">({admin.email})</span>
            </h5>
          </div>
          <div className="card-body">
            <p><strong>Mobile:</strong> {admin.mobile}</p>
            <p><strong>Community:</strong> {admin.communityId.name} ({admin.communityId.communityCode})</p>
            <p><strong>Type:</strong> {admin.communityId.type}</p>
            <p><strong>Unit:</strong> {admin.communityId.unit}</p>
            <p><strong>Address:</strong> {admin.communityId.address}, {admin.communityId.city}, {admin.communityId.state} - {admin.communityId.pincode}</p>
            <div className="d-flex gap-3">
              <button className="btn btn-success" onClick={() => handleApprove(admin._id)}>✅ Approve</button>
              <button className="btn btn-danger" onClick={() =>
  setRejectModal({ show: true, id: admin._id, reason: "" })
}>❌ Reject</button>
            </div>
          </div>
        </div>
      ))
    )}
    {rejectModal.show && (
  <div
    className="modal fade show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-danger">Reject Admin</h5>
        </div>
        <div className="modal-body">
          <label className="form-label">Reason for rejection</label>
          <textarea
            className="form-control"
            rows="3"
            value={rejectModal.reason}
            onChange={(e) =>
              setRejectModal({ ...rejectModal, reason: e.target.value })
            }
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() =>
              setRejectModal({ show: false, id: null, reason: "" })
            }
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleReject()}
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{toast.show && (
  <div
    className="toast show position-fixed top-0 end-0 m-4 shadow"
    role="alert"
    style={{ zIndex: 9999, minWidth: "280px" }}
  >
    <div className={`toast-header bg-${toast.type} text-white`}>
      <strong className="me-auto">
        {toast.type === "success" ? "Success" : "Action Completed"}
      </strong>
      <button
        type="button"
        className="btn-close btn-close-white"
        onClick={() => setToast({ ...toast, show: false })}
      ></button>
    </div>
    <div className="toast-body">
      {toast.message}
    </div>
  </div>
)}
  </div>
);
}

export default PendingAdmin;
