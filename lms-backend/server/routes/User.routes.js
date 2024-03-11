import { Router } from "express";
import { getProfile , login, logout, register, forgotPassword,resetPassword,changePassword, updatedUser} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router =Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login); 
router.get('/logout', logout);
router.post('/me',isLoggedIn, getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/change-password',isLoggedIn, changePassword);
router.put('/update/:id', isLoggedIn, upload.single('avatar'),updatedUser);



export default router;