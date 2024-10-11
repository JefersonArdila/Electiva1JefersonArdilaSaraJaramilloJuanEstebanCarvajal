import React from "react";
import  GlobalStyles  from "./styles/GlobalStyles";
import { Home } from "./components/Home";
import {Sidebar} from "./components/Sidebar";
import { Widgets} from "./components/Widgets";


function App() {
  return (
    
    <div className="App">
     
     
     {/* Sidibar*/}
      <Sidebar></Sidebar>
     {/* Home*/}
      <Home></Home>
     
     {/* Widgets*/}
      <Widgets></Widgets>
      
     <GlobalStyles></GlobalStyles>
    </div>
  );
}

export default App;
