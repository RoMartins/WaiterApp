import styled from 'styled-components';

export const Board = styled.div`
  padding: 1rem;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

 > header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
 }
`;



export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

 button {
  background: #FFFFFF;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 8px;
  padding: 1rem;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px  ;

  strong {
    font-weight: 500;
  }

  span {
    color: #666;
    font-size: 0.875rem;
  }

  & + button {
    margin-top: 24px;
  }

}
`;
