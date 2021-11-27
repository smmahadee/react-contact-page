import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formAction } from '../Store/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ShowContact from './ShowContact';
import AddContact from './AddContact';

export default function ContactLists() {
  const [filterValue, setFilterValue] = useState(null);
  const dispatch = useDispatch();
  const addContactHandler = () => dispatch(formAction.openForm());

  const changeHandler = e => {
    const value = e.target.value;
    setFilterValue(value);
  };
  return (
    <main className='relative w-11/12 max-w-screen-md my-10 mx-auto rounded h-4/5 bg-gray-100 overflow-scroll'>
      <nav className='sticky top-0 flex justify-between items-center space-x-3 bg-white p-2 mb-2'>
        <div className='relative flex-grow self-auto'>
          <input
            className='w-full inputSearch '
            type='text'
            placeholder='Search Contact'
            onChange={changeHandler}
          />
          <FontAwesomeIcon
            className='absolute right-2 top-2 text-gray-300'
            icon={faSearch}
          />
        </div>

        <div className='flex space-x-3'>
          <button className='btn bg-primary-color' onClick={addContactHandler}>
            Add Contact
          </button>
          <button className='btn bg-gray-300'>Export</button>
        </div>
      </nav>

      {/* Add contact form */}
      <AddContact />

      {/*Contact list Component*/}
      <ShowContact filterValue={filterValue} />
    </main>
  );
}
