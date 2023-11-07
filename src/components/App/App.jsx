import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';
import { Wrapper } from './App.styled';
import { selectContacts } from 'redux/contacts/selectors';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(selectContacts);

  return (
    <>
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts List</h2>
        <Filter />
        {contacts.length ? (
          <ContactList />
        ) : (
          <Notification message="Your contact list is empty" />
        )}
      </Wrapper>
    </>
  );
};
