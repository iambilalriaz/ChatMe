import { Request, Response } from 'express';
import { Conversation } from '../models/conversation';
import { IUser, TypedRequestBody } from '../types';
import { Message } from '../models/message';
import { Types } from 'mongoose';
import { getUser } from '../utils';

export const getConversations = async (
  req: TypedRequestBody<{}>,
  res: Response
) => {
  const userId = req.user?.id;
  try {
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    });
    console.log(conversations);
    // Create an array of promises for all getUser calls
    const getUserPromises = conversations.map(async ({ participants }) => {
      const otherUser = participants.find(
        (participant) => participant !== userId
      );
      const user = await getUser(otherUser as string);
      return user as IUser;
    });

    // Wait for all getUser promises to resolve
    const users = await Promise.all(getUserPromises);
    const response = conversations.map(
      ({
        _id,
        participants,
        marked_as_read,
        createdAt,
        last_message_text,
      }) => ({
        id: _id,
        participants: [
          {
            id: req.user?.id,
            name: req.user?.name,
            profile_image: req.user?.profile_image,
            email: req.user?.email,
          },
          users.find(({ id }) => id !== userId && participants?.includes(id)),
        ],
        markedAsRead: marked_as_read,
        lastMessageSent: last_message_text,
        createdAt,
      })
    );
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getConversation = async (
  req: TypedRequestBody<{}>,
  res: Response
) => {
  const userId = req.user?.id;
  const conversationId = req.params?.conversationId;
  try {
    const conversation = await Conversation.findOne({
      participants: { $in: [userId] },
      _id: conversationId,
    });
    const otherParticipant = conversation?.participants.find(
      (participant) => participant !== userId
    );
    const otherUserInfo = await getUser(otherParticipant as string);

    const response = {
      id: conversation?._id,
      participants: [
        {
          id: req.user?.id,
          name: req.user?.name,
          profile_image: req.user?.profile_image,
          email: req.user?.email,
        },
        otherUserInfo,
      ],
      markedAsRead: conversation?.marked_as_read,
      lastMessageSent: conversation?.last_message_text,
      createdAt: conversation?.createdAt,
    };
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
export const getConversationByUserId = async (
  req: TypedRequestBody<{}>,
  res: Response
) => {
  const loggedInUser = req.user?.id;
  const reciepientUserId = req.params?.userId;
  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [reciepientUserId, loggedInUser] },
    });
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }
    const otherParticipant = conversation?.participants.find(
      (participant) => participant !== loggedInUser
    );
    const otherUserInfo = await getUser(otherParticipant as string);

    const response = {
      id: conversation?._id,
      participants: [
        {
          id: req.user?.id,
          name: req.user?.name,
          profile_image: req.user?.profile_image,
          email: req.user?.email,
        },
        otherUserInfo,
      ],
      markedAsRead: conversation?.marked_as_read,
      lastMessageSent: conversation?.last_message_text,
      createdAt: conversation?.createdAt,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const getConversationMessages = async (
  req: TypedRequestBody<{} & { conversationId: string }>,
  res: Response
) => {
  const conversationId = req.params?.conversationId;
  if (!conversationId) {
    return res.status(400).json({ message: 'Conversation ID not provided.' });
  }
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return res.status(404).json({ message: 'Conversation not found.' });
  }
  try {
    const messages = await Message.find({
      conversation_id: new Types.ObjectId(conversationId),
    });
    const response = messages?.map(
      ({ _id, sender, reciever, text, createdAt }) => ({
        id: _id,
        sender,
        reciever,
        text,
        createdAt,
      })
    );
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const deleteConversations = async (
  req: TypedRequestBody<{ conversations: string[] }>,
  res: Response
) => {
  const conversations = req.body.conversations;

  try {
    if (conversations?.length === 0) {
      return res
        .status(400)
        .json({ message: 'Provide at least one conversation.' });
    }
    const allConvs = conversations.map(
      async (convId) => await Conversation.findById(convId)
    );

    const resolvedConversations = (await Promise.all(allConvs))?.filter(
      (conv) => conv
    );

    const userConversations = resolvedConversations?.filter(
      (conversation) =>
        !conversation?.participants?.includes(req.user?.id as string)
    );
    if (userConversations?.length !== resolvedConversations?.length) {
      return res.status(405).json({ message: 'Operation not allowed.' });
    }

    if (resolvedConversations?.length === conversations?.length) {
      conversations.forEach(async (conversation, idx) => {
        await Conversation.findByIdAndDelete(conversation);
      });
      return res
        .status(200)
        .json({ message: 'Conversations deleted successfully.' });
    } else {
      return res
        .status(404)
        .json({ message: 'Some conversation not found in database' });
    }
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
export const updateConversation = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  if (!conversationId) {
    return res.status(400).json({ message: 'Conversation ID not provided.' });
  }
  try {
    const conv = await Conversation.findById(conversationId);
    if (!conv) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }

    await conv.updateOne({ marked_as_read: !conv.marked_as_read });
    return res
      .status(200)
      .json({ message: 'Conversation upated successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
