import { useEffect, useState } from "react";
import axios from "../../../components/axiosInstance"

function PendingAdmin() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await axios.get("/api/super-admin/pending-admins");
    setAdmins(res.data);
  };

  const handleApprove = async (id) => {
    await axios.put(`/api/super-admin/approve/${id}`);
    alert("Approved!");
    fetchAdmins(); // Refresh
  };

  const handleReject = async (id) => {
    await axios.put(`/api/super-admin/reject/${id}`);
    alert("Rejected!");
    fetchAdmins(); // Refresh
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
              <button className="btn btn-danger" onClick={() => handleReject(admin._id)}>❌ Reject</button>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default PendingAdmin;
