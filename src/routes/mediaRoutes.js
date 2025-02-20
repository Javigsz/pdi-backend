import express from "express";
import { addMedia, getMedia, deleteMedia, updateMedia } from "../controllers/mediaController.js";

const router = express.Router();

router.post("/add", addMedia);
router.get("/fetch", getMedia);
router.delete("/delete", deleteMedia);
router.put("/update", updateMedia);

export default router;