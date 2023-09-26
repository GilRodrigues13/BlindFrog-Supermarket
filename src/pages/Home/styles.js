import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
  gap: 10px;
  background-color: #bcc8c4;
`;

export const ProductsArea = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  margin-top: 30px;

  > div {
    
    height: 320px;
    width: 230px;
    border: 5px solid rgb(194, 193, 193);
    border-image: linear-gradient(#034b19, #09ba85) 1;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
    text-align: center;
    background-color: white;
    transition: transform 0.3s ease-in-out; 

    &:hover {
      
      transform: scale(1.1);
    }
  }

  button {
    font-size: 25px;
    background: transparent;
    border: none;
    color: green;
    cursor: pointer;
  }
`;

