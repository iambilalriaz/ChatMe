import { Link } from 'react-router-dom';
import { IConversation } from '../types';
import { getAppUser } from '../utils';
import moment from 'moment';
import Avatar from './Avatar';
const Conversation = ({
  conv: { id, participants, lastMessageSent, createdAt },
}: {
  conv: IConversation;
}) => {
  const otherParticipant = participants?.find(
    ({ id }) => id !== getAppUser()?.user?.id
  );

  return (
    <Link
      to={`/messages?conversationId=${id}`}
      className='flex cursor-pointer bg-slate-100 hover:bg-slate-200 my-2 p-4 items-center'
    >
      <Avatar imageURL={otherParticipant?.profile_image as string} />
      <div className='flex justify-between items-center w-full'>
        <div className='text-black ml-4'>
          <h1 className='text-lg font-medium'>{otherParticipant?.name}</h1>
          <p className='text-sm font-thin'>{lastMessageSent}</p>
        </div>
        <p className='text-sm'>{moment(createdAt).format('hh:mm A')}</p>
      </div>
    </Link>
  );
};

export default Conversation;
