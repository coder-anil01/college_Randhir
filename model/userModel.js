import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      require: true,
    },
    email:{
      type: String,
      require: true,
      unique: true,
    },
    password:{
      type: String,
      require: true,
    },
    answer:{
      type: String,
      require: true,
    },
    profileImg:{
        type: String,
    },
    role:{
      type: Number,
      default: 0,
    },
    details:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'usersdetails'
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);