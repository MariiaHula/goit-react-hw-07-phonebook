import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchDataThunk,
  addContactThunk,
  deleteContactThunk,
} from './operations';

export const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchDataThunk.fulfilled, (state, { payload }) => {
        return {
          ...state,
          contacts: { ...state.contacts, items: payload },
        };
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload
        );
      });
    // .addMatcher(
    //   isAnyOf(
    //     fetchDataThunk.pending,
    //     addContactThunk.pending,
    //     deleteContactThunk.pending
    //   ),
    //   (state, { payload }) => {
    //     state.contacts.isLoading = true;
    //     state.contacts.error = null;
    //   }
    // )
    // .addMatcher(
    //   isAnyOf(
    //     fetchDataThunk.rejected,
    //     addContactThunk.rejected,
    //     deleteContactThunk.rejected
    //   ),
    //   (state, { payload }) => {
    //     state.contacts.isLoading = false;
    //     state.contacts.error = payload;
    //   }
    // );
  },
});

export const contactsReducer = contactsSlice.reducer;
