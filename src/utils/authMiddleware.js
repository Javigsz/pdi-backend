import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(400).json({ error: "Token inválido" });
  }
};