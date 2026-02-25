import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Contextapi, ContextProvider } from './contextapi/Contextapi';
import Header from './components/Header';
import Footer from './components/Footer';
import Path from './components/Path';
import Register from './components/Pages/Admin/Register';
import ResidentLogin from './components/Pages/User/ResidentLogin';
import AdLogin from './components/Pages/Admin/AdLogin';
import PendingAdmin from './components/Pages/SuperAdmin/PendigAdmin';
import ForgetPassword from './components/Pages/Admin/ForgetPassword';
import ResetPassword from './components/Pages/Admin/ResetPassword';
import ProtectedRoute from "./components/ProtecteRoute";
import { useContext, useEffect } from 'react';
import axios from 'axios';
import ResidentDashboard from './components/Pages/User/ResidentDashboard';
import ManageResidents from './components/Pages/Admin/ManageResidents';
import ManageAnnouncements from './components/Pages/Admin/ManageAnnouncements';
import ResidentProfile from './components/Pages/User/ResidentProfile';
import ManageBills from './components/Pages/Admin/ManageBills';
import ResidentBills from './components/Pages/User/ResidentBills';
import ResidentComplaint from './components/Pages/User/ResidentComplaint';
import ManageComplaints from './components/Pages/Admin/ManageComplaints';
import AdminDashboard from './components/Pages/Admin/AdminDashboard';
import EmailVerification from './components/Pages/Admin/EmailVerification';
import VerifyEmail from './components/Pages/Admin/VerifyEmail';

function App() {
  const { token } = useContext(Contextapi) || {};

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);
  return (
    <ContextProvider>
      <Router>
        <Routes>{/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/manage-residents" element={<ManageResidents />} />
          <Route path="/admin/manage-announcements" element={<ManageAnnouncements />} />
          <Route path="/admin/manage-bills" element={<ManageBills />} />
          <Route
            path="/admin/complaints"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageComplaints />
              </ProtectedRoute>
            }
          />
          {/* Login Routes */}
          <Route path='/' element={<Path />}></Route>
          <Route path="/verify-email/" element={<EmailVerification />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path='/register' element={<Register />}></Route>
          <Route path="/admin-login" element={<AdLogin />} />
          <Route path="/resident-login" element={<ResidentLogin />} />

          <Route path='/super-admin/pending-admins' element={<PendingAdmin />}></Route>

          <Route path='/forget-password' element={<ForgetPassword />}></Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />


          <Route
            path="/resident/dashboard"
            element={
              <ProtectedRoute allowedRoles={["resident"]}>
                <ResidentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/bills"
            element={
              <ProtectedRoute allowedRoles={["resident"]}>
                <ResidentBills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resident/profile"
            element={
              <ProtectedRoute allowedRoles={["resident"]}>
                <ResidentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/complaints"
            element={
              <ProtectedRoute allowedRoles={["resident"]}>
                <ResidentComplaint />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;



