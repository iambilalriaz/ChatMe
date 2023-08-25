import { useCallback, useEffect, useState } from 'react';
import {
  getConversationMessagesRequest,
  getConversationRequest,
  getUserDetailsRequest,
} from '../api/requests';
import UserLayout from '../layouts/UserLayout';
import { toast } from 'react-toastify';
import { IConversation, IMessage, IUser } from '../types';
import Message from '../components/Message';
import { getAPIError, getAppUser, getQueryParameter } from '../utils';
import { useLocation } from 'react-router-dom';
import MessageInput from '../components/MessageInput';

const Messages = () => {
  const [conversation, setConversation] = useState<IConversation>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newRecipient, setNewRecipient] = useState<IUser>();

  const conversationId = getQueryParameter('conversationId');
  const { state } = useLocation();

  const fetchConversationData = useCallback(async () => {
    try {
      if (conversationId) {
        const conversationResponse = await getConversationRequest(
          conversationId as string
        );
        setConversation(conversationResponse.data);
        const messagesResponse = await getConversationMessagesRequest(
          conversationId as string
        );
        setMessages(messagesResponse.data);
      } else {
        const userResponse = await getUserDetailsRequest(state?.userId);
        setNewRecipient(userResponse.data);
      }
    } catch (error) {
      toast.error(getAPIError(error));
    }
  }, [conversationId, state]);

  useEffect(() => {
    fetchConversationData();
  }, [fetchConversationData]);

  const getRecieverName = () => {
    if (conversationId) {
      return (
        conversation?.participants?.find(
          ({ id }) => id !== getAppUser()?.user?.id
        )?.name || ''
      );
    } else return newRecipient?.name || '';
  };
  return (
    <UserLayout heading={getRecieverName()}>
      <section className='flex flex-col'>
        {messages?.map((message) => (
          <Message
            key={message?.id}
            message={message}
            conversation={conversation as IConversation}
          />
        ))}
      </section>
      <MessageInput recipientEmail={state?.userEmail} />
    </UserLayout>
  );
};

export default Messages;
