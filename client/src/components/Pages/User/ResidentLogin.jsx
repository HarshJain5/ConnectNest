import React, { useState, useContext } from "react";
import axios from "../../../components/axiosInstance"
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../../../contextapi/Contextapi";

function Login() {
    const navigate = useNavigate();
    const { saveAuthData } = useContext(Contextapi);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
    const res = await axios.post("/api/auth/resident-login", formData);

    saveAuthData(
  res.data.token,
  res.data.firstName,
  res.data.role,
  res.data.communityName
);


    setIsSuccess(true);   // 👈 ADD
    setModalMessage("Login Successful ✅");
    setIsMessageModalOpen(true);

} catch (err) {
    const errorMessage = err?.response?.data?.error || "Login failed ❌";

    setIsSuccess(false);  // 👈 ADD
    setModalMessage(errorMessage);
    setIsMessageModalOpen(true);
} finally {
            setLoading(false);
        }
    };
    
    const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setModalMessage("");

    if (isSuccess) {
        navigate("/resident/dashboard");
    }
};

    return (
        <div className="resident-login-page">
            

            <style>
{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #eef2f7, #f8f9fb);
}

/* ================= WRAPPER ================= */
.login-wrapper {
  min-height: 100dvh;
  display: flex;
}

/* ================= LEFT SIDE ================= */
.login-left {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef2f7, #f8f9fb);
  position: relative;
}

/* 3D CARD EFFECT */
.form-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 25px;
  box-shadow:
    0 20px 40px rgba(0,0,0,0.15),
    0 5px 15px rgba(0,0,0,0.08);
  transition: 0.4s ease;
}

.form-container:hover {
  transform: translateY(-8px);
  box-shadow:
    0 30px 60px rgba(0,0,0,0.2),
    0 10px 20px rgba(0,0,0,0.12);
}

/* ================= TEXT ================= */
.logo-section {
  text-align: center;
  margin-bottom: 1rem;
}

.logo-text {
  font-weight: 700;
  font-size: 1.6rem;
  color: #2C3E50;
}

.form-section-title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #34495E;
}

.form-title-text {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2C3E50;
}

/* ================= INPUT ================= */
.form-control {
  border-radius: 50px;
  padding: 0.8rem 1.2rem;
  border: 1px solid #ddd;
  transition: 0.3s ease;
}

.form-control:focus {
  border-color: #2C3E50;
  box-shadow: 0 0 0 4px rgba(44,62,80,0.15);
  transform: scale(1.02);
}

/* ================= BUTTON ================= */
.btn-custom {
  background: linear-gradient(135deg, #2C3E50, #1F3041);
  border: none;
  border-radius: 50px;
  padding: 0.8rem;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
  transition: 0.3s ease;
  color: white !important;   /* 👈 ADD THIS */
}

.btn-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  color: white !important;   /* 👈 ADD THIS */
}

.btn-custom:active {
  transform: scale(0.96);
}

/* Forget Password button */
.btn-dark {
  border-radius: 50px;
  padding: 0.6rem;
}

/* ================= RIGHT SIDE ================= */
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
  background: url("https://images.unsplash.com/photo-1556761175-b413da4baf72") center/cover no-repeat;
  z-index: 1;
}

.login-right::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);  /* 👈 black transparent film */
  z-index: 2;
}

/* ================= RIGHT SIDE ================= */
.login-right {
  width: 55%;
  position: relative;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
  overflow: hidden;
}

/* Background Image */
.login-right::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("https://images.unsplash.com/photo-1556761175-b413da4baf72") center/cover no-repeat;
  z-index: 1;
}

/* Dark Overlay */
.login-right::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.65),
    rgba(0,0,0,0.45)
  );
  z-index: 2;
}

/* Center Content */
.image-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 40px;
}

/* Animated Heading */
.image-overlay h3 {
  font-size: 2.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(-30px);
  animation: slideFadeDown 1.2s ease forwards;
}

/* Highlight Brand Name */
.image-overlay h3 span {
  color: #00d4ff;
  text-shadow: 0 0 15px rgba(0,212,255,0.6);
}

/* Animated Paragraph */
.image-overlay p {
  margin-top: 1rem;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateY(30px);
  animation: slideFadeUp 1.4s ease forwards;
  animation-delay: 0.5s;
}

/* Animations */
@keyframes slideFadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
}

.status-icon.success {
  background: #28a745;
  box-shadow: 0 0 20px rgba(40,167,69,0.4);
}

.status-icon.failed {
  background: #dc3545;
  box-shadow: 0 0 20px rgba(220,53,69,0.4);
}

/* ================= MOBILE DESIGN ================= */
@media (max-width: 992px) {

  .login-wrapper {
    flex-direction: column;
    background: linear-gradient(135deg, #eef2f7, #f8f9fb);
    justify-content: center;
    align-items: center;
  }

  .login-right {
    display: none;
  }

  .login-left {
    width: 100%;
    height: auto;   /* 👈 full height remove */
    background: linear-gradient(135deg, #eef2f7, #f8f9fb);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0;
  }

  .form-container {
    width: 90%;              /* 👈 smaller */
    max-width: 340px;        /* 👈 fixed smaller width */
    padding: 1.5rem 1.2rem;  /* 👈 compact padding */
    border-radius: 25px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  }

  .form-control {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }

  .btn-custom {
    padding: 0.8rem;
  }
}
`}
</style>
            <div className="background-squares">
                {[...Array(6)].map((_, i) => <div key={i} className="square"></div>)}
            </div>
            <div>
            <div className="login-wrapper">
  <div className="login-left">
    <div className="form-container">
                <div className="logo-section">
                    <h2 className="logo-text">ConnectNest</h2>
                    <div className="logo-wave"></div>
                </div>
                <h2 className="form-section-title">Resident Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-card">
                        <h3 className="fw-semibold form-title-text">Login Here!</h3>
                        <hr />
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row g-3 mt-3">
                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-3 text-center">
                        <button type="submit" className="btn btn-custom btn-lg px-5" disabled={loading}>
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                        <hr />
                        <p>
                            <Link to="/forget-password">
                                <button className="form-control btn btn-dark mt-2">Forget Password?</button>
                            </Link>
                        </p>
                    </div>
                </form>
                    </div>
  </div>

  <div className="login-right">
  <div className="image-overlay">
    <h3>Welcome To <span>ConnectNest</span> 👋</h3>
    <p>A Smarter Way To Live Together.</p>
  </div>
</div>
</div>
            </div>
             {isMessageModalOpen && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center py-4">

  <div className={`status-icon ${isSuccess ? "success" : "failed"}`}>
    {isSuccess ? "✔" : "✖"}
  </div>

  <h5 className="modal-title fw-bold mt-3">
    {isSuccess ? "Login Successful" : "Login Failed"}
  </h5>

  <p className="text-secondary my-3">{modalMessage}</p>

  <button
    type="button"
    className="btn btn-custom w-100"
    onClick={closeMessageModal}
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
}

export default Login;