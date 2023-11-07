import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://654a3566e182221f8d52babf.mockapi.io/';

export const fetchDataThunk = createAsyncThunk(
  'fetchAll',
  async (_, ThunkApi) => {
    try {
      const { data } = axios.get('contacts');
      return data;
    } catch (error) {
      ThunkApi.fulfillWithValue(error.message);
    }
  }
);
export const addContactThunk = createAsyncThunk(
  'addContact',
  async (body, ThunkApi) => {
    try {
      const { data } = axios.post('contacts', { contacts: body });
      return data;
    } catch (error) {
      ThunkApi.fulfillWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteContactById',
  async (id, ThunkApi) => {
    try {
      const { data } = axios.delete(`contacts/${id}`);
      return data;
    } catch (error) {
      ThunkApi.fulfillWithValue(error.message);
    }
  }
);
