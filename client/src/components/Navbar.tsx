import { Link, useNavigate } from 'react-router-dom';
import { getAppUser } from '../utils';
import { useState } from 'react';
import classNames from 'classnames';
import { FiArrowLeft } from 'react-icons/fi';

const Navbar = ({ heading }: { heading: string }) => {
  const {
    user: { profile_image, name },
  } = getAppUser();

  const navigate = useNavigate();
  const [avatarClicked, setAvatarClicked] = useState<null | boolean>(null);
  const toggleAvatarClicked = () => {
    setAvatarClicked((prevState) => (prevState ? false : true));
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <nav
      id='navbar'
      className='bg-primary text-light p-4 fixed w-full top-0 flex justify-between items-center'
    >
      <div className='text-2xl font-semibold flex items-center'>
        <button
          onClick={goBack}
          className={classNames('mr-4', {
            hidden: heading === 'Conversations',
          })}
        >
          <FiArrowLeft />
        </button>
        <h1>{heading}</h1>
      </div>
      <Link
        className={classNames(
          'underline ml-4 z-1',
          {
            'logout-in absolute right-20': avatarClicked,
          },
          {
            'logout-out absolute right-20': avatarClicked === false,
          },
          {
            hidden: avatarClicked === null,
          }
        )}
        to='/login'
        onClick={() => {
          localStorage.clear();
        }}
      >
        Logout
      </Link>
      <div className='bg-primary pr-4 absolute right-0'>
        <img
          src={profile_image}
          alt={name}
          width={50}
          className='cursor-pointer z-10'
          onClick={toggleAvatarClicked}
        />
      </div>
    </nav>
  );
};

export default Navbar;
