import { useNavigate } from 'react-router-dom';
import { IUser } from '../types';
import Avatar from './Avatar';
import { getConversationByUserIdRequest } from '../api/requests';
import { AxiosError } from 'axios';
const Contact = ({
  contact: { id, name, email, profile_image },
}: {
  contact: IUser;
}) => {
  const navigate = useNavigate();
  const openChat = async () => {
    try {
      const conversationResponse = await getConversationByUserIdRequest(id);
      const { data } = conversationResponse;
      navigate(`/messages?conversationId=${data?.id}`, {
        state: {
          userEmail: email,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        navigate('/messages', {
          state: {
            userId: id,
            userEmail: email,
          },
        });
      }
    }
  };
  return (
    <section
      onClick={openChat}
      className='flex cursor-pointer bg-slate-100 hover:bg-slate-200 my-2 p-4 items-center'
    >
      <Avatar imageURL={profile_image as string} />
      <div className='flex justify-between items-center w-full'>
        <div className='text-dark ml-4'>
          <h1 className='text-lg font-medium'>{name}</h1>
          <p className='text-xs text-slate-500'>{email}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
