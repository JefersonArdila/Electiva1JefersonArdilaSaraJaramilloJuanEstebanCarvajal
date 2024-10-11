import styled from "styled-components";

export const Widget = styled.div`
  width: 100%;
  max-width: 350px; 
  background-color: black;
  padding: 20px;
  border-radius: 15px;
  margin-left: auto; 
  margin-right: auto;

  @media only screen and (max-width:1280px){
    flex: 0.4;
  }

  @media only screen and (max-width:1004px){
    display: none;
  }

`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #202020;
  padding: 10px;
  border-radius: 50px;
  margin-bottom: 10px;

  input {
    border: none;
    background-color: transparent;
    color: #fff;
    outline: none;
    margin-left: 10px;
    font-size: 14px;
    width: 100%; /* Para que ocupe todo el ancho disponible */
  }

  .searchIcon {
    color: #6e767d;
  }
`;

export const DivIcon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DivContent = styled.div`
  margin-top: 20px;
  color: white;

  h2 {
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

// Estilos para las tendencias
export const TrendingContainer = styled.div`
  background-color: black;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  border-bottom:1px solid #333;
  
`;

export const TrendingItem = styled.div`
  border-bottom: 1px solid #333;
  
  padding: 10px 0;

  &:last-child {
    border-bottom: none;
  }

  strong {
    display: block;
    font-size: 12px;
    color: #6e767d;
  }

  p {
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin: 5px 0;
  }

  span {
    font-size: 12px;
    color: #6e767d;
  }
`;

export const Premium = styled.div`

h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

p {
    font-size: 15px;
}
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  border-bottom:1px solid #333;
  
> Button {
    
    background-color: #1d9bf0 !important;
    text-transform: inherit !important;
    border: none !important;
    color: white !important;
    width: 100px !important;
    font-weight: 900 !important;
    height: 36px !important;
    border-radius: 9999px !important;
    cursor: pointer !important;
    margin-left: center !important;
  }

`

