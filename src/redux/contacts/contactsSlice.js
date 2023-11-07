import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchDataThunk,
  addContactThunk,
  deleteContactThunk,
} from './operations';

export const initialState = {
  contacts: {
    items: [],
    error: null,
    isLoading: false,
    deletedId: null,
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setDelitedId: (state, { payload }) => {
      state.contacts.deletedId = payload;
    },
  },
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
          contact => contact.id !== payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          fetchDataThunk.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        (state, _) => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchDataThunk.fulfilled,
          addContactThunk.fulfilled,
          deleteContactThunk.fulfilled
        ),
        (state, _) => {
          state.contacts.isLoading = false;
          state.contacts.error = null;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { setDelitedId } = contactsSlice.actions;
