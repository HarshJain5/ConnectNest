// import React, { useState, useEffect, useContext } from "react";
// import axios from "../../../components/axiosInstance"
// import { Modal, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import Sidebar from "./ResidentSidebar";
// import ResidentLayout from "./ResidentLayout";

// const ResidentComplaint = () => {
//   const [formData, setFormData] = useState({ title: "", description: "", image: null });
//   const [myComplaints, setMyComplaints] = useState([]);
//   const [othersComplaints, setOthersComplaints] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // NEW STATES FOR UPDATE MODAL
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [updateData, setUpdateData] = useState({ title: "", description: "" });
//   const [showDuplicateModal, setShowDuplicateModal] = useState(false);
// const [duplicateInfo, setDuplicateInfo] = useState(null);


//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setSuccess("");
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) {
//   //       setError("You must be logged in first.");
//   //       return;
//   //     }

//   //     const data = new FormData();
//   //     data.append("title", formData.title);
//   //     data.append("description", formData.description);
//   //     if (formData.image) data.append("image", formData.image);

//   //     await axios.post("/api/resident/complaints", data, {
//   //       headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
//   //     });

//   //     setSuccess("✅ Complaint submitted successfully!");
//   //     setFormData({ title: "", description: "", image: null });
//   //     setShowModal(false);
//   //     fetchComplaints();
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError(err.response?.data?.error || "Failed to submit complaint");
//   //   }
//   // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setSuccess("");

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("You must be logged in first.");
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     if (formData.image) data.append("image", formData.image);

//     const res = await axios.post("/api/resident/complaints", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // 🔥 DUPLICATE CASE
//     if (res.data.isDuplicate) {
//       setDuplicateInfo(res.data);
//       setShowDuplicateModal(true);
//       setShowModal(false);
//       fetchComplaints();
//       return;
//     }

//     // ✅ NEW COMPLAINT CASE
//     setSuccess("✅ Complaint submitted successfully!");
//     setFormData({ title: "", description: "", image: null });
//     setShowModal(false);
//     fetchComplaints();

//   } catch (err) {
//     console.error(err);
//     setError(err.response?.data?.message || "Failed to submit complaint");
//   }
// };


//   const fetchComplaints = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("/api/resident/complaints", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMyComplaints(res.data.myComplaints || []);
//       setOthersComplaints(res.data.othersComplaints || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/complaints/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setMyComplaints(myComplaints.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   // OPEN UPDATE MODAL
//   const openUpdateModal = (complaint) => {
//     setSelectedComplaint(complaint);
//     setUpdateData({ title: complaint.title, description: complaint.description });
//     setShowUpdateModal(true);
//   };

//   // HANDLE UPDATE SUBMIT
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedComplaint) return;

//     try {
//       const res = await axios.put(
//         `/api/resident/complaints/${selectedComplaint._id}`,
//         updateData,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setMyComplaints(myComplaints.map((c) => (c._id === selectedComplaint._id ? res.data.complaint : c)));
//       setShowUpdateModal(false);
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };

//   return (
//     <>
//     <div className="dashboard-page">
//       {/* Your CSS styles same as before */}
//       <style>
//         {`
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
//           .btn-logout {
//             background-color: #E74C3C;
//             color: white;
//             border: none;
//             padding: 0.5rem 1.5rem;
//             border-radius: 9999px;
//             font-weight: 600;
//           }
//           .btn-logout:hover {
//             background-color: #C0392B;
//           }
//           .complaint-card {
//             background: #fff;
//             border-radius: 1rem;
//             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//             padding: 1rem;
//           }
//           .admin-response {
//             background: #fff8e1;
//             border-radius: 0.5rem;
//             padding: 0.5rem;
//             margin-top: 0.5rem;
//             font-size: 0.9rem;
//           }
//         `}
//       </style>

//       <div className="main-content">
//         <div className="header-bar">
//           <h2>📢 Resident Complaints</h2>
//           <div>
//             <Button variant="primary" onClick={() => setShowModal(true)}>
//               ➕ Add Complaint
//             </Button>{" "}
//             <button className="btn-logout" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>

//         {error && <p className="text-danger">{error}</p>}
//         {success && <p className="text-success">{success}</p>}

