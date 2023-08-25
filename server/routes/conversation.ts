import { Router } from 'express';
import { isAuthorized } from '../middlewares/auth';
import {
  deleteConversations,
  getConversationMessages,
  getConversations,
  updateConversation,
  getConversation,
  getConversationByUserId,
} from '../controllers/conversation';

const router = Router();
router.get('/', isAuthorized, getConversations);
router.get('/:conversationId', isAuthorized, getConversation);
router.get('/user/:userId', isAuthorized, getConversationByUserId);
router.get('/:conversationId/message', isAuthorized, getConversationMessages);
router.delete('/', isAuthorized, deleteConversations);
router.put('/:conversationId', isAuthorized, updateConversation);

export const conversationRoutes = router;
