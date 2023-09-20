import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

import "./App.css";

const ThemeContext = createContext(null);



const App = () => {

  return (

 
<BrowserRouter>
<ThemeContext.Provider value="itemsFilter, additem, removeItem, addedItems, items, searchValue, changingSearchData, setShowAddProducts, setShowAddProducts, removeItem">
  <div>navbar</div>
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/checkout" element={<div>Checkout</div>}/>
  </Routes>
  <div>footer</div>
</ThemeContext.Provider>

    

</BrowserRouter>


  )};


export default App; 

{/* <div className="body__container">
<div className="nav">
  <Header />
  <div className="nav-right"> */}