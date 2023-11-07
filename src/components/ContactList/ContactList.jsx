import React from 'react';
import { PeopleList, Item, Text, Button, TextNote } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  const getFilteredContact = () => {
    if (filter) {
      return contacts.filter(
        contact =>
          contact.name
            .toLowerCase()
            .trim()
            .includes(filter.toLowerCase().trim()) ||
          contact.number
            .toLowerCase()
            .trim()
            .includes(filter.toLowerCase().trim())
      );
    } else {
      return contacts;
    }
  };

  return (
    <PeopleList>
      {getFilteredContact().length ? (
        getFilteredContact().map(contact => (
          <Item key={contact.id}>
            <Text>
              {contact.name}: {contact.number}
            </Text>
            <Button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </Button>
          </Item>
        ))
      ) : (
        <TextNote>Unfortunately, there are no matches</TextNote>
      )}
    </PeopleList>
  );
};

export default ContactList;
