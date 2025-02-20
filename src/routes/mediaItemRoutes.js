import express from "express";
import { getItem } from "../controllers/mediaItemController.js";

const router = express.Router();

router.get("/item", getItem);

export default router;