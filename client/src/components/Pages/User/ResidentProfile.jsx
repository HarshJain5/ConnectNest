// import { useEffect, useState, useContext } from "react";
// import axios from "../../../components/axiosInstance"
// import { Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import ResidentLayout from "./ResidentLayout";

// function ResidentProfile() {
//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);
//   const [profile, setProfile] = useState(null);
//   const [family, setFamily] = useState([]);
//   const [newMember, setNewMember] = useState({ name: "", age: "", gender: "", relation: "" });
//   const [editMember, setEditMember] = useState(null);
//   const [editProfile, setEditProfile] = useState(null);

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditFamilyModal, setShowEditFamilyModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("/api/resident/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProfile(res.data.profile);
//       setFamily(res.data.family);
//     } catch (err) {
//       console.error("Error fetching profile", err);
//     }
//   };

//   // Add family
//   const handleAddFamily = async () => {
//     try {
//       const res = await axios.post("/api/resident/family-member", newMember, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily([...family, res.data.fam]);
//       setNewMember({ name: "", age: "", gender: "", relation: "" });
//       setShowAddModal(false);
//     } catch {
//       alert("Failed to add family member");
//     }
//   };

//   // Update family
//   const handleUpdateFamily = async () => {
//     try {
//       const res = await axios.put(`/api/resident/family-member/${editMember._id}`, editMember, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily(family.map((f) => (f._id === editMember._id ? res.data.fam : f)));
//       setEditMember(null);
//       setShowEditFamilyModal(false);
//     } catch {
//       alert("Failed to update family member");
//     }
//   };

//   // Delete family
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/family-member/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily(family.filter((f) => f._id !== id));
//     } catch {
//       alert("Failed to delete family member");
//     }
//   };

//   // Update profile
//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put("/api/resident/profile", editProfile, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProfile(res.data.user);
//       setEditProfile(null);
//       setShowProfileModal(false);
//     } catch {
//       alert("Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };

//   return (
//     <>
//     <div className="dashboard-page">
//       <style>
//         {`
//           body {
//             font-family: 'Poppins', sans-serif;
//             background-color: #f4f7f9;
//             color: #2C3E50;
//           }
//           .dashboard-page {
//             display: flex;
//             min-height: 100vh;
//             background-color: #2C3E50;
//           }
//           .main-content {
//             flex-grow: 1;
//             background-color: #f4f7f9;
//             padding: 2rem;
//             border-top-left-radius: 2rem;
//             border-bottom-left-radius: 2rem;
//           }
//           .header-bar {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 2rem;
//           }
//           .header-bar .btn-logout {
//             background-color: #E74C3C;
//             color: white;
//             border: none;
//             padding: 0.5rem 1.5rem;
//             border-radius: 9999px;
//             font-weight: 600;
//             transition: background-color 0.3s ease;
//           }
//           .header-bar .btn-logout:hover {
//             background-color: #C0392B;
//           }
//           .card-box {
//             background-color: #ffffff;
//             border: 1px solid #e5e7eb;
//             border-radius: 1rem;
//             padding: 1.5rem;
//             margin-bottom: 1rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
//           }
//           table {
//             background: #fff;
//             border-radius: 1rem;
//             overflow: hidden;
//             box-shadow: 0 4px 6px rgba(0,0,0,0.05);
//           }
//           table th {
//             background: #2C3E50;
//             color: #fff;
//           }
//           @media (max-width: 768px) {
//             .dashboard-page {
//               flex-direction: column;
//             }
//             .main-content {
//               border-radius: 0;
//             }
//           }
//         `}
//       </style>

//       <div className="main-content">
//         <div className="header-bar">
//           <h2>👤 Resident Profile</h2>
//           <button className="btn-logout" onClick={handleLogout}>Logout</button>
//         </div>

//         {/* Profile Info */}
//         {profile && (
//           <div className="card-box">
//             <h4 className="mb-3">Personal Details</h4>
//             <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
//             <p><strong>Email:</strong> {profile.email}</p>
//             <p><strong>Mobile:</strong> {profile.mobile}</p>
//             <p><strong>Flat:</strong> {profile.flatNumber}</p>
//             <p><strong>Community:</strong> {profile.communityId?.name}</p>
//             <Button
//               variant="warning"
//               onClick={() => {
//                 setEditProfile({
//                   firstName: profile.firstName,
//                   lastName: profile.lastName,
//                   mobile: profile.mobile,
//                   flatNumber: profile.flatNumber,
//                 });
//                 setShowProfileModal(true);
//               }}
//             >
//               ✏️ Edit Profile
//             </Button>
//           </div>
//         )}

//         {/* Family Members */}
//         <div className="card-box">
//           <h4 className="mb-3">👨‍👩‍👧 Family Members</h4>
//           <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
//             ➕ Add Family Member
//           </Button>

//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Name</th><th>Age</th><th>Gender</th><th>Relation</th><th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {family.map((f) => (
//                 <tr key={f._id}>
//                   <td>{f.name}</td>
//                   <td>{f.age}</td>
//                   <td>{f.gender}</td>
//                   <td>{f.relation}</td>
//                   <td>
//                     <Button
//                       size="sm"
//                       variant="warning"
//                       className="me-2"
//                       onClick={() => {
//                         setEditMember(f);
//                         setShowEditFamilyModal(true);
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Modals (same as your original) */}
//         {/* Add Family Modal */}
//         <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <input className="form-control mb-2" placeholder="Name"
//               value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
//             <input className="form-control mb-2" placeholder="Age" type="number"
//               value={newMember.age} onChange={(e) => setNewMember({ ...newMember, age: e.target.value })} />
//             <select className="form-control mb-2"
//               value={newMember.gender} onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//             <input className="form-control mb-2" placeholder="Relation"
//               value={newMember.relation} onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleAddFamily}>Save</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Family Modal */}
//         <Modal show={showEditFamilyModal} onHide={() => setShowEditFamilyModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editMember && (
//               <>
//                 <input className="form-control mb-2" placeholder="Name"
//                   value={editMember.name} onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} />
//                 <input className="form-control mb-2" placeholder="Age" type="number"
//                   value={editMember.age} onChange={(e) => setEditMember({ ...editMember, age: e.target.value })} />
//                 <select className="form-control mb-2"
//                   value={editMember.gender} onChange={(e) => setEditMember({ ...editMember, gender: e.target.value })}>
//                   <option value="">Select Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//                 <input className="form-control mb-2" placeholder="Relation"
//                   value={editMember.relation} onChange={(e) => setEditMember({ ...editMember, relation: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateFamily}>Update</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Profile Modal */}
//         <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editProfile && (
//               <>
//                 <input className="form-control mb-2" placeholder="First Name"
//                   value={editProfile.firstName} onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })} />
//                 <input className="form-control mb-2" placeholder="Last Name"
//                   value={editProfile.lastName} onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })} />
//                 <input className="form-control mb-2" placeholder="Mobile"
//                   value={editProfile.mobile}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     if (/^\d{0,10}$/.test(val)) {
//                       setEditProfile({ ...editProfile, mobile: val });
//                     }
//                   }} />
//                 <input className="form-control mb-2" placeholder="Flat Number"
//                   value={editProfile.flatNumber} onChange={(e) => setEditProfile({ ...editProfile, flatNumber: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateProfile}>Update Profile</Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//     </>
//   );
// }

