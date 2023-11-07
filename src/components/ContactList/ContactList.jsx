import React from 'react';
import { PeopleList, Item, Text, Button, TextNote } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectCurrentID,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { deleteContactThunk } from 'redux/contacts/operations';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(state => state.filter.filter);
  const currentId = useSelector(selectCurrentID);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const getFilteredContact = () => {
    return contacts.filter(
      contact =>
        contact.name
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim()) ||
        contact.phone.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <PeopleList>
      {getFilteredContact().length ? (
        getFilteredContact().map(contact => (
          <Item key={contact.id}>
            <Text>
              {contact.name}: {contact.phone}
            </Text>
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
