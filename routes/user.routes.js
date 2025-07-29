import express from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { verifyUser } from '../controllers/user.controller.js';
// create a mini router
const router = express.Router();
router.post("/register", registerUser)
router.get("/verify/:token", verifyUser);
export default router;