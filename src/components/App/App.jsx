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
import { FaFaceSadTear } from 'react-icons/fa6';
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
        <Wrapper>
          <CenteredTextWrapper>
            <CenteredTextNote>
              <FaFaceSadTear size={80} style={{ marginBottom: 30 }} />
              <br></br> {error}
            </CenteredTextNote>
          </CenteredTextWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <PhoneWrapper>
            <Title>Phonebook</Title>
            <ContactForm />
            <SecondTitle>Contacts List</SecondTitle>
            <Filter />
            {loading}
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
