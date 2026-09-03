import express from 'express';
import { createLead } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', createLead);

export default router;
