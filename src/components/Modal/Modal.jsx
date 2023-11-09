import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalContent } from './Modal.styled';

const Modal = ({ children }) => {
  return (
    <ModalContainer>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
