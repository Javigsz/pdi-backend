import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import { verificarJWT } from "./controllers/sesionController.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware CORS antes que cualquier otra cosa
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.use(express.json()); // Para permitir JSON en el body

app.use(cookieParser()); // Para usar cookies

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/media", verificarJWT, mediaRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});