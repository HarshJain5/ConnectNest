import { useEffect, useState, useContext, useRef } from "react";
import axios from "../../../components/axiosInstance";
import { Modal, Button, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Contextapi } from "../../../contextapi/Contextapi";
import ResidentLayout from "./ResidentLayout";
import { FaEdit, FaPlus, FaCamera, FaCheckCircle, FaTimesCircle, FaSignOutAlt } from "react-icons/fa";

function ResidentProfile() {
  const navigate = useNavigate();
  const { clearAuthData } = useContext(Contextapi);
  const fileInputRef = useRef();

  const [profile, setProfile] = useState(null);
  const [family, setFamily] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    gender: "",
    relation: "",
  });

  const [editMember, setEditMember] = useState(null);
  const [editProfile, setEditProfile] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditFamilyModal, setShowEditFamilyModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  const showMessage = (msg, type = "success") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
  };

  const communityName = localStorage.getItem("communityName");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/resident/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProfile(res.data.profile);
      setFamily(res.data.family);
      setProfileImage(res.data.profile.profileImage);
    } catch {
      showMessage("Error fetching profile", "error");
    }
  };

  /* ================= PROFILE IMAGE UPLOAD ================= */

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.put(
        "/api/resident/profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileImage(res.data.image);
      showMessage("Profile image updated successfully", "success");
    } catch {
      showMessage("Failed to update profile image", "error");
    }
  };

  /* ================= FAMILY FUNCTIONS ================= */

  const handleAddFamily = async () => {
    try {
      const res = await axios.post(
        "/api/resident/family-member",
        newMember,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setFamily([...family, res.data.fam]);
      setNewMember({ name: "", age: "", gender: "", relation: "" });
      setShowAddModal(false);
      showMessage("Family member added successfully", "success");
    } catch {
      showMessage("Failed to add family member", "error");
    }
  };

  const handleUpdateFamily = async () => {
    try {
      const res = await axios.put(
        `/api/resident/family-member/${editMember._id}`,
        editMember,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setFamily(
        family.map((f) => (f._id === editMember._id ? res.data.fam : f))
      );
      setEditMember(null);
      setShowEditFamilyModal(false);
      showMessage("Family member updated", "success");
    } catch {
      showMessage("Failed to update family member", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resident/family-member/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFamily(family.filter((f) => f._id !== id));
      showMessage("Family member deleted", "success");
    } catch {
      showMessage("Failed to delete family member", "error");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        "/api/resident/profile",
        editProfile,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setProfile(res.data.user);
      setEditProfile(null);
      setShowProfileModal(false);
      showMessage("Profile updated successfully", "success");
    } catch {
      showMessage("Failed to update profile", "error");
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate("/resident-login");
  };

  return (
    <ResidentLayout>
      <div className="container py-4">

        {/* Toast */}
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg={toastType === "success" ? "success" : "danger"}
          >
            <Toast.Body className="text-white d-flex align-items-center gap-2">
              {toastType === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
              {toastMsg}
            </Toast.Body>
          </Toast>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="card shadow-lg border-0 mb-4">
            <div
  style={{
    height: "180px",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
    padding: "10px"
  }}
>
  <h3 className="fw-bold mb-1">ConnectNest</h3>
  <p className="mb-0" style={{ fontSize: "14px" }}>
    A smarter way to live together
  </p>
</div>

            <div className="text-center" style={{ marginTop: "-60px" }}>

              {/* Image with camera */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
  src={
    profileImage
      ? profileImage
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
  onError={(e) =>
    (e.target.src =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png")
  }

                  alt="profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "5px solid white",
                    objectFit: "cover",
                  }}
                />

                <div
                  onClick={handleImageClick}
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    background: "#0d6efd",
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <FaCamera size={14} />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <h4 className="mt-3 fw-bold">
                {profile.firstName} {profile.lastName}
              </h4>

              <p className="text-muted">
                Flat {profile.flatNumber} • {communityName}
              </p>

              <div className="d-flex justify-content-center gap-2">
                <Button
                  variant="light"
                  onClick={() => {
                    setEditProfile(profile);
                    setShowProfileModal(true);
                  }}
                >
                  <FaEdit /> Edit Profile
                </Button>

                <Button variant="danger" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Button>
                
              </div>
              <div className="row mt-4 px-3 g-3 text-center">

  <div className="col-6 col-md-3">
    <div className="bg-light rounded p-3 shadow-sm h-100">
      <h6 className="fw-bold mb-1">{family.length}</h6>
      <small className="text-muted">Family Members</small>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="bg-light rounded p-3 shadow-sm h-100">
      <h6 className="fw-bold mb-1">{profile.mobile}</h6>
      <small className="text-muted">Mobile</small>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="bg-light rounded p-3 shadow-sm h-100">
      <h6 className="fw-bold mb-1">{profile.email}</h6>
      <small className="text-muted">Email</small>
    </div>
  </div>

  <div className="col-6 col-md-3">
    <div className="bg-light rounded p-3 shadow-sm h-100">
      <h6 className="fw-bold mb-1 text-truncate">{communityName}</h6>
      <small className="text-muted">Community</small>
    </div>
  </div>

</div>
            </div>
          </div>
          
        )}
        {/* Stats */}
            

        {/* ===== Family Section ===== */}
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>👨‍👩‍👧 Family Members</h5>
              <Button onClick={() => setShowAddModal(true)}>
                <FaPlus /> Add Member
              </Button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Relation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {family.map((f) => (
                    <tr key={f._id}>
                      <td>{f.name}</td>
                      <td>{f.age}</td>
                      <td>{f.gender}</td>
                      <td>{f.relation}</td>
                      <td>
                        <Button size="sm" variant="warning" className="me-2"
                          onClick={() => {
                            setEditMember(f);
                            setShowEditFamilyModal(true);
                          }}>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger"
                          onClick={() => handleDelete(f._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* ===== All Modals SAME (Not Removed) ===== */}
        {/* Add Modal */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Family Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input className="form-control mb-2" placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
            <input className="form-control mb-2" type="number" placeholder="Age"
              value={newMember.age}
              onChange={(e) => setNewMember({ ...newMember, age: e.target.value })} />
            <select className="form-control mb-2"
              value={newMember.gender}
              onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input className="form-control mb-2" placeholder="Relation"
              value={newMember.relation}
              onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddFamily}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Family Modal */}
        <Modal show={showEditFamilyModal} onHide={() => setShowEditFamilyModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Family Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editMember && (
              <>
                <input className="form-control mb-2"
                  value={editMember.name}
                  onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} />
                <input className="form-control mb-2" type="number"
                  value={editMember.age}
                  onChange={(e) => setEditMember({ ...editMember, age: e.target.value })} />
                <select className="form-control mb-2"
                  value={editMember.gender}
                  onChange={(e) => setEditMember({ ...editMember, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input className="form-control mb-2"
                  value={editMember.relation}
                  onChange={(e) => setEditMember({ ...editMember, relation: e.target.value })} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateFamily}>Update</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editProfile && (
              <>
                <input className="form-control mb-2"
                  value={editProfile.firstName}
                  onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })} />
                <input className="form-control mb-2"
                  value={editProfile.lastName}
                  onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })} />
                <input className="form-control mb-2"
                  value={editProfile.mobile}
                  onChange={(e) => setEditProfile({ ...editProfile, mobile: e.target.value })} />
                <input className="form-control mb-2"
                  value={editProfile.flatNumber}
                  onChange={(e) => setEditProfile({ ...editProfile, flatNumber: e.target.value })} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </Modal.Footer>
        </Modal>

      </div>
    </ResidentLayout>
  );
}

export default ResidentProfile;



