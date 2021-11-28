import { useSelector } from 'react-redux';

export default function ShowContact({ filterValue }) {
  // Filtering contacts by searched keyword
  const contacts = useSelector(state => {
    if (filterValue !== null) {
      return state.contactSlice.filter(el => {
        const name = el.firstName.toLowerCase() + el.lastName?.toLowerCase();
        const payloadVal = filterValue.trim().toLowerCase();
        return name.indexOf(payloadVal) > -1;
      });
    } else {
      return state.contactSlice;
    }
  });

  // created all contacts element
  const contactData = contacts.map((el, i) => {
    const { isLetter, firstName, lastName, phone } = el;
    if (isLetter) {
      return (
        <div key={i} className='text-center text-xs'>
          {firstName}
        </div>
      );
    }
    
    return (
      <div
        key={i}
        className='mx-3 my-1 bg-white rounded px-2 flex space-x-3 items-center py-1'
      >
        <img className='rounded-full h-8' src={el.imgSrc} alt='' />
        <div>
          <h4 className='text-black'>{firstName + ' ' + lastName}</h4>
          <p className='text-xs'>{phone}</p>
        </div>
      </div>
    );
  });

  return contactData;
}
