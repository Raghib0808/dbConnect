import express from 'express';
import { registerUser } from '../controllers/user.controller.js';

// create a mini router
const router = express.Router();
router.post("/register", registerUser)

export default router;