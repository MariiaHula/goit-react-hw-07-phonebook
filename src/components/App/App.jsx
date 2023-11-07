import React, { useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';
import { Wrapper } from './App.styled';
import { selectContacts } from 'redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataThunk } from 'redux/contacts/operations';

export const App = () => {
  const contacts = useSelector(selectContacts);
  console.log(contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts List</h2>
        <Filter />

        <ContactList />

        <Notification message="Your contact list is empty" />
      </Wrapper>
    </>
  );
};
