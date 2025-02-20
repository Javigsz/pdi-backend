import express from "express";
import { register, login } from "../controllers/authController.js";
import { verificarJWT } from "../controllers/sesionController.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", verificarJWT, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,  // No accesible desde JavaScript (previene XSS)
      secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS en producción
      sameSite: 'None',  // Protege contra CSRF
      maxAge: 5200000
  });
  res.status(200).json({ mensaje: "Logout exitoso" });
});

export default router;