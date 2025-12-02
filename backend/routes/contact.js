import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Send contact form email
 * @access  Public
 */
router.post('/contact', sendContactEmail);

export default router;
