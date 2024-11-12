// lib/authMiddleware.js
export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ message: "Authentication required" });
    }
  
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [email, password] = credentials.split(":");
  
    if (email === "admin@admin.com" && password === "admin123") {
      next(); // Authentication successful
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
  