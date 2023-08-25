import { useCallback, useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import { IUser } from '../types';
import { getUserContactsRequest } from '../api/requests';
import { getAPIError } from '../utils';
import { toast } from 'react-toastify';
import Contact from '../components/Contact';

const Contacts = () => {
  const [contacts, setContacts] = useState<IUser[]>([]);

  const fetchUserContacts = useCallback(async () => {
    try {
      const { data } = await getUserContactsRequest();
      setContacts(data);
    } catch (error) {
      toast.error(getAPIError(error));
    }
  }, []);
  useEffect(() => {
    fetchUserContacts();
  }, [fetchUserContacts]);
  return (
    <UserLayout heading='Contacts'>
      {contacts?.map((contact) => (
        <Contact key={contact?.id} contact={contact} />
      ))}
    </UserLayout>
  );
};

export default Contacts;
