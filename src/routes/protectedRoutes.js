import express from "express";
import { verificarJWT } from "../controllers/sesionController.js";

const router = express.Router();

router.get("/endpoint", verificarJWT, (req, res) => {
  res.json({ mensaje: "Esta es una ruta protegida", username: req.usuario.username });
});

export default router;