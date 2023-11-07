import React from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/contactsSlice';

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const submit = data => {
    const nameExists = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === data.name.toLowerCase().trim()
    );

    if (nameExists) {
      toast.info(`${data.name} is already in your contacts.`);
      return;
    } else {
      const { name, number } = data;
      toast.success(`${name} added to your phonebook.`);
      dispatch(addContact({ name, number }));
      reset();
    }
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Label>
        Name
        <Input {...register('name', { required: true })} type="text" />
      </Label>
      <Label>
        Number
        <Input {...register('number', { required: true })} type="tel" />
      </Label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

export default ContactForm;
