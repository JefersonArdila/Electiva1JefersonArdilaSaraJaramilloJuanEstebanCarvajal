import { styled } from "styled-components";

export const Contenedor = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  padding: 100px;
  display: flex; 
  justify-content: center; 
  align-items: center; 

  .container1 {
    width: 50%; 
    margin-bottom: 20px;  
  }

  .container2 {
    width: 70%; 
    text-align: left; 
    
  }

  .XLogo {
    margin-top: 100px; 
    width: 110%;
    height: auto;
    float: left;
  }

  .h1Login,
  .h3Login,
  .h5Login {

    color: white;
    padding: 20px;
    text-align: center;
  }

  .h6Login {
    color: #A9ACAF;
    padding: 10px;
    text-align: center;
    font-size: 11px;
    line-height: 12px;
    letter-spacing: normal;
  }

  a {
    text-decoration: none;
    color: #1d9bf0;
  }

  .contenedorbtn {
    text-align: center;
  }

  .btn-CreateAccount,
  .btn-Login {
    padding: 10px 100px;
    border-radius: 9999px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
    .btn-Google{
    padding: 10px 120px;
    border-radius: 9999px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color:black;
    border: 1px solid #71767b;
    color: white;
    margin-top: 5px;
    }

  .btn-CreateAccount {
    background-color: #1a8cd8;
    border: none;
    color: white;
     margin-top: 10px;
  }

  .btn-Login {
    background-color: #000000;
    border: 1px solid #71767b;
    color: #1d9bf0;
  }

  .container {
   background-color: black;
  }
`;
