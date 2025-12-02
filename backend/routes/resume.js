import express from 'express';
import { downloadResume } from '../controllers/resumeController.js';

const router = express.Router();

/**
 * @route   GET /api/resume
 * @desc    Download resume PDF
 * @access  Public
 */
router.get('/resume', downloadResume);

export default router;
