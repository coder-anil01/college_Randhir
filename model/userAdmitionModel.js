import mongoose from "mongoose";

const useradmitionSchema = new mongoose.Schema(
  {
    name:{
        type: String,
    },
    email:{
      type: String,
    },
    phone:{
      type: Number,
    },
    profileImg:{
        type: String,
    },
    dob:{
        type: String,
    },
    course:{
        type: String,
    },
    fatherName:{
        type: String,
    },
    motherName:{
        type: String,
    },
    aadharcard:{
        type: String,
    },
    prevCertificate:{
        type: String,
    },
    otherDocument:[{
        type: String,
    },],
    status:{
        type: String,
        default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("usersadmition", useradmitionSchema);