// export default ResidentProfile;

// import { useEffect, useState, useContext } from "react";
// import axios from "../../../components/axiosInstance";
// import { Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import ResidentLayout from "./ResidentLayout";

// function ResidentProfile() {
//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);

//   const [profile, setProfile] = useState(null);
//   const [family, setFamily] = useState([]);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     relation: "",
//   });

//   const [editMember, setEditMember] = useState(null);
//   const [editProfile, setEditProfile] = useState(null);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditFamilyModal, setShowEditFamilyModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);

  
//   const residentName = localStorage.getItem("residentName");
//   const communityName = localStorage.getItem("communityName");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("/api/resident/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProfile(res.data.profile);
//       setFamily(res.data.family);
//     } catch (err) {
//       console.error("Error fetching profile", err);
//     }
//   };

//   const handleAddFamily = async () => {
//     try {
//       const res = await axios.post(
//         "/api/resident/family-member",
//         newMember,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setFamily([...family, res.data.fam]);
//       setNewMember({ name: "", age: "", gender: "", relation: "" });
//       setShowAddModal(false);
//     } catch {
//       alert("Failed to add family member");
//     }
//   };

//   const handleUpdateFamily = async () => {
//     try {
//       const res = await axios.put(
//         `/api/resident/family-member/${editMember._id}`,
//         editMember,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setFamily(
//         family.map((f) => (f._id === editMember._id ? res.data.fam : f))
//       );
//       setEditMember(null);
//       setShowEditFamilyModal(false);
//     } catch {
//       alert("Failed to update family member");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/family-member/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily(family.filter((f) => f._id !== id));
//     } catch {
//       alert("Failed to delete family member");
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put(
//         "/api/resident/profile",
//         editProfile,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setProfile(res.data.user);
//       setEditProfile(null);
//       setShowProfileModal(false);
//     } catch {
//       alert("Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };

//   return (
//     <ResidentLayout>
//       <div className="container-fluid py-4">
//         <div className="page-header">
//   <h4>Welcome Resident, {residentName}</h4>
//   <p style={{ marginTop: "6px", color: "#777" }}>
//     Community: {communityName}
//   </p>
// </div>

//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold">👤 Resident Profile</h3>
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {/* Profile Card */}
//         {profile && (
//           <div className="card shadow-sm mb-4">
//             <div className="card-body">
//               <h5 className="mb-3">Personal Details</h5>
//               <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
//               <p><strong>Email:</strong> {profile.email}</p>
//               <p><strong>Mobile:</strong> {profile.mobile}</p>
//               <p><strong>Flat:</strong> {profile.flatNumber}</p>
//               <p><strong>Community:</strong> {profile.communityId?.name}</p>

//               <Button
//                 variant="warning"
//                 onClick={() => {
//                   setEditProfile({
//                     firstName: profile.firstName,
//                     lastName: profile.lastName,
//                     mobile: profile.mobile,
//                     flatNumber: profile.flatNumber,
//                   });
//                   setShowProfileModal(true);
//                 }}
//               >
//                 ✏️ Edit Profile
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Family Members */}
//         <div className="card shadow-sm">
//           <div className="card-body">
//             <h5 className="mb-3">👨‍👩‍👧 Family Members</h5>

