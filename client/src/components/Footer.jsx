import { useContext } from "react";
import { Contextapi } from "../contextapi/Contextapi";

function Footer() {
  const { token, role } = useContext(Contextapi);

  if (!token) return null; // agar login nahi hai → footer hide

  return (
    <footer className="text-center bg-light py-2 mt-5">
      {role === "admin" ? (
        <p>Admin Portal © 2025</p>
      ) : (
        <p>Resident Portal © 2025</p>
      )}
    </footer>
  );
}

export default Footer;