//         <h4>My Complaints</h4>
//         <div className="row">
//           {myComplaints.map((c) => (
//             <div key={c._id} className="col-md-4 mb-3">
//               <div className="complaint-card">
//                 {c.imageUrl && (
//                   <img src={c.imageUrl} alt={c.title} className="img-fluid rounded mb-2" />
//                 )}
//                 <h5>{c.title}</h5>
//                 <p>{c.description}</p>
//                 <small className="text-muted">Status: {c.status}</small>
                
//                 {c.duplicateCount > 1 && (
//   <div className="text-info mt-2">
//     👥 {c.duplicateCount} residents have reported this issue.
//   </div>
// )}


//                 {c.adminResponse && (
//                   <div className="admin-response">
//                     <strong>Admin Response:</strong> {c.adminResponse.text}
//                     {c.adminResponse.imageUrl && (
//                       <img src={c.adminResponse.imageUrl} alt="response" className="img-fluid mt-2 rounded" />
//                     )}
//                     <br />
//                     <small>
//                       By: {c.adminResponse.respondedBy} <br />
//                       At: {new Date(c.adminResponse.respondedAt).toLocaleString()}
//                     </small>
//                   </div>
//                 )}

                

//                 <div className="mt-2">
//                   <Button size="sm" variant="warning" onClick={() => openUpdateModal(c)}>
//                     Update
//                   </Button>{" "}
//                   <Button size="sm" variant="danger" onClick={() => handleDelete(c._id)}>
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h4 className="mt-4">Others' Complaints</h4>
//         <div className="row">
//           {othersComplaints.map((c) => (
//             <div key={c._id} className="col-md-4 mb-3">
//               <div className="complaint-card">
//                 {c.imageUrl && (
//                   <img src={c.imageUrl} alt={c.title} className="img-fluid rounded mb-2" />
//                 )}
//                 <h5>{c.title}</h5>
//                 <p>{c.description}</p>
//                 <small className="text-muted">Status: {c.status}</small>

//                 {c.adminResponse && (
//                   <div className="admin-response">
//                     <strong>Admin Response:</strong> {c.adminResponse.text}
//                     {c.adminResponse.imageUrl && (
//                       <img src={c.adminResponse.imageUrl} alt="response" className="img-fluid mt-2 rounded" />
//                     )}
//                     <br />
//                     <small>
//                       By: {c.adminResponse.respondedBy} <br />
//                       At: {new Date(c.adminResponse.respondedAt).toLocaleString()}
                      
//                     </small>
                    
//                   </div>
//                 )}
//                 {c.duplicateCount > 1 && (
//   <div className="text-info mt-2">
//     👥 {c.duplicateCount} residents have reported this issue.
//   </div>
// )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add Complaint Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>➕ Register Complaint</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Upload Image</Form.Label>
//                 <Form.Control type="file" name="image" onChange={handleChange} />
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
            
//           </Modal.Body>
//         </Modal>

//         {/* Update Complaint Modal */}
//         <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>✏️ Update Complaint</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleUpdateSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={updateData.title}
//                   onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   value={updateData.description}
//                   onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
//                   required
//                 />
//               </Form.Group>
//               <Button variant="success" type="submit">
//                 Update
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>

//         {/* Duplicate Complaint Modal */}
// <Modal
//   show={showDuplicateModal}
//   onHide={() => setShowDuplicateModal(false)}
//   centered
// >
//   <Modal.Header closeButton>
//     <Modal.Title>⚠ Duplicate Complaint Detected</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <p>
//       This issue has already been reported by other residents.
//     </p>

//     {duplicateInfo && (
//       <>
//         <p>
//           👥 <strong>{duplicateInfo.duplicateCount}</strong> residents have reported this issue.
//         </p>

//         <p className="text-success">
//           ✔ Your priority vote has also been added.
//         </p>

//         <Button
//           variant="link"
//           onClick={() =>
//             navigate(`/resident/complaints/${duplicateInfo.originalComplaintId}`)
//           }
//         >
//           View Original Complaint
//         </Button>
//       </>
//     )}
//   </Modal.Body>

//   <Modal.Footer>
//     <Button
//       variant="secondary"
//       onClick={() => setShowDuplicateModal(false)}
//     >
//       Close
//     </Button>
//   </Modal.Footer>
// </Modal>

//       </div>
//     </div>
//     </>
//   );
// };

