import { Router } from 'express';
import { isAuthorized } from '../middlewares/auth';
import { getUserContacts } from '../controllers/contacts';

const router = Router();
router.get('/', isAuthorized, getUserContacts);

export const contactsRoutes = router;
