import express from 'express';
import { createReviews, getPublishReviews, getReviews, updateReviews } from '../controller/reviewsController.js';
const route = express.Router();

route.post('/create', createReviews);

route.get('/getpublish', getPublishReviews);

route.get('/get', getReviews);

route.post('/update', updateReviews);

export default route;