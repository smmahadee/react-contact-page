import Localbase from 'localbase';

// indexedDB initialized
export let db = new Localbase('db');

export const sendContactData = async data => {
  await db.collection('users').add(data);
};

export const fetchContactData = async () => {
  const data = await db.collection('users').get();
  return data;
};

export const deleteContact = async () => {
  db.collection('users').delete();
}

// this function customize contact data
export const customizedData = data => {
  data.sort((a, b) => {
    if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
      return -1;
    }
    if (a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
      return 1;
    }
    return null;
  });

  // get random image
  const imgSrc = [];
  data.forEach((_, i) => {
    imgSrc.push(`https://randomuser.me/api/portraits/med/men/${i + 1}.jpg`);
  });

  const customizedData = data.reduce(
    (acc, el, i, arr) => {
      let currentChar = el.firstName.toUpperCase().substr(0, 1);
      if (currentChar < 'A') currentChar = '#';
      if (currentChar !== acc[1]) {
        acc[0].push({ firstName: currentChar, isLetter: true });
        acc[1] = currentChar;
      }
      if (el.firstName.length > 2) {

   
      
      
        acc[0].push({ ...el, isLetter: false, imgSrc: imgSrc[i] });
      }
      return acc;
    },
    [[], null]
  )[0];

  return customizedData;
};
