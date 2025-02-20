import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const MIN_PASSWORD_LENGTH = 8;
    const MIN_USERNAME_LENGTH = 3;
    const MAX_USERNAME_LENGTH = 20;

    try {
      // Check if the user already exists
      const existingUsername = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });
      
      if (existingUsername) {
        return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
      }
  
      if (existingEmail) {
        return res.status(400).json({ error: "El email ya está en uso" });
      }

      if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ error: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres` });
      }

      if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
        return res.status(400).json({ error: `El nombre de usuario debe tener entre ${MIN_USERNAME_LENGTH} y ${MAX_USERNAME_LENGTH} caracteres` });
      }

      if( username === "admin" || username === "Invitado" ) {
        return res.status(400).json({ error: "No se permite el registro de usuarios con el nombre de usuario 'admin' o 'Invitado'" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "Usuario registrado" });
    } catch (err) {
      res.status(500).json({ error: "Error en el servidor" });
      console.log(err);
    }
  };

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie('token', token, {
      httpOnly: true,  // No accesible desde JavaScript (previene XSS)
      secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS en producción
      sameSite: 'None',  // Protege contra CSRF
      maxAge: 5200000
    });
  
    res.status(200).json({ mensaje: 'Login exitoso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

export { register, login };