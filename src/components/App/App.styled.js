import { TextNote } from 'components/ContactList/ContactList.styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const CenteredTextWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenteredTextNote = styled(TextNote)`
  font-size: 32px;
`;
