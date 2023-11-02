import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 250px;
  padding: 10px 20px;
  margin-bottom: 25px;
  font-size: 16px;
  border-radius: 25px;
  border: 2px solid #0077B5;
  outline: none;
  transition: box-shadow 0.2s ease, border 0.2s ease;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow-y: hidden;


  &:focus {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.10), 0 3px 6px rgba(0, 0, 0, 0.08);
    border-color: #5E81F4;
  }

  &::placeholder {
    color: #a5a5a5;
  }
`;

