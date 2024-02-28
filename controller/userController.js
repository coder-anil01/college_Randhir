import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userModel from '../model/userModel.js';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });

// REGISTER
export const userRegister = async(req, res) => {
    const {name, email, password, answer, profileImg} = req.body;
    try {
        const existUser = await userModel.findOne({email});
        if(existUser){
            return res.status(200).send({ success : false, message: "User Alredy Exist"});
        }else{
            const hashPassword = await bcrypt.hash(password, 10);
            const hostImage = await cloudinary.uploader.upload(profileImg,{folder: 'school'});
            const user= await new userModel({name, email, password:hashPassword, answer, profileImg: hostImage.secure_url}).save();
            const token = await JWT.sign({user}, jwtsecret);
            res.status(200).send({
                success: true,
                message: "Register Successfully",
                user,
                token,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}

//LOGIN
export const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const existUser = await userModel.findOne({email});
        if(!existUser){
            return res.status(200).send({ success: false, message: "User Not Exist"});
        }
        const match = await bcrypt.compare(password, existUser.password);
        if (!match) {
            return res.status(200).send({success: false, message: "Inviled Password"});
        }
        const token = await JWT.sign({existUser}, jwtsecret);
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          user: existUser,
          token,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}




// Admin Check
export const checkAuth = async(req, res) => {
    const {id} = req.body;
    try {
        const admin = await userModel.findById(id);
        if(admin?.user?.role === 8987){
            res.status(200).send({
                success: true,
                message: "Welcome Admin",
            })
        }else{
            res.status(200).send({
                success: false,
                message: "Unauthorize Access",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
          });
    }
}