import express from 'express';
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/ContentController.js';

const router = express.Router();

router.get('/contents', getContents);
router.get('/contents/:id', getContentById);
router.post('/contents', saveContent);
router.put('/contents/:id', updateContent);
router.delete('/contents/:id', deleteContent);

export default router;
