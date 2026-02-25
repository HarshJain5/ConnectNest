const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers?.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token" });
      }

      const token = authHeader.split(" ")[1];

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
      }

      // Role check
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden - Role not allowed" });
      }

      req.user = decoded; // { userId, role, communityId }
      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      return res.status(500).json({ error: "Server error in authentication" });
    }
  };
};

module.exports = authMiddleware;
