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
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <style>
        {`.btn-custom {
                color:white;
                    background-color: #2C3E50;
                    border-color: #2C3E50;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(44, 62, 80, 0.2);
                    font-weight: 600;
                    letter-spacing: 1px;
                    border-radius: 9999px;
                }
                .btn-custom:hover {
                color:white
                    background-color: #1F3041;
                    border-color: #1F3041;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(44, 62, 80, 0.3);
                }`}
      </style>
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "16px" }}
      >
        <h3 className="text-center fw-bold mb-3">Verify Your Email</h3>

        <p className="text-muted text-center">
          Enter your email to receive registration link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`alert ${
                isSuccess ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
          <div className="col-12  text-center">
          <button
            type="submit"
            className="btn btn-custom  px-4"
            disabled={loading}
          >
            {loading ? "Sending..." : "Verify Email"}
          </button>
          <hr />
              <p className="text-center mt-3"><Link to="/admin-login" className="text-dark text-decoration-none">Already Have an Account?</Link></p>
        </div>
        </form>
        
      </div>
    </div>
  );
};

export default EmailVerification;
