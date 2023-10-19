import express from 'express'
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/HotelController.js';

const router = express.Router();

router.get('/hotel', getContents);
router.get('/hotel/:id', getContentById);
router.post('/hotel', saveContent);
router.put('/hotel/:id', updateContent);
router.delete('/hotel/:id', deleteContent);

export default router;
