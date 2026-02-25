import React, { useState } from "react";
import axios from "../../../components/axiosInstance"
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/forget-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-page">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #2C3E50;
            position: relative;
        }
        .forget-password-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
            overflow-y: auto;
            color: #2C3E50;
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
            background-color: rgba(255, 255, 255, 0.1);
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
            max-width: 500px;
            width: 90%;
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
            background: #ECF0F1;
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
            background-color: #f8f9fa;
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
            background-color: #2C3E50;
            border-color: #2C3E50;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(44, 62, 80, 0.2);
            font-weight: 600;
            letter-spacing: 1px;
            border-radius: 9999px;
        }
        .btn-custom:hover {
        color:white;
            background-color: #1F3041;
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
            .form-container { padding: 1rem; }
            .logo-section { margin: -1rem -1rem 1rem -1rem; }
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
        
        <h2 className="form-section-title">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-card">
            <h3 className="fw-semibold form-title-text">Enter Your Details!</h3>
            <hr />
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="email" className="form-label">Enter Registered Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="col-12 mt-5 text-center">
            <button type="submit" className="btn btn-custom btn-lg px-5" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <hr />
            <p>
              <Link to="/admin-login">
                <button className="form-control btn btn-dark mt-2">Back to Login</button>
              </Link>
            </p>
          </div>
        </form>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
