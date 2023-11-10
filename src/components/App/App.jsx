import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFaceSadTear } from 'react-icons/fa6';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';

import { fetchDataThunk } from 'redux/contacts/operations';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';

import {
  BsFillPhoneIcon,
  CenteredTextNote,
  CenteredTextWrapper,
  PhoneWrapper,
  SecondTitle,
  Title,
  TitleWrapper,
  Wrapper,
} from './App.styled';

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
            <TitleWrapper>
              <BsFillPhoneIcon />
              <Title>Phonebook</Title>
            </TitleWrapper>
            <ContactForm />
            <SecondTitle>Contacts List</SecondTitle>
            <Filter />
            {contacts.length > 0 && <ContactList />}
            {contacts.length === 0 && !loading && (
              <Notification message="Your contact list is empty" />
            )}
          </PhoneWrapper>
        </Wrapper>
      )}
    </>
  );
};
