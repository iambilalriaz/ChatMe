import { validate } from 'email-validator';
import { Message } from '../models/message';
import { IMessage, IUser, TypedRequestBody } from '../types';
import { User } from '../models/user';
import { Conversation } from '../models/conversation';
import { Response } from 'express';
import { chatIO } from '..';

export const sendMessage = async (
  req: TypedRequestBody<{ message: string; sendTo: string }>,
  res: any
) => {
  try {
    const senderId = req.user?.id;
    const messageText = req.body.message;
    const sendTo = req.body.sendTo;
    if (!senderId) {
      return res.status(500).json({ message: 'Sender information missing.' });
    }
    if (!messageText?.trim()) {
      return res.status(400).json({ message: 'Message should not be empty.' });
    }
    if (!validate(sendTo)) {
      return res
        .status(400)
        .json({ message: 'Invalid recipient email address.' });
    }
    const reciever = await User.findOne({ email: sendTo });
    if (!reciever) {
      return res.status(404).json({ message: 'Recipient does not exist.' });
    }
    const recieverId = reciever?._id.toString();
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    let newMessage: IMessage = {
      sender: senderId,
      reciever: recieverId,
      text: messageText,
    };

    if (!conversation) {
      const conversationToBeCreated = new Conversation({
        participants: [senderId, recieverId],
        marked_as_read: false,
        last_message_text: newMessage.text,
      });
      const convo = await conversationToBeCreated.save();
      newMessage.conversation_id = convo?._id.toString();
    } else {
      await conversation.updateOne({ last_message_text: newMessage.text });
      newMessage.conversation_id = conversation?._id.toString();
    }
    const messageToBeSent = new Message(newMessage);
    await messageToBeSent.save();
    return res.status(200).json({ message: 'Message sent successfully.' });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const deleteMessages = async (
  req: TypedRequestBody<{ messages: string[] }>,
  res: Response
) => {
  const messages = req.body.messages;
  if (!messages?.length) {
    return res.status(400).json({ message: 'Messages are missing.' });
  }
  try {
    const allMessages = messages.map(
      async (messageId) => await Message.findById(messageId)
    );

    const resolvedMessages = (await Promise.all(allMessages))?.filter(
      (message) => message
    );

    const userMessages = resolvedMessages?.filter(
      (message) =>
        message?.sender === req.user?.id || message?.reciever === req.user?.id
    );
    if (userMessages?.length !== resolvedMessages?.length) {
      return res.status(405).json({ message: 'Operation not allowed.' });
    }

    if (resolvedMessages?.length === messages?.length) {
      messages.forEach(async (message) => {
        await Message.findByIdAndDelete(message);
      });
      return res
        .status(200)
        .json({ message: 'Messages deleted successfully.' });
    } else {
      return res
        .status(404)
        .json({ message: 'Some messages not found in database' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
