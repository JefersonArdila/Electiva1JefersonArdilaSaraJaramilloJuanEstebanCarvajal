import { styled } from "styled-components";

export const Contenedor = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  display: flex; 
  justify-content: center; 
  align-items: center; 
 
 


  .container1 {
    width: 50%; 
    display: flex;
    justify-content: center;
  }

  .container2 {
    width: 50%; 
    text-align: left; 
  }

  .XLogo {
    width: 100%; 
    height: auto;
  }

  .h1Login,
  .h3Login,
  .h5Login {
    color: white;
    padding: 10px;
    text-align: center;
  }

  .h6Login {
    color: #A9ACAF;
    padding: 10px;
    text-align: center;
    font-size: 11px;
    line-height: 12px;
  }

  a {
    text-decoration: none;
    color: #1d9bf0;
  }

  .contenedorbtn {
    text-align: center;
    margin-top: 10px;
  }

  .btn-CreateAccount,
  .btn-Login,
  .btn-Google {
    padding: 10px 100px;
    border-radius: 9999px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-Google {
    background-color: black;
    border: 1px solid #71767b;
    color: white;
  }

  .btn-CreateAccount {
    background-color: #1a8cd8;
    border: none;
    color: white;
  }

  .btn-Login {
    background-color: #000000;
    border: 1px solid #71767b;
    color: #1d9bf0;
  }

  
`;
