import styled, {css} from "styled-components";

export const Container = styled.div`
  flex: 0.8;
  border-right: 1px solid #2f3336;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width:1280px){
    flex: 0.55;
  }

  @media only screen and (max-width:1004px){
    flex: 0.95;
  }

  @media only screen and (max-width:1004px){
    flex: 1;
  }
`;

export const Header = styled.header`

`;
export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #2f3336;
`;

export const Tab = styled.div`
  flex: 1;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  color: ${props => props.active ? '#fff' : '#71767b'};
  font-weight: ${props => props.active ? '600' : '500'};
  position: relative;

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 56px;
      height: 4px;
      background-color: rgb(29, 155, 240);
      border-radius: 9999px;
    }
  `}
`;

export const Tweetbox = styled.div`
  padding: 15px;
  border-bottom: 1px solid #2f3336;
`;

export const Div = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  
  &:first-child {
    margin-bottom: 10px;
  }

  > .columns {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    
    > input {
      width: 100%;
      border: none;
      outline: 0;
      font-size: 19px;
      line-height: 25px;
      color: #636769;
      background-color: black;
      
      &::placeholder {
        color: #636769;
      }
    }
  }

  > input {
    width: 100%;
    border: none;
    outline: 0;
    font-size: 19px;
    line-height: 25px;
    color: #636769;
    background-color: black;
    
    &::placeholder {
      color: #636769;
      
    }
  }

  > Button {
    background-color: #1d9bf0 !important;
    text-transform: inherit !important;
    border: none !important;
    color: white !important;
    width: 80px !important;
    font-weight: 900 !important;
    height: 36px !important;
    border-radius: 9999px !important;
    cursor: pointer !important;
    margin-left: auto !important;
  }
`;

export const DivBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  > .MuiSvgIcon-root {
    fill: #1d9bf0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const File = styled.input`
max-width: 35px;
position: absolute;
z-index: 10;
padding-top: 10px;
opacity: 0;
${props => props.primary && css` '}'
margin-left: 55px;
`}
`

/*POST*/

export const PostStyled = styled.div`
padding: 12px 16px;
border-top: 1px solid #2f3336;
margin-top: 5px;
display: flex;
align-items: flex-start;

.post_avatar{
  margin-top: 2px;
}
`

export const PostBody = styled.div`
padding-left: 10px;
width: 100%;
overflow: hidden;
>div span{
  font-weight: 600;
  font-size: 15px;
  color: #5b7083;
}
.post_icon{
      font-size: 16px !important;
      color: rgb(29, 155, 240);
      margin-left: 4px;
      margin-top: 2px;
}
h3{
  padding: 0;
  margin: 0;
}
`

export const PostDescription = styled.div`
margin-bottom: 10px;
>p{
  margin: 0;
  padding: 0;
  color: #e7e9ea;
  font-size: 16px;
  line-height: 16.6875px;

}
`

export const Images = styled.img`
border-radius: 26px;
min-width: 100%;
width: 100%;
min-height: 300px;
`

export const PostFooter = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
color: #5b7083;
transition: all 100ms ease-in;
>.MuiSvgIcon-root:hover:nth-child(1){
  fill: #1da1f2;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(2){
  fill: #17bf63;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(3){
  fill: #e02452;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(4){
  fill: #1da1f2;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(5){
  fill: #1da1f2;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(6){
  fill: #1da1f2;
  cursor: pointer;
}
`