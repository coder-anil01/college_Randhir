import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name:{
        type: String,
    },
    profileImg:{
        type: String,
    },
    star:{
      type:Number,
    },
    message:{
        type: String,
    },
    publish:{
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("reviews", reviewSchema);