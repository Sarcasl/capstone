import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import "./App.css";

const ThemeContext = createContext(null);



const App = () => {

  return (

 
<BrowserRouter>
<ThemeContext.Provider value="itemsFilter, additem, removeItem, addedItems, items, searchValue, changingSearchData, setShowAddProducts, setShowAddProducts, removeItem">
  <Routes>
  <Route path="/" element={<Home/>}/>
  </Routes>
</ThemeContext.Provider>

    



</BrowserRouter>


  )};


export default App;

