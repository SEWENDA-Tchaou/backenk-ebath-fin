import express from 'express'
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/BackgroundController.js';

const router = express.Router();

router.get('/background', getContents);
router.get('/background/:id', getContentById);
router.post('/background', saveContent);
router.put('/background/:id', updateContent);
router.delete('/background/:id', deleteContent);

export default router;
