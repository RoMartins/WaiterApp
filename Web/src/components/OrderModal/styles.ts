import styled from 'styled-components';

export const  Overlay = styled.div`
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
background: #FFFFFF;
width: 480px;
padding: 2rem;
border-radius: 0.5rem;

 >header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;

  button {
    display: flex;
    background: transparent;
    border: none;
  }
 }

 .status-container {
  margin-top: 2rem;

  >div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  small {
    font-size: 0.875rem;
    opacity: 0.8;
  }

 }

`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  >strong {
    font-weight: 500;
    font-size: 0.875rem;
    opacity: 0.8;
  }

 .order-itens {
  margin-top:1rem;
 }

 .item {
  display: flex;

  & + .item {
    margin-top: 1rem;
  }

  img {
    border-radius: 6px;

  }

  .quantity {
    font-size: 0.875rem;
    color: #666;
    margin-left: 12px;
    display: block;
    min-width: 20px;
  }

  .products-details {
    margin-left: 4px;

    strong {
      display: block;
    }

    span {
      font-size: 0.875rem;
    color: #666;
    }

  }
 }

 .total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  span {
    opacity: 0.8;
    font-weight: 500;
    font-size: 0.875rem;
  }

 }

 `;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: #333333;
    border-radius: 3rem;
    border: 0;
    color: #fff;
    padding: 12px ;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .secondary {
      padding: 14px 24px;
      color: #d73035;
      font-weight: bold;
      border: 0;
      background: transparent;
      margin-top: 0.7rem;
  }
`;
