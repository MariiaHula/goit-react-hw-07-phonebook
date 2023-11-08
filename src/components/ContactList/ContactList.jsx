import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFilteredContact,
  selectCurrentID,
  selectIsLoading,
} from 'redux/contacts/selectors';
import {
  deleteContactThunk,
  updateContactThunk,
} from 'redux/contacts/operations';

import {
  PeopleList,
  Item,
  Button,
  TextNote,
  TextName,
  TextNumber,
  FormContainer,
  Label,
  Input,
  ButtonWrapper,
  ButtonForm,
} from './ContactList.styled';
import { useModal } from 'hooks/useModal';
import Modal from 'components/Modal/Modal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ContactList = () => {
  const contacts = useSelector(getFilteredContact);
  const currentId = useSelector(selectCurrentID);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const { isOpen, openModal, closeModal } = useModal();
  const [editingContact, setEditingContact] = useState(null);
  const { handleSubmit, register, setValue } = useForm();

  const submitEdit = data => {
    if (editingContact) {
      const updatedContact = {
        id: editingContact.id,
        name: data.name,
        phone: data.phone,
      };

      dispatch(updateContactThunk(updatedContact));
      closeModal();
    }
  };
  const openEditModal = contact => {
    setEditingContact(contact);
    openModal();
    setValue('name', contact.name);
    setValue('phone', contact.phone);
  };

  return (
    <PeopleList>
      {contacts.length ? (
        contacts.map(contact => (
          <Item key={contact.id}>
            <TextName>{contact.name}</TextName>
            <TextNumber>{contact.phone}</TextNumber>
            <Button onClick={() => openEditModal(contact)}>Edit</Button>
            {isOpen ? (
              <Modal>
                <FormContainer onSubmit={handleSubmit(submitEdit)}>
                  <Label>
                    Name
                    <Input {...register('name')} type="text" />
                  </Label>
                  <Label>
                    Number
                    <Input {...register('phone')} type="tel" />
                  </Label>
                  <ButtonWrapper>
                    <ButtonForm onClick={closeModal} type="button">
                      Cancel
                    </ButtonForm>
                    <ButtonForm type="submit">Update</ButtonForm>
                  </ButtonWrapper>
                </FormContainer>
              </Modal>
            ) : null}
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
