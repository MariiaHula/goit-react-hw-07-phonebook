import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';

import { selectors, operations } from '../../redux/contacts';

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
import { FaFaceSadTear } from 'react-icons/fa6';

export const App = () => {
  const contacts = useSelector(selectors.selectContacts);
  const loading = useSelector(selectors.selectIsLoading);
  const error = useSelector(selectors.selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.fetchDataThunk());
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
