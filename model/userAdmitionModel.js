import mongoose from "mongoose";

const useradmitionSchema = new mongoose.Schema(
  {
    name:{
        type: String,
    },
    email:{
      type: String,
    },
    profileImg:{
        type: String,
    },
    dob:{
        type: Date,
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
  },
  { timestamps: true }
);

export default mongoose.model("usersadmition", useradmitionSchema);