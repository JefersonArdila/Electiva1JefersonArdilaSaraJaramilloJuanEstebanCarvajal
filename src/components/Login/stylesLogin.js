import { styled } from "styled-components";

export const Contenedor = styled.div`
  background-color: black;
  height: 100vh;
  width: 100vw;
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  .XLogo {
    width: 20%;
    height: auto;
    display: block;
    margin: auto;
  }

  .h2Login {
    color: white;
    padding: 20px;
    text-align: center;
    margin-top: 5px;
  }

  .contenedorbtn {
    text-align: center;
  }

  .btn-Login {
    padding: 10px 100px;
    border-radius: 9999px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #000000;
    border: 1px solid #71767b;
    color: #1d9bf0;
    margin-top: 10px;
  }

  .btn-CreateAccount {
    background-color: black;
    border: none;
    color: white;
    text-align: center;
    margin-top: 10px;
  }

  .btn-Google {
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
  .inputNombre {
    background-color: black;
    border-color: #71767b;
    margin-bottom: 10px;
    padding: 10px 45px;
    font-size: 16px;
    margin-top: 20px;
    color: white;
  }
  .inputEmail {
    background-color: black;
    border-color: #71767b;
    margin-bottom: 10px;
    padding: 10px 45px;
    font-size: 16px;
    color: white;
  }

  .inputPassword {
    background-color: black;
    border-color: #71767b;
    margin-bottom: 10px;
    padding: 10px 45px;
    font-size: 16px;
    color: white;
  }

  .contenedorPassword {
    text-align: center;
  }

  .container {
    background-color: black;
  }
`;
