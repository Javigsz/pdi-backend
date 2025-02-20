import MediaItem from '../models/MediaItem.js';

// Función para obtener un elemento de la tabla MediaItem
export const getItem = async (req, res) => {
    const { apiId, type } = req.query;
  try {
    const mediaItem = await MediaItem.findOne({ apiId, type });
    if (!mediaItem) {
      return res.status(404).json({ error: "MediaItem no encontrado" });
    }
    res.status(200).json(mediaItem);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el elemento de la tabla MediaItem" });
    console.log(err);
  }
};