//             <Button
//               variant="primary"
//               className="mb-3"
//               onClick={() => setShowAddModal(true)}
//             >
//               ➕ Add Family Member
//             </Button>

//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Gender</th>
//                     <th>Relation</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {family.map((f) => (
//                     <tr key={f._id}>
//                       <td>{f.name}</td>
//                       <td>{f.age}</td>
//                       <td>{f.gender}</td>
//                       <td>{f.relation}</td>
//                       <td>
//                         <Button
//                           size="sm"
//                           variant="warning"
//                           className="me-2"
//                           onClick={() => {
//                             setEditMember(f);
//                             setShowEditFamilyModal(true);
//                           }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => handleDelete(f._id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>

//         {/* ===== MODALS SAME AS BEFORE ===== */}

//         <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <input className="form-control mb-2" placeholder="Name"
//               value={newMember.name}
//               onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />

//             <input className="form-control mb-2" placeholder="Age" type="number"
//               value={newMember.age}
//               onChange={(e) => setNewMember({ ...newMember, age: e.target.value })} />

//             <select className="form-control mb-2"
//               value={newMember.gender}
//               onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>

//             <input className="form-control mb-2" placeholder="Relation"
//               value={newMember.relation}
//               onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleAddFamily}>Save</Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showEditFamilyModal} onHide={() => setShowEditFamilyModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editMember && (
//               <>
//                 <input className="form-control mb-2"
//                   value={editMember.name}
//                   onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} />

//                 <input className="form-control mb-2" type="number"
//                   value={editMember.age}
//                   onChange={(e) => setEditMember({ ...editMember, age: e.target.value })} />

//                 <select className="form-control mb-2"
//                   value={editMember.gender}
//                   onChange={(e) => setEditMember({ ...editMember, gender: e.target.value })}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>

