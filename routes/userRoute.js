import express from 'express';
import { checkAuth, getMyData, getUser, loginUser, ourStudent, userRegister } from '../controller/userController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();

route.post('/create', upload.single('file'), userRegister);

route.post('/login', loginUser);


route.get('/getusers', getUser);

route.post('/authcheck', checkAuth);

route.post('/mydata', getMyData);

route.get('/ourstudent', ourStudent);

export default route;