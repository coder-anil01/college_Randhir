import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    gallery:{
        type:String,
    },
  },
  {timestamps: true}
);

export default mongoose.model("gallery", gallerySchema);