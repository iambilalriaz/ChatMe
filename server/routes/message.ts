import { Router } from 'express';
import { isAuthorized } from '../middlewares/auth';
import { deleteMessages, sendMessage } from '../controllers/message';

const router = Router();
router.post('/', isAuthorized, sendMessage);
router.delete('/', isAuthorized, deleteMessages);

export const messageRoutes = router;
