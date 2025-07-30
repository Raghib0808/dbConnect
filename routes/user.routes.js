import express from 'express';
import { getMe, loginUser, logOutUser, registerUser, verifyUser } from '../controllers/user.controller.js';
import isLoggedIn from '../middleware/user.middleware.js';
// create a mini router
const router = express.Router();
router.post("/register", registerUser)
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, getMe)
router.get("/logout", logOutUser)
router.get("/forgotpassword", logOutUser)
router.get("/resetpassword", logOutUser)
export default router;