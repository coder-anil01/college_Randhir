import express from 'express';
import multer from 'multer';
import { admition } from '../controller/userAdmitionController.js';

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/create', upload.array('otherDocument'), admition);

export default route;