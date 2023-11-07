import React, { useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';
import {
  CenteredTextNote,
  CenteredTextWrapper,
  PhoneWrapper,
  SecondTitle,
  Title,
  Wrapper,
} from './App.styled';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataThunk } from 'redux/contacts/operations';
import Dna from 'Loader/Dna';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  return (
    <>
      {error ? (
        <CenteredTextWrapper>
          <CenteredTextNote>{error}</CenteredTextNote>
        </CenteredTextWrapper>
      ) : (
        <Wrapper>
          <PhoneWrapper>
            <Title>Phonebook</Title>
            <ContactForm />
            <SecondTitle>Contacts List</SecondTitle>
            <Filter />
            {loading && <Dna />}
            {contacts.length ? (
              <ContactList />
            ) : (
              <Notification message="Your contact list is empty" />
            )}
          </PhoneWrapper>
        </Wrapper>
      )}
    </>
  );
};
