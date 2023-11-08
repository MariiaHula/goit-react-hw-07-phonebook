import React from 'react';
import { ModalContainer, ModalContent } from './Modal.styled';

const Modal = ({ children }) => {
  return (
    <ModalContainer>
      <ModalContent>
        {children}
        {/* <CloseButton onClick={close}>x</CloseButton> */}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
