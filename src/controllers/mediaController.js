import Media from '../models/Media.js';
import User from '../models/User.js';
// import MediaItem from '../models/MediaItem.js';

export const addMedia = async (req, res) => {
    const { type, apiId, added, state, name, desc, image } = req.body;
    const userId = req.usuario.id;

    try {

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const newMedia = new Media({
        userId: user._id,
        type,
        name,
        desc,
        image,
        apiId,
        added,
        part: 0,
        state,
        season: 0
      });
      // check if media already exists
      const media = await Media.findOne({ apiId, type, userId: user._id });
      if (!media) {
        await newMedia.save();
        return res.status(201).json({ message: "Elemento añadido", newMedia });
      } else {
        return res.status(400).json({ error: "El elemento ya existe" });
      }

    } catch (err) {
      res.status(500).json({ error: "Error al añadir el elemento a la tabla Media" });
      console.log(err);
    }
  };
  
  // Función para obtener todos los elementos de la tabla Media
  export const getMedia = async (req, res) => {
    const userId = req.usuario.id; // Obtener el nombre de usuario de la query string

    try {
      // Buscar el usuario por nombre de usuario
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      // Buscar todos los elementos de la tabla Media con el userId del usuario encontrado
      const media = await Media.find({ userId: user._id }).select('-userId -_id -__v');
      res.status(200).json(media);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener los elementos de la tabla Media" });
      console.log(err);
    }
  };

  export const updateMedia = async (req, res) => {
    const { updateData } = req.body;
    const userId = req.usuario.id; // Obtener el nombre de usuario de la query string
    
    try {

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const media = await Media.findOneAndUpdate(
        { userId: user._id, type: updateData.type, apiId: updateData.apiId },
        { $set: updateData },
        { new: true }
      );

      if (!media) {
        return res.status(404).json({ error: "Elemento no encontrado" });
      }

      res.status(200).json({ message: "Elemento actualizado", media });
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar el elemento" });
      console.log(err);
    }
  };

  export const deleteMedia = async (req, res) => {
    const { apiId, type } = req.body;
    const userId = req.usuario.id; // Obtener el nombre de usuario de la query string

    try {
        
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const media = await Media.findOneAndDelete({ apiId, type, userId: user._id });

      if (!media) {
        return res.status(404).json({ error: "Elemento no encontrado" });
      }

      res.status(200).json({ message: "Elemento eliminado" });
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar el elemento" });
      console.log(err);
    }
  };
