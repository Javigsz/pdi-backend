import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    apiId: { type: String, required: true },
    name: { type: String },
    desc: { type: String },
    image: { type: String },
    added: { type: Date },
    part: { type: Number },
    state: { type: Number },
    season: { type: Number }
  });

  mediaSchema.index({ userId: 1, apiId: 1, type: 1 }, { unique: true });

export default mongoose.model("Media", mediaSchema);