import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { operations } from 'redux/contacts';
import {
  ButtonForm,
  ButtonWrapper,
  FormContainer,
  Input,
  Label,
} from './EditForm.styled';

export const EditForm = ({ closeModal, contact }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: contact,
  });
  const dispatch = useDispatch();

  const submitEdit = data => {
    if (contact) {
      const updatedContact = {
        id: contact.id,
        name: data.name,
        phone: data.phone,
      };

      dispatch(operations.updateContactThunk(updatedContact));
      closeModal();
    }
  };
  return (
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
  );
};