//                 <input className="form-control mb-2"
//                   value={editMember.relation}
//                   onChange={(e) => setEditMember({ ...editMember, relation: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateFamily}>Update</Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editProfile && (
//               <>
//                 <input className="form-control mb-2"
//                   value={editProfile.firstName}
//                   onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })} />

//                 <input className="form-control mb-2"
//                   value={editProfile.lastName}
//                   onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })} />

//                 <input className="form-control mb-2"
//                   value={editProfile.mobile}
//                   onChange={(e) => {
//                     const val = e.target.value;
//                     if (/^\d{0,10}$/.test(val)) {
//                       setEditProfile({ ...editProfile, mobile: val });
//                     }
//                   }} />

//                 <input className="form-control mb-2"
//                   value={editProfile.flatNumber}
//                   onChange={(e) => setEditProfile({ ...editProfile, flatNumber: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateProfile}>Update Profile</Button>
//           </Modal.Footer>
//         </Modal>

//       </div>
//     </ResidentLayout>
//   );
// }

// export default ResidentProfile;

// import { useEffect, useState, useContext } from "react";
// import axios from "../../../components/axiosInstance";
// import { Modal, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import ResidentLayout from "./ResidentLayout";

// function ResidentProfile() {
//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);

//   const [profile, setProfile] = useState(null);
//   const [family, setFamily] = useState([]);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     relation: "",
//   });

//   const [editMember, setEditMember] = useState(null);
//   const [editProfile, setEditProfile] = useState(null);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditFamilyModal, setShowEditFamilyModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);


//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("/api/resident/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProfile(res.data.profile);
//       setFamily(res.data.family);
//     } catch (err) {
//       console.error("Error fetching profile", err);
//     }
//   };

//   const handleAddFamily = async () => {
//     try {
//       const res = await axios.post(
//         "/api/resident/family-member",
//         newMember,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setFamily([...family, res.data.fam]);
//       setNewMember({ name: "", age: "", gender: "", relation: "" });
//       setShowAddModal(false);
//     } catch {
//       alert("Failed to add family member");
//     }
//   };

