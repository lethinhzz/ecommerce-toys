import express from 'express';
import { addCategory, removeCategory, listCategory } from '../controllers/categoryController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const categoryRouter = express.Router();

categoryRouter.post('/add', adminAuth,upload.fields([{name:'image', maxCount:1}]),addCategory);
categoryRouter.post('/remove', adminAuth, removeCategory)
categoryRouter.get('/list', listCategory)

export default categoryRouter;