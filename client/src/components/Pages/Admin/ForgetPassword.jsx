import React, { useState } from "react";
import axios from "../../../components/axiosInstance"
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError("");
setSuccess("");
    e.preventDefault();
    setLoading(true);

    try {
  const res = await axios.post("/api/auth/forget-password", { email });

  setSuccess(res.data.message);
  setError("");

} catch (err) {
  setSuccess("");

  if (err.response && err.response.data) {
    setError(err.response.data.message || err.response.data.error);
  } else {
    setError("Something went wrong.");
  }
} finally {
  setLoading(false);
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

      .login-text {
        font-weight: 600;
        margin-bottom: 0.5rem;
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

      @media (max-width: 992px) {

  body {
    background: linear-gradient(135deg,#eef2f7,#f8f9fb);
  }

  .login-wrapper {
    flex-direction: column;
    min-height: 100dvh;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  .login-right {
    display: none;
  }

  .login-left {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    width: 92%;
    max-width: 380px;
    padding: 1.8rem;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .main-title {
    font-size: 1.6rem;
  }

  .sub-title {
    font-size: 0.95rem;
  }

  .login-text {
    font-size: 0.9rem;
  }

  .form-control {
    padding: 0.8rem 1.2rem;
  }

  .btn-custom {
    padding: 0.8rem;
  }
}
  .admin-login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
    `}</style>

    <div className="login-wrapper">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="form-container">

          <h2 className="main-title">ConnectNest</h2>
          <h5 className="sub-title">Forgot Password</h5>

{error && (
  <div className="custom-alert error-alert">
    {error}
  </div>
)}

{success && (
  <div className="custom-alert success-alert">
    {success}
  </div>
)}

          <h6 className="login-text">Reset Your Password</h6>
          <hr className="divider" />

          <form onSubmit={handleSubmit}>

            <label className="input-label">Registered Email</label>
            <input
              type="email"
              className="form-control mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-custom mb-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <hr className="divider" />

            <div style={{textAlign:"center"}}>
              <Link to="/admin-login" className="bottom-link">
                Back to Login
              </Link>
            </div>

          </form>

          

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="image-overlay">
          <h3>Account Security</h3>
          <p>Secure access to your community dashboard.</p>
        </div>
      </div>

    </div>
  </div>
);
}

export default ForgetPassword;



