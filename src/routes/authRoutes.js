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
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ mensaje: "Logout exitoso" });
});

export default router;