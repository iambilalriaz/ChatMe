import { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import { getConversationsRequest } from '../api/requests';
import Conversation from '../components/Conversation';
import { IConversation } from '../types';
import classNames from 'classnames';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Home = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);

  useEffect(() => {
    getConversationsRequest().then((response) => {
      setConversations(response.data);
    });
  }, []);
  return (
    <UserLayout heading='Conversations'>
      <section
        className={classNames('relative', {
          'grid place-items-center h-full': !conversations?.length,
        })}
      >
        {conversations?.length ? (
          conversations?.map((conv) => (
            <Conversation key={conv?.id} conv={conv} />
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </section>
      <Link
        to='/contacts'
        className='text-light bg-primary w-14 h-14 rounded-full grid place-items-center text-2xl absolute right-12 bottom-12'
      >
        <BiSolidMessageDetail />
      </Link>
    </UserLayout>
  );
};

export default Home;