//   const handleUpdateFamily = async () => {
//     try {
//       const res = await axios.put(
//         `/api/resident/family-member/${editMember._id}`,
//         editMember,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setFamily(
//         family.map((f) => (f._id === editMember._id ? res.data.fam : f))
//       );
//       setEditMember(null);
//       setShowEditFamilyModal(false);
//     } catch {
//       alert("Failed to update family member");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/family-member/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily(family.filter((f) => f._id !== id));
//     } catch {
//       alert("Failed to delete family member");
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put(
//         "/api/resident/profile",
//         editProfile,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setProfile(res.data.user);
//       setEditProfile(null);
//       setShowProfileModal(false);
//     } catch {
//       alert("Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };



//   // ================= IMAGE UPLOAD =================
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.put(
//         "/api/resident/profile-image",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setProfile(res.data.user);
//       alert("Image Updated Successfully");
//     } catch (err) {
//       alert("Image Upload Failed");
//     }
//   };

//   if (!profile) return null;

//   return (
//     <ResidentLayout>
//       <style>{`
//         .profile-banner {
//           height: 150px;
//           background: linear-gradient(135deg,#2C3E50,#4CA1AF);
//           border-radius: 20px 20px 0 0;
//         }

//         .profile-card {
//           background: #fff;
//           border-radius: 0 0 20px 20px;
//           margin-top: -70px;
//           padding: 30px;
//           text-align: center;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.08);
//         }

//         .profile-image {
//           width: 130px;
//           height: 130px;
//           border-radius: 50%;
//           border: 6px solid #fff;
//           object-fit: cover;
//         }

//         .stat-box {
//           word-break: break-word;
//         }

//         @media(max-width:768px){
//           .profile-card{
//             padding:20px;
//           }
//         }
//       `}</style>

//       <div className="container py-4">

//         <div className="d-flex justify-content-between mb-4">
//           <h3>👤 Resident Profile</h3>
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         <div className="profile-banner"></div>

//         <div className="profile-card mb-5">

//           <div>
//             <img
//               src={
//                 profile.profileImage
//                   ? profile.profileImage
//                   : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               alt="Profile"
//               className="profile-image"
//             />
//             <br />
//             <input type="file" onChange={handleImageUpload} />
//           </div>

//           <h4 className="mt-3">
//             {profile.firstName} {profile.lastName}
//           </h4>

//           <p className="text-muted">Flat {profile.flatNumber}</p>

//           {/* FIXED MOBILE OVERLAP */}
//           <div className="row text-center mt-4">
//             <div className="col-6 col-md-3 mb-3 stat-box">
//               <h6>Family</h6>
//               <div>{family.length}</div>
//             </div>

//             <div className="col-6 col-md-3 mb-3 stat-box">
//               <h6>Mobile</h6>
//               <div>{profile.mobile}</div>
//             </div>

//             <div className="col-6 col-md-3 mb-3 stat-box">
//               <h6>Email</h6>
//               <div>{profile.email}</div>
//             </div>

//             <div className="col-6 col-md-3 mb-3 stat-box">
//               <h6>Community</h6>
//               <div>{profile.communityId?.name}</div>
//             </div>
//           </div>

//           <Button
//             variant="warning"
//             onClick={() => {
//               setEditProfile({
//                 firstName: profile.firstName,
//                 lastName: profile.lastName,
//                 mobile: profile.mobile,
//                 flatNumber: profile.flatNumber,
//               });
//               setShowProfileModal(true);
//             }}
//           >
//             Edit Profile
//           </Button>
//         </div>

//         {/* FAMILY SECTION */}
//         <div className="card shadow-sm">
//           <div className="card-body">
//             <h5 className="mb-3">👨‍👩‍👧 Family Members</h5>

//             <Button
//               variant="primary"
//               className="mb-3"
//               onClick={() => setShowAddModal(true)}
//             >
//               ➕ Add Family Member
//             </Button>

//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Gender</th>
//                     <th>Relation</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {family.map((f) => (
//                     <tr key={f._id}>
//                       <td>{f.name}</td>
//                       <td>{f.age}</td>
//                       <td>{f.gender}</td>
//                       <td>{f.relation}</td>
//                       <td>
//                         <Button
//                           size="sm"
//                           variant="warning"
//                           className="me-2"
//                           onClick={() => {
//                             setEditMember(f);
//                             setShowEditFamilyModal(true);
//                           }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => handleDelete(f._id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>

//         {/* PROFILE EDIT MODAL */}
//         <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Control
//               className="mb-2"
//               placeholder="First Name"
//               value={editProfile?.firstName}
//               onChange={(e) =>
//                 setEditProfile({ ...editProfile, firstName: e.target.value })
//               }
//             />
//             <Form.Control
//               className="mb-2"
//               placeholder="Last Name"
//               value={editProfile?.lastName}
//               onChange={(e) =>
//                 setEditProfile({ ...editProfile, lastName: e.target.value })
//               }
//             />
//             <Form.Control
//               className="mb-2"
//               placeholder="Mobile"
//               value={editProfile?.mobile}
//               onChange={(e) =>
//                 setEditProfile({ ...editProfile, mobile: e.target.value })
//               }
//             />
//             <Form.Control
//               placeholder="Flat Number"
//               value={editProfile?.flatNumber}
//               onChange={(e) =>
//                 setEditProfile({ ...editProfile, flatNumber: e.target.value })
//               }
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleUpdateProfile}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <input className="form-control mb-2" placeholder="Name"
//               value={newMember.name}
//               onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />

//             <input className="form-control mb-2" placeholder="Age" type="number"
//               value={newMember.age}
//               onChange={(e) => setNewMember({ ...newMember, age: e.target.value })} />

//             <select className="form-control mb-2"
//               value={newMember.gender}
//               onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>

//             <input className="form-control mb-2" placeholder="Relation"
//               value={newMember.relation}
//               onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleAddFamily}>Save</Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showEditFamilyModal} onHide={() => setShowEditFamilyModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editMember && (
//               <>
//                 <input className="form-control mb-2"
//                   value={editMember.name}
//                   onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} />

//                 <input className="form-control mb-2" type="number"
//                   value={editMember.age}
//                   onChange={(e) => setEditMember({ ...editMember, age: e.target.value })} />

//                 <select className="form-control mb-2"
//                   value={editMember.gender}
//                   onChange={(e) => setEditMember({ ...editMember, gender: e.target.value })}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>

//                 <input className="form-control mb-2"
//                   value={editMember.relation}
//                   onChange={(e) => setEditMember({ ...editMember, relation: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateFamily}>Update</Button>
//           </Modal.Footer>
//         </Modal>

        

//       </div>
//     </ResidentLayout>
//   );
// }

// export default ResidentProfile;

// import { useEffect, useState, useContext } from "react";
// import axios from "../../../components/axiosInstance";
// import { Modal, Button, Toast } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import ResidentLayout from "./ResidentLayout";
// import { FaEdit, FaPlus } from "react-icons/fa";

// function ResidentProfile() {
//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);

//   const [profile, setProfile] = useState(null);
//   const [family, setFamily] = useState([]);
//   const [newMember, setNewMember] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     relation: "",
//   });

//   const [editMember, setEditMember] = useState(null);
//   const [editProfile, setEditProfile] = useState(null);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditFamilyModal, setShowEditFamilyModal] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   const [toastMsg, setToastMsg] = useState("");
//   const [showToast, setShowToast] = useState(false);

//   const showMessage = (msg) => {
//     setToastMsg(msg);
//     setShowToast(true);
//   };

//   const residentName = localStorage.getItem("residentName");
//   const communityName = localStorage.getItem("communityName");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get("/api/resident/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProfile(res.data.profile);
//       setFamily(res.data.family);
//     } catch {
//       showMessage("Error fetching profile");
//     }
//   };

//   const handleAddFamily = async () => {
//     try {
//       const res = await axios.post(
//         "/api/resident/family-member",
//         newMember,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setFamily([...family, res.data.fam]);
//       setNewMember({ name: "", age: "", gender: "", relation: "" });
//       setShowAddModal(false);
//       showMessage("Family member added successfully");
//     } catch {
//       showMessage("Failed to add family member");
//     }
//   };

//   const handleUpdateFamily = async () => {
//     try {
//       const res = await axios.put(
//         `/api/resident/family-member/${editMember._id}`,
//         editMember,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setFamily(
//         family.map((f) => (f._id === editMember._id ? res.data.fam : f))
//       );
//       setEditMember(null);
//       setShowEditFamilyModal(false);
//       showMessage("Family member updated");
//     } catch {
//       showMessage("Failed to update family member");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/family-member/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setFamily(family.filter((f) => f._id !== id));
//       showMessage("Family member deleted");
//     } catch {
//       showMessage("Failed to delete family member");
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put(
//         "/api/resident/profile",
//         editProfile,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setProfile(res.data.user);
//       setEditProfile(null);
//       setShowProfileModal(false);
//       showMessage("Profile updated successfully");
//     } catch {
//       showMessage("Failed to update profile");
//     }
//   };

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };

//   return (
//     <ResidentLayout>
//       <div className="container py-4">

//         {/* Toast */}
//         <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
//           <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
//             <Toast.Body>{toastMsg}</Toast.Body>
//           </Toast>
//         </div>

//         {/* ===== Modern Profile Card ===== */}
//         {profile && (
//           <div className="card shadow-lg border-0 mb-4">
//             <div
//               style={{
//                 height: "150px",
//                 background: "linear-gradient(135deg,#dbeafe,#bfdbfe)",
//                 borderTopLeftRadius: "10px",
//                 borderTopRightRadius: "10px",
//               }}
//             ></div>

//             <div className="text-center" style={{ marginTop: "-60px" }}>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 alt="profile"
//                 style={{
//                   width: "120px",
//                   height: "120px",
//                   borderRadius: "50%",
//                   border: "5px solid white",
//                 }}
//               />

//               <h4 className="mt-3 fw-bold">
//                 {profile.firstName} {profile.lastName}
//               </h4>
//               <p className="text-muted">
//                 Flat {profile.flatNumber} • {communityName}
//               </p>

//               <Button
//                 variant="light"
//                 className="shadow-sm"
//                 onClick={() => {
//                   setEditProfile(profile);
//                   setShowProfileModal(true);
//                 }}
//               >
//                 <FaEdit /> Edit Profile
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="row text-center mt-4 mb-4 px-4">
//               <div className="col-md-3">
//                 <h5>{family.length}</h5>
//                 <small>Family Members</small>
//               </div>
//               <div className="col-md-3">
//                 <h5>{profile.mobile}</h5>
//                 <small>Mobile</small>
//               </div>
//               <div className="col-md-3">
//                 <h5>{profile.email}</h5>
//                 <small>Email</small>
//               </div>
//               <div className="col-md-3">
//                 <h5>{profile.communityId?.name}</h5>
//                 <small>Community</small>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ===== Family Section ===== */}
//         <div className="card shadow-sm">
//           <div className="card-body">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5>👨‍👩‍👧 Family Members</h5>
//               <Button onClick={() => setShowAddModal(true)}>
//                 <FaPlus /> Add Member
//               </Button>
//             </div>

//             <div className="table-responsive">
//               <table className="table table-hover">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Gender</th>
//                     <th>Relation</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {family.map((f) => (
//                     <tr key={f._id}>
//                       <td>{f.name}</td>
//                       <td>{f.age}</td>
//                       <td>{f.gender}</td>
//                       <td>{f.relation}</td>
//                       <td>
//                         <Button size="sm" variant="warning" className="me-2"
//                           onClick={() => {
//                             setEditMember(f);
//                             setShowEditFamilyModal(true);
//                           }}>
//                           Edit
//                         </Button>
//                         <Button size="sm" variant="danger"
//                           onClick={() => handleDelete(f._id)}>
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </div>

//         {/* ===== All Modals SAME (Not Removed) ===== */}
//         {/* Add Modal */}
//         <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <input className="form-control mb-2" placeholder="Name"
//               value={newMember.name}
//               onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
//             <input className="form-control mb-2" type="number" placeholder="Age"
//               value={newMember.age}
//               onChange={(e) => setNewMember({ ...newMember, age: e.target.value })} />
//             <select className="form-control mb-2"
//               value={newMember.gender}
//               onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}>
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//             <input className="form-control mb-2" placeholder="Relation"
//               value={newMember.relation}
//               onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleAddFamily}>Save</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Family Modal */}
//         <Modal show={showEditFamilyModal} onHide={() => setShowEditFamilyModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Family Member</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editMember && (
//               <>
//                 <input className="form-control mb-2"
//                   value={editMember.name}
//                   onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} />
//                 <input className="form-control mb-2" type="number"
//                   value={editMember.age}
//                   onChange={(e) => setEditMember({ ...editMember, age: e.target.value })} />
//                 <select className="form-control mb-2"
//                   value={editMember.gender}
//                   onChange={(e) => setEditMember({ ...editMember, gender: e.target.value })}>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//                 <input className="form-control mb-2"
//                   value={editMember.relation}
//                   onChange={(e) => setEditMember({ ...editMember, relation: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateFamily}>Update</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Profile Modal */}
//         <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Profile</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editProfile && (
//               <>
//                 <input className="form-control mb-2"
//                   value={editProfile.firstName}
//                   onChange={(e) => setEditProfile({ ...editProfile, firstName: e.target.value })} />
//                 <input className="form-control mb-2"
//                   value={editProfile.lastName}
//                   onChange={(e) => setEditProfile({ ...editProfile, lastName: e.target.value })} />
//                 <input className="form-control mb-2"
//                   value={editProfile.mobile}
//                   onChange={(e) => setEditProfile({ ...editProfile, mobile: e.target.value })} />
//                 <input className="form-control mb-2"
//                   value={editProfile.flatNumber}
//                   onChange={(e) => setEditProfile({ ...editProfile, flatNumber: e.target.value })} />
//               </>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button onClick={handleUpdateProfile}>Update Profile</Button>
//           </Modal.Footer>
//         </Modal>

//       </div>
//     </ResidentLayout>
//   );
// }

// export default ResidentProfile;

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



