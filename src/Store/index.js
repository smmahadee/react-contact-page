import { configureStore, createSlice, current } from '@reduxjs/toolkit';
import { sendContactData, deleteContact } from '../globals';
import { customizedData } from '../globals';

// Add contact form related state
const formSlice = createSlice({
  name: 'form',
  initialState: { isShowModal: false },
  reducers: {
    openForm(state) {
      state.isShowModal = true;
    },
    closeForm(state) {
      state.isShowModal = false;
    },
  },
});

// contacts related state
let initialState = [];

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    saveContact(state, { payload }) {
      const copyState = current(state).slice();
      const newData = customizedData([...copyState, payload]);
      sendContactData(payload);
      return newData;
    },
    replaceContact(state, { payload }) {
      const data = customizedData(payload);
      data.forEach(data => state.push(data));
    },
    deleteAllContact() {
      deleteContact();
      return [];
    },
  },
});

const store = configureStore({
  reducer: {
    formSlice: formSlice.reducer,
    contactSlice: contactSlice.reducer,
  },
});

export default store;
export const formAction = formSlice.actions;
export const contactAction = contactSlice.actions;
