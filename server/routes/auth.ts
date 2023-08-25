import { Router } from 'express';
import { sendOTP, userLogin, userSignup, verifyOTP } from '../controllers/auth';

const router = Router();
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/otp/send', sendOTP);
router.post('/otp/verify', verifyOTP);

export const authRoutes = router;
