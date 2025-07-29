import express from 'express';
import { loginUser, registerUser, verifyUser } from '../controllers/user.controller.js';
// create a mini router
const router = express.Router();
router.post("/register", registerUser)
router.get("/verify/:token", verifyUser);
router.get("/login", loginUser);
export default router;