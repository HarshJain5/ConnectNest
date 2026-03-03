import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../../components/axiosInstance"

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔐 strong password validation
  const handlePasswordChange = (value) => {
    setPassword(value);

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, number & special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) return;

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage(res.data.message);
      setTimeout(() => navigate("/admin-login"), 2000);

    } catch (err) {
      setMessage(
        err.response?.data?.error || "❌ Invalid or expired link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="admin-login-page">

    <style>{`
      body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg,#eef2f7,#f8f9fb);
      }


      .password-wrapper {
  position: relative;
  margin-bottom: 18px;
}



.password-wrapper input {
  border-radius: 50px;
  padding-right: 45px;
}

.toggle-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #2C3E50;
  display: flex;
  align-items: center;
}

      .login-wrapper {
        min-height: 100vh;
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

      .divider {
        margin: 0.5rem 0 1.5rem 0;
        opacity: 0.4;
      }

      .form-control {
        border-radius: 50px;
        padding: 0.9rem 1.4rem;
        border: 1px solid #e0e0e0;
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
        width: 100%;
        color: white;
        margin-top: 10px;
      }

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
      }

      .image-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        padding: 40px;
        z-index: 2;
      }

      .custom-alert {
        padding: 12px 18px;
        border-radius: 12px;
        margin-bottom: 15px;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .error-alert {
        background-color: #fdecea;
        color: #b71c1c;
        border: 1px solid #f5c2c7;
      }

      .success-alert {
        background-color: #e8f5e9;
        color: #1b5e20;
        border: 1px solid #a5d6a7;
      }

      .form-control.is-invalid {
  background-image: none !important;
  padding-right: 45px !important;
}

      @media (max-width: 992px) {
  .login-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login-left {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .form-container {
    width: 100%;
    max-width: 380px;
    padding: 1.8rem;
    border-radius: 20px;
  }

  .login-right {
    display: none;
  }

  .main-title {
    font-size: 1.6rem;
  }

  .sub-title {
    font-size: 0.9rem;
  }
}
    `}</style>

    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="form-container">

          <h2 className="main-title">ConnectNest</h2>
          <h5 className="sub-title">Reset Password</h5>

          <hr className="divider" />

          {/* MESSAGE ABOVE FORM */}
          {message && (
            <div className={`custom-alert ${message.startsWith("❌") ? "error-alert" : "success-alert"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="form-label">New Password</label>

<div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    className={`form-control ${passwordError ? "is-invalid" : ""}`}
    value={password}
    onChange={(e) => handlePasswordChange(e.target.value)}
    required
  />

  <span
    className="toggle-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
  </span>
</div>

            {passwordError && (
              <small className="text-danger mb-3 d-block">{passwordError}</small>
            )}

            <label className="form-label mt-3">Confirm Password</label>

<div className="password-wrapper">
  <input
    type={showConfirmPassword ? "text" : "password"}
    className="form-control"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />

  <span
    className="toggle-icon"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
  </span>
</div>
            <button
              type="submit"
              className="btn btn-custom mb-3"
              disabled={loading || passwordError}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <hr className="divider" />

            <div style={{textAlign:"center"}}>
              <Link to="/admin-login" style={{textDecoration:"none", color:"#2C3E50"}}>
                Back to Login
              </Link>
            </div>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="image-overlay">
          <h3>Secure Password Update</h3>
          <p>Your new password must be strong and secure.</p>
        </div>
      </div>

    </div>
  </div>
);
}

export default ResetPassword;