// export default ResidentComplaint;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "../../../components/axiosInstance";
// import { Modal, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { Contextapi } from "../../../contextapi/Contextapi";
// import ResidentLayout from "./ResidentLayout";

// const ResidentComplaint = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   const [myComplaints, setMyComplaints] = useState([]);
//   const [othersComplaints, setOthersComplaints] = useState([]);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     title: "",
//     description: "",
//   });

//   const [showDuplicateModal, setShowDuplicateModal] = useState(false);
//   const [duplicateInfo, setDuplicateInfo] = useState(null);

//   const navigate = useNavigate();
//   const { clearAuthData } = useContext(Contextapi);

//   // ==============================
//   // HANDLE CHANGE
//   // ==============================
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // ==============================
//   // SUBMIT COMPLAINT
//   // ==============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("You must be logged in first.");
//         return;
//       }

//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       if (formData.image) data.append("image", formData.image);

//       const res = await axios.post("/api/resident/complaints", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Duplicate Case
//       if (res.data.isDuplicate) {
//         setDuplicateInfo(res.data);
//         setShowDuplicateModal(true);
//         setShowModal(false);
//         fetchComplaints();
//         return;
//       }

//       // Success Case
//       setSuccess("✅ Complaint submitted successfully!");
//       setFormData({ title: "", description: "", image: null });
//       setShowModal(false);
//       fetchComplaints();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to submit complaint");
//     }
//   };

//   // ==============================
//   // FETCH COMPLAINTS
//   // ==============================
//   const fetchComplaints = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("/api/resident/complaints", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMyComplaints(res.data.myComplaints || []);
//       setOthersComplaints(res.data.othersComplaints || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ==============================
//   // DELETE
//   // ==============================
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/resident/complaints/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       setMyComplaints(myComplaints.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   // ==============================
//   // UPDATE
//   // ==============================
//   const openUpdateModal = (complaint) => {
//     setSelectedComplaint(complaint);
//     setUpdateData({
//       title: complaint.title,
//       description: complaint.description,
//     });
//     setShowUpdateModal(true);
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedComplaint) return;

//     try {
//       const res = await axios.put(
//         `/api/resident/complaints/${selectedComplaint._id}`,
//         updateData,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       setMyComplaints(
//         myComplaints.map((c) =>
//           c._id === selectedComplaint._id ? res.data.complaint : c
//         )
//       );

//       setShowUpdateModal(false);
//     } catch (err) {
//       console.error("Update failed", err);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/resident-login");
//   };

//   // ==============================
//   // RETURN
//   // ==============================
//   return (
    
//     <ResidentLayout>
//       <style>
//         {`
//         .complaint-header {
//   position: sticky;
//   top: 0;
//   background: #fff;
//   padding: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #eee;
//   z-index: 100;
// }

// .complaint-card {
//   background: #ffffff;
//   border-radius: 16px;
//   overflow: hidden;
//   box-shadow: 0 6px 20px rgba(0,0,0,0.05);
//   transition: transform 0.2s ease;
// }

// .complaint-card:hover {
//   transform: translateY(-4px);
// }

// .complaint-image-wrapper {
//   width: 100%;
//   background: #f8f9fa;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .complaint-image {
//   width: 100%;
//   height: auto;
//   object-fit: contain;
//   max-height: 250px;
// }

// .complaint-content {
//   padding: 1rem;
// }

// .complaint-title {
//   font-weight: 600;
//   margin-bottom: 0.5rem;
// }

// .complaint-desc {
//   font-size: 0.9rem;
//   color: #555;
// }

// .complaint-meta {
//   margin-top: 0.5rem;
// }

// .status-badge {
//   padding: 4px 10px;
//   border-radius: 20px;
//   font-size: 0.75rem;
//   font-weight: 500;
// }

// .status-badge.pending {
//   background: #ffeaea;
//   color: #d63031;
// }

// .status-badge.resolved {
//   background: #e8f8f0;
//   color: #27ae60;
// }

// .duplicate-info {
//   margin-top: 0.5rem;
//   font-size: 0.85rem;
//   color: #0984e3;
// }

// .admin-response-box {
//   background: #f1f3f5;
//   padding: 0.75rem;
//   border-radius: 10px;
//   margin-top: 0.75rem;
//   font-size: 0.85rem;
// }

