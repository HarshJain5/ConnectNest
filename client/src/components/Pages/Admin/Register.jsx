import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../../components/axiosInstance";

const Register = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        communityName: "",
        communityType: "",
        unit: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);

    /* ✅ EMAIL URL SE AUTO-FILL + DIRECT ACCESS BLOCK */
    useEffect(() => {
        const emailFromUrl = searchParams.get("email");

        if (!emailFromUrl) {
            alert("Please verify your email first");
            navigate("/");
            return;
        }

        setFormData(prev => ({
            ...prev,
            email: emailFromUrl
        }));
    }, [searchParams, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "password") {
            const strongPasswordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!strongPasswordRegex.test(value)) {
                setPasswordError(
                    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character."
                );
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (passwordError) {
            setLoading(false);
            return;
        }

        try {
            await axios.post('/api/auth/register', formData);
            setIsSuccess(true);
            setModalMessage("Successfully Registered! Your application is pending for approval.");
            setIsModalOpen(true);
        } catch (err) {
            setIsSuccess(false);
            setModalMessage(
                err.response?.data?.error ||
                "Registration failed. Please try again."
            );
            setIsModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // ✅ UPDATED CLOSE MODAL LOGIC
    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");

        // 👉 SUCCESS → redirect to admin login
        if (isSuccess) {
            navigate("/admin-login");
        }
        // 👉 ERROR → stay on same page (do nothing)
    };

    return (
        <div className="register-page">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #2C3E50; /* Dark blue-grey background */
                    position: relative;
                }
                .register-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    box-sizing: border-box;
                    overflow-y: auto; /* Enable scrolling for small screens */
                }
                .background-squares {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    z-index: -1;
                }
                .square {
                    position: absolute;
                    background-color: rgba(44, 62, 80, 0.5); /* Semi-transparent dark blue-grey */
                    border-radius: 10px;
                    animation: moveSquare 20s infinite ease-in-out;
                }

                @keyframes moveSquare {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
                    20% { transform: translate(200px, 100px) rotate(45deg); opacity: 0.6; }
                    40% { transform: translate(50px, 300px) rotate(90deg); opacity: 0.9; }
                    60% { transform: translate(-100px, -50px) rotate(135deg); opacity: 0.7; }
                    80% { transform: translate(-200px, 200px) rotate(180deg); opacity: 0.5; }
                    100% { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
                }
                .square:nth-child(1) { top: 10%; left: 20%; width: 100px; height: 100px; animation-duration: 18s; }
                .square:nth-child(2) { bottom: 5%; right: 15%; width: 80px; height: 80px; animation-duration: 22s; animation-delay: 2s; }
                .square:nth-child(3) { top: 50%; left: 5%; width: 120px; height: 120px; animation-duration: 25s; animation-delay: 4s; }
                .square:nth-child(4) { bottom: 30%; left: 40%; width: 90px; height: 90px; animation-duration: 20s; animation-delay: 6s; }
                .square:nth-child(5) { top: 70%; left: 60%; width: 70px; height: 70px; animation-duration: 19s; animation-delay: 3s; }
                .square:nth-child(6) { bottom: 10%; left: 70%; width: 110px; height: 110px; animation-duration: 23s; animation-delay: 5s; }

                .form-container {
                    z-index: 10;
                    max-width: 800px;
                    width: 100%;
                    background-color: #ffffff;
                    border-radius: 1.5rem;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                    border: 1px solid #e5e7eb;
                    animation: fadeIn 1s ease-in-out;
                    padding-bottom: 2.5rem;
                }

                .logo-section {
                    background-color: #2C3E50;
                    color: white;
                    padding: 2.5rem 0;
                    margin-top: 0;
                    margin-right: 0;
                    margin-left: 0;
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }
                .logo-wave {
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 100%;
                    height: 50px;
                    background: #ECF0F1; /* Light gray to match new theme */
                    clip-path: ellipse(70% 30% at 50% 100%);
                }
                .form-section-title {
                    text-align: center;
                    color: #2C3E50;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    font-size: 1.75rem;
                }
                .form-card {
                    background-color: #f8f9fa; /* Light gray background for cards */
                    border-radius: 1rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    padding: 2rem;
                    margin-bottom: 2rem;
                    border: 1px solid #e5e7eb;
                }
                .form-control, .form-select {
                    border-radius: 0.75rem;
                    border-color: #d1d5db;
                    transition: all 0.3s ease;
                    padding: 0.75rem 1rem;
                }
                .form-control:focus, .form-select:focus {
                    border-color: #2C3E50;
                    box-shadow: 0 0 0 0.25rem rgba(44, 62, 80, 0.25);
                }
                .form-label {
                    font-weight: 500;
                    color: #4a5568;
                }
                .btn-custom {
                color:white;
                    background-color: #2C3E50; /* Dark blue-grey to match sidebar */
                    border-color: #2C3E50;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(44, 62, 80, 0.2);
                    font-weight: 600;
                    letter-spacing: 1px;
                    border-radius: 9999px; /* Pill shape */
                }
                .btn-custom:hover {
            color:white;
                    background-color: #1F3041; /* Darker shade on hover */
                    border-color: #1F3041;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(44, 62, 80, 0.3);
                }
                .modal-content {
                    border-radius: 1rem;
                    background-color: #ffffff;
                    color: #2a3648;
                }
                .form-title-text {
                    color: #2C3E50;
                    font-weight: 700;
                    margin-bottom: 0;
                }
                @media (max-width: 767.98px) {
                    .form-container {
                        padding: 1rem;
                    }
                    .logo-section {
                        margin: -1rem -1rem 1rem -1rem;
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>

            <div className="background-squares">
                {[...Array(6)].map((_, i) => <div key={i} className="square"></div>)}
            </div>

            <div className="container form-container">
                <div className="logo-section">
                    <h2 className="logo-text">MyColonyConnect</h2>
                    <div className="logo-wave"></div>
                </div>

                <h2 className="form-section-title">Registration Form</h2>

                <form onSubmit={handleSubmit}>

                    {/* Personal Details */}
                    <div className="form-card">
                        <h3 className="fw-semibold form-title-text">Personal Details</h3>
                        <hr />

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Username / Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={formData.email}
                                readOnly
                            />
                        </div>

                        <div className="row g-3 mt-3">
                            <div className="col-md-6">
                                <label className="form-label">Mobile No.</label>
                                <input className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${passwordError ? "is-invalid" : ""}`}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {passwordError && <small className="text-danger">{passwordError}</small>}
                            </div>
                        </div>
                    </div>

                    {/* Community Details */}
                    <div className="form-card">
                        <h3 className="fw-semibold form-title-text">Enter Community Details!</h3>
                        <hr />
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="communityName" className="form-label">Community Name</label>
                                <input type="text" id="communityName" name="communityName" placeholder="Greenwood Residency" className="form-control" value={formData.communityName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="communityType" className="form-label">Community Type</label>
                                <select id="communityType" name="communityType" className="form-select" value={formData.communityType} onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Society">Society</option>
                                    <option value="Township">Township</option>
                                    <option value="Gated Community">Gated Community</option>
                                </select>
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <div className="col-md-6">
                                <label htmlFor="unit" className="form-label">Community Unit</label>
                                <input type="text" id="unit" name="unit" placeholder="A-101" className="form-control" value={formData.unit} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">Community Address</label>
                                <input type="text" id="address" name="address" placeholder="123, Main Street" className="form-control" value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <div className="col-md-6">
                                <label htmlFor="state" className="form-label">Community State</label>
                                <select id="state" name="state" className="form-select" value={formData.state} onChange={handleChange} required>
                                    <option value="">Select State</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Gujarat">Gujarat</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="city" className="form-label">Community City</label>
                                <input type="text" id="city" name="city" placeholder="Indore" className="form-control" value={formData.city} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <div className="col-12">
                                <label htmlFor="pincode" className="form-label">PIN Code</label>
                                <input type="text" id="pincode" name="pincode" placeholder="452001" className="form-control" value={formData.pincode} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <button className="btn btn-custom btn-lg px-5" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>

                </form>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h5>{isSuccess ? "Registration Successful!" : "Registration Failed"}</h5>
                                <p>{modalMessage}</p>
                                <button
                                    className="btn btn-custom w-100"
                                    onClick={closeModal}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Register;





