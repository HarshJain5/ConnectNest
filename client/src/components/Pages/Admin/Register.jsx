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

    const [step, setStep] = useState(1);
const [showPassword, setShowPassword] = useState(false);

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
<div className="admin-login-page">

<style>{`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg,#eef2f7,#f8f9fb);
  }

  .login-wrapper {
  height: 100dvh;
  display: flex;
}

.login-left {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}


.form-container {
  width: 100%;
  max-width: 520px;
  background: white;
  padding: 1.3rem;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}
  .form-control.is-invalid {
  border-color: #dc3545;
  background-image: none !important;
}

.form-label {
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.form-control,
.form-select {
  border-radius: 35px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
}

.mb-3 {
  margin-bottom: 0.8rem !important;
}

.btn-custom {
  background: linear-gradient(135deg,#2C3E50,#1F3041);
  border: none;
  border-radius: 35px;
  padding: 0.7rem;
  font-weight: 600;
  width: 100%;
  color: white;
}

/* Password Toggle */
.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: 45px;
  height: 45px;   /* 👈 fixed height */
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 17px;
  color: #555;
}
  
  

  /* RIGHT IMAGE PANEL */
  .login-right {
    width: 55%;
    position: relative;
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
    overflow: hidden;
  }

  .login-right::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("https://images.unsplash.com/photo-1507089947368-19c1da9775ae") center/cover no-repeat;
  }

  .login-right::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,rgba(0,0,0,0.7),rgba(0,0,0,0.5));
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    padding: 40px;
  }
    .main-title {
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
  color: #2C3E50;
  margin-bottom: 5px;
}

.sub-title {
  text-align: center;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #444;
}

.login-text {
  text-align: left;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.divider {
  margin: 0.5rem 0 1.2rem 0;
  opacity: 0.4;
}
/* Mobile View */
@media (max-width: 992px) {

   .login-wrapper {
    height: 100dvh;
    overflow: hidden;   /* 👈 page scroll band */
  }

  .login-left {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 45px;
  }

  .form-container {
    width: 92%;
    max-width: 380px;
    max-height: 85dvh;   /* 👈 important */
    overflow-y: auto;    /* 👈 container scroll */
    padding: 1.5rem;
    margin-bottom: 20px;
  }

  .login-right {
    display: none;
  }

  

  .main-title {
    font-size: 1.6rem;
  }

  .sub-title {
    font-size: 1rem;
  }
    .row > div {
    width: 100% !important;
  }
    
  .btn-custom {
    padding: 0.8rem;
  }
}

h2 {
  font-size: 1.4rem;
}

p {
  font-size: 0.85rem;
}
  
`}</style>



<div className="login-wrapper">

  {/* LEFT SIDE */}
  <div className="login-left">
    <div className="form-container">

      <h2 className="main-title">ConnectNest</h2>
<h5 className="sub-title">Admin Registration</h5>

<h6 className="login-text">Register Here!</h6>
<hr className="divider" />

      <form onSubmit={handleSubmit}>

        {/* STEP 1 */}
        {step === 1 && (
  <>
    <div className="row g-2">
      <div className="col-md-6">
        <label className="form-label fw-semibold">First Name</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Last Name</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="mb-3 mt-2">
      <label className="form-label fw-semibold">Email</label>
      <input
        type="email"
        className="form-control"
        value={formData.email}
        readOnly
      />
    </div>

    <div className="mb-3">
      <label className="form-label fw-semibold">Mobile Number</label>
      <input
        type="tel"
        className="form-control"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-3">
  <label className="form-label fw-semibold">Password</label>

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      className={`form-control ${passwordError ? "is-invalid" : ""}`}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    >
      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
    </span>
  </div>

  {/* ✅ Password error message */}
  {passwordError && (
    <small className="text-danger d-block mt-1">
      {passwordError}
    </small>
  )}
</div>

    <button
      type="button"
      className="btn btn-custom mt-2"
      onClick={()=> setStep(2)}
    >
      Continue →
    </button>

  </>
)}

        {/* STEP 2 */}
{step === 2 && (
  <>
    <div className="row g-2">

      <div className="col-md-6">
        <label className="form-label fw-semibold">Community Name</label>
        <input
          type="text"
          className="form-control"
          name="communityName"
          value={formData.communityName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Community Type</label>
        <select
          className="form-select"
          name="communityType"
          value={formData.communityType}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Apartment">Apartment</option>
          <option value="Society">Society</option>
          <option value="Township">Township</option>
          <option value="Gated Community">Gated</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Unit</label>
        <input
          type="text"
          className="form-control"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">State</label>
        <select
          className="form-select"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Madhya Pradesh">MP</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
          <option value="Gujarat">Gujarat</option>
        </select>
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">PIN Code</label>
        <input
          type="text"
          className="form-control"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

    </div>

    <div className="d-flex gap-2 mt-3">
      <button
        type="button"
        className="btn btn-outline-secondary w-50"
        onClick={() => setStep(1)}
      >
        Back
      </button>

      <button
        type="submit"
        className="btn btn-custom w-50"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  </>
)}

      </form>
    </div>
  </div>

  {/* RIGHT SIDE IMAGE */}
  <div className="login-right">
    <div className="image-overlay">
      <div>
        <h3 className="fw-bold">
          Start Managing Your <br />
          <span style={{ color: "#00d4ff" }}>Community Digitally</span>
        </h3>
        <p className="mt-3">
          Secure • Smart • Seamless Management
        </p>
      </div>
    </div>
  </div>

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



