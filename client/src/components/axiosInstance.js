import axios from "axios";


const instance = axios.create({
  baseURL: "/",

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


