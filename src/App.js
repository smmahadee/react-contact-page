import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchContactData } from './globals';
import { useDispatch } from 'react-redux';
import { contactAction } from './Store';

import ContactLists from './Component/ContactLists';
import Navbar from './Component/Navbar';

let initial = false;

export default function App() {
  const contacts = useSelector(state => state.contactSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!initial) {
        const response = await fetchContactData();
        dispatch(contactAction.replaceContact(response));
        initial = true;
      }
    })().catch(err => console.log(err));
  }, [contacts, dispatch]);

  return (
    <div
      className='h-screen text-secondary-color'
      style={{ backgroundColor: '#e5e5e5' }}
    >
      <Navbar />
      <ContactLists />
    </div>
  );
}