// .admin-image {
//   width: 100%;
//   margin-top: 0.5rem;
//   border-radius: 8px;
//   object-fit: contain;
// }

// .admin-meta {
//   font-size: 0.75rem;
//   color: #666;
//   margin-top: 0.5rem;
// }

// .complaint-actions {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 1rem;
// }
//         `}
//       </style>
//       <div className="complaint-header">
//   <h2>📢 Resident Complaints</h2>
//   <Button variant="primary" onClick={() => setShowModal(true)}>
//     ➕ Add Complaint
//   </Button>
// </div>

//       {error && <p className="text-danger">{error}</p>}
//       {success && <p className="text-success">{success}</p>}

//      <div key={c._id} className="col-md-4 mb-4">
//   <div className="complaint-card">

//     {c.imageUrl && (
//       <div className="complaint-image-wrapper">
//         <img
//           src={c.imageUrl}
//           alt={c.title}
//           className="complaint-image"
//         />
//       </div>
//     )}

//     <div className="complaint-content">
//       <h5 className="complaint-title">{c.title}</h5>
//       <p className="complaint-desc">{c.description}</p>

//       <div className="complaint-meta">
//         <span className={`status-badge ${c.status.toLowerCase()}`}>
//           {c.status}
//         </span>
//       </div>

//       {c.duplicateCount > 1 && (
//         <div className="duplicate-info">
//           👥 {c.duplicateCount} residents reported this
//         </div>
//       )}

//       {c.adminResponse && (
//         <div className="admin-response-box">
//           <strong>Admin Response:</strong>
//           <div>{c.adminResponse.text}</div>

//           {c.adminResponse.imageUrl && (
//             <img
//               src={c.adminResponse.imageUrl}
//               alt="Admin"
//               className="admin-image"
//             />
//           )}

//           <div className="admin-meta">
//             {c.adminResponse.respondedBy} •{" "}
//             {new Date(c.adminResponse.respondedAt).toLocaleString()}
//           </div>
//         </div>
//       )}

//       <div className="complaint-actions">
//         <Button
//           size="sm"
//           variant="outline-warning"
//           onClick={() => openUpdateModal(c)}
//         >
//           Update
//         </Button>
//         <Button
//           size="sm"
//           variant="outline-danger"
//           onClick={() => handleDelete(c._id)}
//         >
//           Delete
//         </Button>
//       </div>
//     </div>

//   </div>
// </div>

//       {/* ================= ADD MODAL ================= */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>➕ Register Complaint</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Upload Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image"
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button type="submit" variant="primary">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Update Complaint Modal */}
//         <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>✏️ Update Complaint</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleUpdateSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={updateData.title}
//                   onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   value={updateData.description}
//                   onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
//                   required
//                 />
//               </Form.Group>
//               <Button variant="success" type="submit">
//                 Update
//               </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>

//       {/* Duplicate Complaint Modal */}
// <Modal
//   show={showDuplicateModal}
//   onHide={() => setShowDuplicateModal(false)}
//   centered
// >
//   <Modal.Header closeButton>
//     <Modal.Title>⚠ Duplicate Complaint Detected</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <p>
//       This issue has already been reported by other residents.
//     </p>

//     {duplicateInfo && (
//       <>
//         <p>
//           👥 <strong>{duplicateInfo.duplicateCount}</strong> residents have reported this issue.
//         </p>

//         <p className="text-success">
//           ✔ Your priority vote has also been added.
//         </p>

//         <Button
//           variant="link"
//           onClick={() =>
//             navigate(`/resident/complaints/${duplicateInfo.originalComplaintId}`)
//           }
//         >
//           View Original Complaint
//         </Button>
//       </>
//     )}
//   </Modal.Body>

//   <Modal.Footer>
//     <Button
//       variant="secondary"
//       onClick={() => setShowDuplicateModal(false)}
//     >
//       Close
//     </Button>
//   </Modal.Footer>
// </Modal>
//     </ResidentLayout>
//   );
// };

// export default ResidentComplaint;

import React, { useState, useEffect, useContext } from "react";
import axios from "../../../components/axiosInstance";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Contextapi } from "../../../contextapi/Contextapi";
import ResidentLayout from "./ResidentLayout";

const ResidentComplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [myComplaints, setMyComplaints] = useState([]);
  const [othersComplaints, setOthersComplaints] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
  });

  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState(null);

  const navigate = useNavigate();
  const { clearAuthData } = useContext(Contextapi);

  // ==============================
  // HANDLE CHANGE
  // ==============================
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ==============================
  // SUBMIT COMPLAINT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in first.");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.post("/api/resident/complaints", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Duplicate Case
      if (res.data.isDuplicate) {
        setDuplicateInfo(res.data);
        setShowDuplicateModal(true);
        setShowModal(false);
        fetchComplaints();
        return;
      }

      // Success Case
      setSuccess("✅ Complaint submitted successfully!");
      setFormData({ title: "", description: "", image: null });
      setShowModal(false);
      fetchComplaints();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  // ==============================
  // FETCH COMPLAINTS
  // ==============================
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/resident/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMyComplaints(res.data.myComplaints || []);
      setOthersComplaints(res.data.othersComplaints || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resident/complaints/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMyComplaints(myComplaints.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ==============================
  // UPDATE
  // ==============================
  const openUpdateModal = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({
      title: complaint.title,
      description: complaint.description,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    try {
      const res = await axios.put(
        `/api/resident/complaints/${selectedComplaint._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMyComplaints(
        myComplaints.map((c) =>
          c._id === selectedComplaint._id ? res.data.complaint : c
        )
      );

      setShowUpdateModal(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    clearAuthData();
    navigate("/resident-login");
  };

  // ==============================
  // RETURN
  // ==============================
  return (
  <ResidentLayout>
    <style>{`
      .complaint-header {
  position: sticky;
  top: 0;
  background: #f4f7f9;
  padding: 1.2rem 2rem;
  z-index: 9;
  border-bottom: 1px solid #ddd;
}

.add-btn {
  border-radius: 30px;
  padding: 6px 18px;
  font-weight: 500;
}

      .section-title {
        margin: 30px 0 15px;
        font-weight: 600;
        border-left: 4px solid #2C3E50;
        padding-left: 10px;
      }

      .complaint-card {
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 6px 20px rgba(0,0,0,0.05);
        transition: 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .complaint-card:hover {
        transform: translateY(-5px);
      }

      .complaint-image-wrapper {
        width: 100%;
        background: #f8f9fa;
      }

      .complaint-image {
        width: 100%;
        height: 220px;
        object-fit: contain;
      }

      .complaint-content {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .complaint-title {
        font-weight: 600;
      }

      .complaint-desc {
        font-size: 0.9rem;
        color: #555;
        flex: 1;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .status-badge.pending {
        background: #ffeaea;
        color: #d63031;
      }

      .status-badge.resolved {
        background: #e8f8f0;
        color: #27ae60;
      }

      .duplicate-info {
        font-size: 0.85rem;
        color: #0984e3;
        margin-top: 5px;
      }

      .admin-response-box {
        background: #f1f3f5;
        padding: 10px;
        border-radius: 8px;
        margin-top: 10px;
        font-size: 0.85rem;
      }

      .complaint-actions {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
      }
        .status-badge {
  padding: 5px 14px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.status-badge.pending {
  background: #ffeaea;
  color: #d63031;
}

.status-badge.in-progress {
  background: #fff5e6;
  color: #e67e22;
}

.status-badge.resolved {
  background: #e8f8f0;
  color: #27ae60;
}
  .admin-response-box {
  background: linear-gradient(135deg, #f8f9fa, #eef2f7);
  padding: 12px 14px;
  border-radius: 12px;
  margin-top: 12px;
  border-left: 4px solid #2C3E50;
}

.admin-title {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 5px;
}

.admin-text {
  font-size: 0.85rem;
  color: #555;
}
  .admin-response-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ddd;
}
    `}</style>

    {/* Header */}
    <div className="complaint-header">
  <div className="d-flex justify-content-between align-items-center w-100">
    <h2 className="mb-0">📢 Resident Complaints</h2>

    <Button
      variant="primary"
      className="add-btn"
      onClick={() => setShowModal(true)}
    >
      ➕ Add Complaint
    </Button>
  </div>
</div>

    {error && <p className="text-danger mt-3">{error}</p>}
    {success && <p className="text-success mt-3">{success}</p>}

    {/* ================= MY COMPLAINTS ================= */}
    <h4 className="section-title">My Complaints</h4>
    <div className="row">
      {myComplaints.length === 0 && <p>No complaints yet.</p>}

      {myComplaints.map((c) => (
        <div key={c._id} className="col-md-4 mb-4">
          <div className="complaint-card">

            {c.imageUrl && (
              <div className="complaint-image-wrapper">
                <img src={c.imageUrl} alt={c.title} className="complaint-image" />
              </div>
            )}

            <div className="complaint-content">
              <h5 className="complaint-title">{c.title}</h5>
              <p className="complaint-desc">{c.description}</p>

              <div className="status-wrapper">
  <span
  className={`status-badge ${c.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
    {c.status}
  </span>

  {c.status === "In Progress" && (
    <div className="progress mt-2" style={{ height: "6px" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        style={{ width: "60%" }}
      ></div>
    </div>
  )}
</div>

              {c.duplicateCount > 1 && (
                <div className="duplicate-info">
                  👥 {c.duplicateCount} residents reported this
                </div>
              )}

              {c.adminResponse && (
  <div className="admin-response-box">
    <div className="admin-title">🛠 Admin Response</div>
    <a href={c.adminResponse.imageUrl} target="_blank" rel="noreferrer">
  <img
    src={c.adminResponse.imageUrl}
    alt="Admin Response"
    className="admin-response-image"
  />
</a>
    <div className="admin-text">{c.adminResponse.text}</div>
  </div>
)}

              <div className="complaint-actions">
                <Button
                  size="sm"
                  variant="outline-warning"
                  onClick={() => openUpdateModal(c)}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </Button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>

    {/* ================= OTHERS COMPLAINTS ================= */}
    <h4 className="section-title">Others' Complaints</h4>
    <div className="row">
      {othersComplaints.length === 0 && <p>No other complaints.</p>}

      {othersComplaints.map((c) => (
        <div key={c._id} className="col-md-4 mb-4">
          <div className="complaint-card">

            {c.imageUrl && (
              <div className="complaint-image-wrapper">
                <img src={c.imageUrl} alt={c.title} className="complaint-image" />
              </div>
            )}

            <div className="complaint-content">
              <h5 className="complaint-title">{c.title}</h5>
              <p className="complaint-desc">{c.description}</p>

              <div className="status-wrapper">
  <span
  className={`status-badge ${c.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
    {c.status}
  </span>

  {c.status === "In Progress" && (
    <div className="progress mt-2" style={{ height: "6px" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        style={{ width: "60%" }}
      ></div>
    </div>
  )}
</div>

              {c.duplicateCount > 1 && (
                <div className="duplicate-info">
                  👥 {c.duplicateCount} residents reported this
                </div>
              )}

              {c.adminResponse && (
  <div className="admin-response-box">
    <div className="admin-title">🛠 Admin Response</div>
    <a href={c.adminResponse.imageUrl} target="_blank" rel="noreferrer">
  <img
    src={c.adminResponse.imageUrl}
    alt="Admin Response"
    className="admin-response-image"
  />
</a>
    <div className="admin-text">{c.adminResponse.text}</div>
  </div>
)}
            </div>

          </div>
        </div>
      ))}
    </div>

    {/* Keep your modals as it is below */}
     {/* ================= ADD MODAL ================= */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Register Complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Complaint Modal */}
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>✏️ Update Complaint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={updateData.title}
                  onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      {/* Duplicate Complaint Modal */}
<Modal
  show={showDuplicateModal}
  onHide={() => setShowDuplicateModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>⚠ Duplicate Complaint Detected</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>
      This issue has already been reported by other residents.
    </p>

    {duplicateInfo && (
      <>
        <p>
          👥 <strong>{duplicateInfo.duplicateCount}</strong> residents have reported this issue.
        </p>

        <p className="text-success">
          ✔ Your priority vote has also been added.
        </p>

        <Button
          variant="link"
          onClick={() =>
            navigate(`/resident/complaints/${duplicateInfo.originalComplaintId}`)
          }
        >
          View Original Complaint
        </Button>
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowDuplicateModal(false)}
    >
      Close
    </Button>
  </Modal.Footer>
</Modal>
  </ResidentLayout>
);
};

export default ResidentComplaint;