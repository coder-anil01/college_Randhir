import galleryModel from "../model/galleryModel.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDNEARY_NAME,
    api_key: process.env.CLOUDNEARY_API_KEY,
    api_secret: process.env.CLOUDNEARY_API_SECRET,
  });

export const createGallery = async(req, res) => {
    const {images} = req.body;
    try {
        for (let i = 0; i < images.length; i++) {
            const element = images[i];
            const hostImage = await cloudinary.uploader.upload(element,{folder: 'school'});
            await new galleryModel({gallery: hostImage?.secure_url}).save();
        }
        const fetch = await galleryModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "Photo Upload Successfuly",
            images:fetch,
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

export const getGallery = async(req, res) => {
    try {
        const images = await galleryModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            images,
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

export const deleteImage = async(req, res) => {
    const {id} = req.params;
    try {
        await galleryModel.findByIdAndDelete(id);
        const images = await galleryModel.find({}).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "Image Delete Successfull",
            images,
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