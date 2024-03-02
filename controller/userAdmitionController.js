import userAdmitionModel from "../model/userAdmitionModel.js"
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import userdetailsModel from "../model/userdetailsModel.js";
import userModel from "../model/userModel.js";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });


//****************************/  UESER + ADMIN /*************************************//
//  CREATE
export const admition = async(req, res) => {
    const {name,email,phone,profileImg,dob,course,fatherName,motherName,aadharcard,prevCertificate,otherDocument} = req.body;
    try {
        let base64Images = [...aadharcard, ...prevCertificate, ...profileImg, ...otherDocument];
        const imagesUrl = [];
        for(const imagePath of base64Images){
            const result = await cloudinary.uploader.upload(imagePath);
            imagesUrl.push(result.secure_url);
        }
        const otherDocimg = imagesUrl.slice(3)
        const user = await new userAdmitionModel({name,email,phone,dob,course,fatherName,motherName,aadharcard:imagesUrl[0],prevCertificate:imagesUrl[1],profileImg:imagesUrl[2],otherDocument:otherDocimg}).save();
        res.status(200).send({
            success: true,
            message: "Form Submited"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

export const userAdmitionCheck = async(req, res) => {
    const {email, name} = req.body;
    try {
        const admition = await userAdmitionModel.findOne({email, name});
        res.status(200).send({
            success: true,
            admition,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}



//****************************/ ADMIN /*************************************//
// GET
export const getAdmition = async(req, res) => {
    try {
        const admition = await userAdmitionModel.find({status: "Pending"}).sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            admition,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

// APPROVE ADMITION
export const approveAdmition = async(req, res) => {
    const {name,email,phone,profileImg,dob,course,fatherName,motherName,aadharcard,prevCertificate,otherDocument, _id} = req.body.selectedData;
    try {
        const admition = await new userdetailsModel({dob,phone,course,fatherName,motherName,aadharcard,prevCertificate,otherDocument}).save();
        const existUser = await userModel.findOneAndUpdate({email}, { $set: {details: admition._id, profileImg},}, {new: true});
        await userAdmitionModel.findByIdAndDelete(_id);
        res.status(200).send({
            success: true,
            message: "Admition Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}


// APPROVE ADMITION
export const rejectAdmition = async(req, res) => {
    const {id} = req.body;
    try {
        const admition = await userAdmitionModel.findByIdAndUpdate(id, {status: "Rejected"})
        res.status(200).send({
            success: true,
            message: "Admition Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}