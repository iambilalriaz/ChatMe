import { useLayoutEffect, useState } from 'react';
import Navbar from '../components/Navbar';
const UserLayout = ({
  heading,
  children,
}: {
  heading: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const [navHeight, setNavHeight] = useState(0);
  useLayoutEffect(() => {
    setNavHeight(document.querySelector('#navbar')?.clientHeight as number);
  }, [children]);
  return (
    <section>
      <Navbar heading={heading} />
      <section
        className='h-screen'
        style={{
          paddingTop: `${navHeight + 4}px`,
        }}
      >
        {children}
      </section>
    </section>
  );
};

export default UserLayout;
