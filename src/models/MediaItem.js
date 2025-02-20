import mongoose from "mongoose";

const mediaItemSchema = new mongoose.Schema({
  apiId: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String },
  image: { type: String },
  type: { type: String, required: true }
});

mediaItemSchema.index({ apiId: 1, type: 1 }, { unique: true });

export default mongoose.model("MediaItem", mediaItemSchema);