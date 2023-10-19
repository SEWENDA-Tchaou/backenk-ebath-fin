import express from 'express'
import {
    getContents,
    getContentById,
    saveContent,
    updateContent,
    deleteContent
} from '../controllers/BtpController.js';

const router = express.Router();

router.get('/btp', getContents);
router.get('/btp/:id', getContentById);
router.post('/btp', saveContent);
router.put('/btp/:id', updateContent);
router.delete('/btp/:id', deleteContent);

export default router;
