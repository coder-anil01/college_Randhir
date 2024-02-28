import userAdmitionModel from "../model/userAdmitionModel.js"
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });

export const admition = async(req, res) => {
    const {name,email,profileImg,dob,course,fatherName,motherName,aadharcard,prevCertificate,otherDocument} = req.body;
    try {
        let base64Images = [...aadharcard, ...prevCertificate, ...otherDocument];
        const imagesUrl = [];
        for (let i = 0; i < base64Images.length; i++) {
            const imagePath = base64Images[i];
            const result = await cloudinary.uploader.upload(imagePath);
            let url = result.secure_url;
            imagesUrl.push(url);
        }
        const otherDocimg = imagesUrl.slice(2)
        const user = await new userAdmitionModel({name,email,profileImg,dob,course,fatherName,motherName,aadharcard:imagesUrl[0],prevCertificate:imagesUrl[1],otherDocument:otherDocimg}).save();
        res.status(200).send({
            success: true,
            message: "Form Submited"
        })
    } catch (error) {
        console.log(error)
    }
}