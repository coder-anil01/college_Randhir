import express from 'express';
import multer from 'multer';
import { createGallery, deleteImage, getGallery } from '../controller/gallaryController.js';

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/create', upload.array('gallery'), createGallery);

route.get('/get', getGallery);

route.delete('/delete/:id', deleteImage);

export default route;