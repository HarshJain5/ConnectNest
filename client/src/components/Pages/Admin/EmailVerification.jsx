import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../components/axiosInstance";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setIsSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/verify-email", { email });

      setIsSuccess(true);
      setMessage(
        "Verification link has been sent to your email. Please check inbox."
      );
    } catch (err) {
      setIsSuccess(false);
      setMessage(
        err.response?.data?.error ||
          "Failed to send verification email. Try again."
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

        .btn-custom:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
            <h5 className="sub-title">Verify Your Email</h5>

            <hr className="divider" />

            {message && (
              <div className={`custom-alert ${isSuccess ? "success-alert" : "error-alert"}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-custom"
                disabled={loading}
              >
                {loading ? "Sending..." : "Verify Email"}
              </button>

              <hr className="divider" />

              <div style={{ textAlign: "center" }}>
                <Link
                  to="/admin-login"
                  style={{ textDecoration: "none", color: "#2C3E50" }}
                >
                  Already Have an Account?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="image-overlay">
            <h3>Email Verification</h3>
            <p>We will send a secure registration link to your email.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmailVerification;