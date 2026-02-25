// import { createContext, useState } from "react";

// export const Contextapi = createContext(null);

// export function ContextProvider({ children }) {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loginName, setLoginName] = useState(localStorage.getItem("loginName") || null);
//   const [role, setRole] = useState(localStorage.getItem("role") || null);

//   // ✅ Login hone ke baad save
//   const saveAuthData = (token, loginName, role) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("loginName", loginName);
//     localStorage.setItem("role", role);

//     setToken(token);
//     setLoginName(loginName);
//     setRole(role);
//   };

//   // ✅ Logout hone ke baad clear
//   const clearAuthData = () => {
//     localStorage.clear();
//     setToken(null);
//     setLoginName(null);
//     setRole(null);
//   };

//   return (
//     <Contextapi.Provider
//       value={{ token, loginName, role, saveAuthData, clearAuthData }}
//     >
//       {children}
//     </Contextapi.Provider>
//   );
// }

import { createContext, useState, useEffect } from "react";

export const Contextapi = createContext(null);

export function ContextProvider({ children }) {

  const [auth, setAuth] = useState({
    token: null,
    user: null
  });

  // 🔄 Restore on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginName = localStorage.getItem("loginName");
    const role = localStorage.getItem("role");
    const communityName = localStorage.getItem("communityName");

    if (token) {
      setAuth({
        token,
        user: {
          loginName,
          role,
          communityName
        }
      });
    }
  }, []);

  // ✅ Save after login
  const saveAuthData = (token, loginName, role, communityName) => {

    localStorage.setItem("token", token);
    localStorage.setItem("loginName", loginName);
    localStorage.setItem("role", role);
    localStorage.setItem("communityName", communityName);

    setAuth({
      token,
      user: {
        loginName,
        role,
        communityName
      }
    });
  };

  // ✅ Logout (Better than localStorage.clear())
  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginName");
    localStorage.removeItem("role");
    localStorage.removeItem("communityName");

    setAuth({
      token: null,
      user: null
    });
  };

  return (
    <Contextapi.Provider
      value={{
        auth,
        token: auth.token,
        user: auth.user,
        saveAuthData,
        clearAuthData
      }}
    >
      {children}
    </Contextapi.Provider>
  );
}