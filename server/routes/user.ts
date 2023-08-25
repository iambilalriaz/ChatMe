import { Router } from 'express';
import { isAuthorized } from '../middlewares/auth';
import { getUserDetails, getUserMessages } from '../controllers/user';

const router = Router();
router.get('/:userId', isAuthorized, getUserDetails);
router.get('/:userId/messages', isAuthorized, getUserMessages);

export const userRoutes = router;
