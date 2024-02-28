import express from 'express';
import { checkAuth, loginUser, userRegister } from '../controller/userController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();

route.post('/create', upload.single('file'), userRegister);

route.post('/login', loginUser);

route.post('/authcheck', checkAuth);

export default route;