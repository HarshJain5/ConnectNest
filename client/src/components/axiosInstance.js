// import axios from "axios";

// const instance = axios.create({
//   baseURL: "/", // common base URL
// });

// // Request interceptor: automatically add token
// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Response interceptor: handle 401 (expired or invalid token)
// instance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       const errMsg = err.response.data?.error;
//       if (errMsg === "Token expired") {
//         alert("Session expired. Please login again.");
//       } else {
//         alert(errMsg || "Unauthorized access. Please login.");
//       }
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     }
//     return Promise.reject(err);
//   }
// );

// export default instance;

import axios from "axios";


const instance = axios.create({
  baseURL: "https://connectnest-lfzk.onrender.com" || '/',

});

// ✅ Add token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Handle token expiry globally
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;

    // 🚫 Skip login API (important fix)
    if (originalRequest.url.includes("resident-login")) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      const errMsg = err.response.data?.error;

      if (errMsg === "Token expired") {
        localStorage.removeItem("token");

        // 🔥 Instead of alert → custom event trigger
        window.dispatchEvent(
          new CustomEvent("sessionExpired", {
            detail: errMsg || "Session expired. Please login again.",
          })
        );

        window.location.href = "/";
      }
    }

    return Promise.reject(err);
  }
);

export default instance;


// 🔥 BONUS — Alert ko Modal Me Convert Karna

// Ab login page me ye add karo:

// useEffect(() => {
//   const handleSessionExpired = (event) => {
//     setIsSuccess(false);
//     setModalMessage(event.detail);
//     setIsMessageModalOpen(true);
//   };

//   window.addEventListener("sessionExpired", handleSessionExpired);

//   return () => {
//     window.removeEventListener("sessionExpired", handleSessionExpired);
//   };
// }, []);

// Aur useEffect import karna mat bhoolna:

// import React, { useState, useContext, useEffect } from "react";
