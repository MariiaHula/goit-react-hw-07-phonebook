import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFilteredContact,
  selectCurrentID,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { deleteContactThunk } from 'redux/contacts/operations';

import {
  PeopleList,
  Item,
  Button,
  TextNote,
  TextName,
  TextNumber,
} from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(getFilteredContact);
  const currentId = useSelector(selectCurrentID);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  return (
    <PeopleList>
      {contacts.length ? (
        contacts.map(contact => (
          <Item key={contact.id}>
            <TextName>{contact.name}</TextName>
            <TextNumber>{contact.phone}</TextNumber>
            {loading && currentId === contact.id ? (
              <Button>Deleting...</Button>
            ) : (
              <Button onClick={() => dispatch(deleteContactThunk(contact.id))}>
                Delete
              </Button>
            )}
          </Item>
        ))
      ) : (
        <TextNote>Unfortunately, there are no matches</TextNote>
      )}
    </PeopleList>
  );
};

export default ContactList;
