import styled from 'styled-components';

export const Container = styled.header`
background: #d73035;
height: 198px;
display: flex;
align-items: center;
`;

export const Content = styled.div`
width: 100%;
max-width: 1216px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 1.8rem 7rem;

.page-details {
  h1 {
    font-size :2rem;
    color: #FFFFFF;
  }

  h2 {
    color: #FFFFFF;
    font-size : 1rem;
    font-weight: 400;
    opacity: 0.9;
    margin-top: 0.375rem;

  }
}
`;
