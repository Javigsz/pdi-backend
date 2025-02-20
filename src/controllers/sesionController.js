import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const verificarJWT = (req, res, next) => {

    const token = req.cookies.token;  // Recuperar el token de la cookie
  
    if (!token) {
      return res.status(401).json({ mensaje: 'No se proporcionó token' });
    }
  
    // Verificar y decodificar el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
      }
  
      // Si el token es válido, agregar la información del usuario al request
      req.usuario = decoded;
      next();
    });
  }

export { verificarJWT };