import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';

import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { fetchDataThunk } from 'redux/contacts/operations';

import {
  CenteredTextNote,
  CenteredTextWrapper,
  PhoneWrapper,
  SecondTitle,
  Title,
  TitleWrapper,
  Wrapper,
} from './App.styled';
import { FaFaceSadTear } from 'react-icons/fa6';
import { BsFillPhoneVibrateFill } from 'react-icons/bs';

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
              <BsFillPhoneVibrateFill
                size={40}
                style={{
                  color: '#27296d',
                  margin: '10 10 10 0',
                  boxShadow: 'rgba(214, 102, 214, 0.1) 0px 0px 0px 4px',
                  borderRadius: 20,
                }}
              />
              <Title>Phonebook</Title>
            </TitleWrapper>
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
