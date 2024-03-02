import mongoose from "mongoose";

const userdetailsSchema = new mongoose.Schema(
  {
    dob:{
        type: Date,
    },
    phone:{
        type: Number,
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

export default mongoose.model("usersdetails", userdetailsSchema);