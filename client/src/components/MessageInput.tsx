import classNames from 'classnames';
import { KeyboardEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { sendMessageRequest } from '../api/requests';
import { toast } from 'react-toastify';
import { getAPIError } from '../utils';
const MessageInput = ({ recipientEmail }: { recipientEmail?: string }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (recipientEmail && message?.trim()) {
      try {
        await sendMessageRequest(recipientEmail, message);
        setMessage('');
      } catch (error) {
        toast.error(getAPIError(error));
      }
    }
  };

  const onPressEnter = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      sendMessage();
    }
  };
  return (
    <div className='px-4 fixed bottom-4 w-full'>
      <input
        autoFocus
        onKeyDown={onPressEnter}
        value={message}
        onChange={(e) => setMessage(e?.target?.value)}
        placeholder='Type message...'
        className='border-2 border-slate-200 focus:border-primary rounded-lg bg-light p-2 w-full outline-none'
      />
      <div
        onClick={sendMessage}
        className={classNames(
          'absolute top-3 right-8 text-xl ',
          {
            'text-primary': message?.trim(),
          },
          {
            'text-slate-300': !message?.trim(),
          }
        )}
      >
        <AiOutlineSend />
      </div>
    </div>
  );
};

export default MessageInput;
