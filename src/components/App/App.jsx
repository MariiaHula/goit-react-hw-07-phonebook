import React, { useEffect, useRef } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';
import { Wrapper } from './App.styled';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataThunk } from 'redux/contacts/operations';
import Dna from 'Loader/Dna';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const firstUpdate = useRef(true);

  useEffect(() => {
    dispatch(fetchDataThunk());

    firstUpdate.current = false;
  }, [dispatch, firstUpdate]);

  return (
    <>
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts List</h2>
        <Filter />
        {loading && <Dna /> && firstUpdate.current}
        {contacts.length ? (
          <ContactList />
        ) : (
          <Notification message="Your contact list is empty" />
        )}
      </Wrapper>
    </>
  );
};
