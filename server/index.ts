import express, { Application } from 'express';
import { createDBConnection } from './database';
import 'dotenv/config';

import morgan from 'morgan';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { isAuthorized } from './middlewares/auth';
import { TypedRequestBody } from './types';

import { Server } from 'socket.io';
import { createServer } from 'http';
import { messageRoutes } from './routes/message';
import { conversationRoutes } from './routes/conversation';
import path from 'path';
import { contactsRoutes } from './routes/contacts';
import { userRoutes } from './routes/user';

const app: Application = express();
const server = createServer(app);

export const chatIO = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/auth', authRoutes);
app.use('/message', messageRoutes);
app.use('/conversation', conversationRoutes);
app.use('/contact', contactsRoutes);
app.use('/user', userRoutes);

app.get('/test', isAuthorized, (req: TypedRequestBody<{}>, res) =>
  res.json({ user: req.user })
);

chatIO.on('connection', () => {
  console.log('Socket connection established.');
});

server.listen(process.env.HTTP_PORT, () => {
  console.log(`Server is running on port ${process.env.HTTP_PORT}`);
  createDBConnection();
});
