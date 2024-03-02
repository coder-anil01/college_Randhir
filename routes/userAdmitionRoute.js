import express from 'express';
import multer from 'multer';
import { admition, approveAdmition, getAdmition, rejectAdmition, userAdmitionCheck } from '../controller/userAdmitionController.js';

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/create', upload.array('otherDocument'), admition);

route.post('/useradmitioncheck', userAdmitionCheck);


// ADMIN
route.get('/get', getAdmition);

route.post('/admitionapprove', approveAdmition);

route.post('/admitionrejected', rejectAdmition);


export default route;