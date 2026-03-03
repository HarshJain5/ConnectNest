import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../components/axiosInstance";
import { Contextapi } from "../../../contextapi/Contextapi";

function AdLogin() {
    const navigate = useNavigate();
    const { saveAuthData } = useContext(Contextapi);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        communityCode: "",
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("/api/auth/admin-login", formData);

            saveAuthData(
                res.data.token,
                res.data.firstName,
                res.data.role,
                res.data.communityName
            );

            localStorage.setItem("communityCode", res.data.communityCode);

            setIsSuccess(true);
            setModalMessage("Login Successful ✅");
            setIsMessageModalOpen(true);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.error || "Login failed ❌";
            setIsSuccess(false);
            setModalMessage(errorMessage);
            setIsMessageModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const closeMessageModal = () => {
        setIsMessageModalOpen(false);
        if (isSuccess) {
            navigate("/admin/dashboard");
        }
    };

    return (
        <div className="admin-login-page">

            <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

      body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg,#eef2f7,#f8f9fb);
      }

      .login-wrapper {
        min-height: 100dvh;
        display: flex;
      }

      .login-left {
        width: 45%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .form-container {
        width: 100%;
        max-width: 420px;
        background: white;
        padding: 2rem;
        border-radius: 25px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        transition: 0.4s ease;
      }

      .form-container:hover {
        transform: translateY(-8px);
      }

      
      .form-control {
  border-radius: 50px;
  padding: 0.9rem 1.4rem;
  font-size: 0.95rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #2C3E50;
  box-shadow: 0 0 0 4px rgba(44,62,80,0.15);
}

      .btn-custom {
  background: linear-gradient(135deg,#2C3E50,#1F3041);
  border: none;
  border-radius: 50px;
  padding: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  color: white;
}

.btn-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  user-select: none;
}

.main-title {
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  color: #2C3E50;
  margin-bottom: 5px;
}

.sub-title {
  text-align: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #444;
}

.login-text {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.divider {
  margin: 0.5rem 0 1.5rem 0;
  opacity: 0.4;
}

.input-label {
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: block;
}

.bottom-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bottom-link {
  text-decoration: none;
  font-size: 0.9rem;
  color: #2C3E50;
  font-weight: 500;
}

.bottom-link:hover {
  text-decoration: underline;
}
      /* RIGHT SIDE */
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
        background: linear-gradient(
          135deg,
          rgba(0,0,0,0.7),
          rgba(0,0,0,0.5)
        );
        z-index: 2;
      }

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

      .image-overlay h3 {
        font-size: 2.2rem;
        font-weight: 700;
      }

      .image-overlay span {
        color: #00d4ff;
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

      .status-icon.success { background: #28a745; }
      .status-icon.failed { background: #dc3545; }

      /* MOBILE */
      @media (max-width: 992px) {
        .login-wrapper {
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .login-right {
          display: none;
        }

        .login-left {
          width: 100%;
          padding: 1.5rem 0;
        }

        .form-container {
          width: 90%;
          max-width: 340px;
        }
      }
      `}</style>

            <div className="login-wrapper">

                <div className="login-left">
                    <div className="form-container">

                        {/* Top Heading */}
                        <h2 className="main-title">ConnectNest</h2>
                        <h5 className="sub-title">Admin Login</h5>

                        <h6 className="login-text">Login Here!</h6>
                        <hr className="divider" />

                        <form onSubmit={handleSubmit}>

                            <label className="input-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                className="form-control mb-3"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label className="input-label">Password</label>

                            <div className="password-wrapper mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            <label className="input-label">Community Code</label>
                            <input
                                type="text"
                                name="communityCode"
                                placeholder="Enter Community Code"
                                className="form-control mb-4"
                                value={formData.communityCode}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-custom mb-3"
                                disabled={loading}
                            >
                                {loading ? "Logging In..." : "Login"}
                            </button>

                            <hr className="divider" />

                            <div className="bottom-links">
                                <Link to="/verify-email" className="bottom-link">
                                    Don't Have an Account?
                                </Link>

                                <Link to="/forget-password" className="bottom-link">
                                    Forget Password?
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="login-right">
                    <div className="image-overlay">
                        <h3>
                            Admin Panel of <span>ConnectNest</span>
                        </h3>
                        <p>Manage Your Community Smartly.</p>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {isMessageModalOpen && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center py-4">
                                <div className={`status-icon ${isSuccess ? "success" : "failed"}`}>
                                    {isSuccess ? "✔" : "✖"}
                                </div>

                                <h5 className="mt-3">
                                    {isSuccess ? "Login Successful" : "Login Failed"}
                                </h5>

                                <p className="my-3">{modalMessage}</p>

                                <button
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

export default AdLogin;