import classNames from 'classnames';
import { IConversation, IMessage } from '../types';
import { getAppUser } from '../utils';

const Message = ({
  message,
  conversation,
}: {
  message: IMessage;
  conversation: IConversation;
}) => {
  const { text, sender, reciever, createdAt } = message;
  const appUserId = getAppUser()?.user?.id;
  return (
    <div
      className={classNames(
        { 'bg-primary text-light self-end': appUserId === sender },
        { 'bg-slate-100 text-dark': appUserId !== sender },
        'w-fit px-4 py-2 m-2 rounded-full'
      )}
    >
      <div>{/* <img src /> */}</div>
      <p>{text}</p>
    </div>
  );
};

export default Message;
