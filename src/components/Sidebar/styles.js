import styled, {} from 'styled-components'

export const Contenedor = styled.div`

background-color: #000000 !important;
padding: 3px;
border-right: 1px solid #2f3336;
flex: 0.2;
position: sticky;
min-width: 255px;
font-family: 'Chirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
font-weight: 400;

>.XLogo {
margin: 10px 0;
width: 46px;
height: 30px;
fill: var(--XHomeColor) !important;
}

>Button{
background-color: var(--XcolorButton) !important;
border:none !important;
color: white !important;
font-weight: 800 !important;
text-transform: inherit !important;
height: 48px !important;
padding: 0 30px !important;
border-radius: 9999px !important;
}
@media only screen and (max-width:1280px){
    flex: 0.1;
    min-width: 50px;
    
    >Button {
    display: none;
}
}

@media only screen and (max-width:1004px){
   width: 40px;
}


@media only screen and (max-width:500px){
    position:fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    height: 50px;
    background-color: white;
    width: 100%;
    padding: 0;
    .twitter-logo{
        display: none;
    }

}

`

export const SidebarIcon = styled.div`
display:inline-flex;
align-items: center;
padding:10px 7px;
border-radius: 9999px;
transition: background-color 100ms ease-out;

>h2{
    font-size:20px;
    margin: 0 15px 0 20px;
    font-weight: 400;
    color: white;
    white-space: nowrap;
}

>.MuiSvgIcon-root{
    width: 30px;
    height: 30px;
    color: white;
    flex-shrink: 0;
}

&:hover{
background-color: var(--Hover);
}
@media only screen and (max-width:1280px){
   border-radius: 50%;
   >h2{
    display: none;
   }
}
@media only screen and (max-width:500px){
   color: #b8b8b8;
   display: ${props => props.primary ? "none" : ""};
   color: ${props => props.active ? "var(#2f3336)" : ""};
}
`