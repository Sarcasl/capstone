import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import {Link} from "react-router-dom"
import Search from "../src/components/search/Search"
import Cart from "../src/components/cart/Cart"

import "./App.css";

const ThemeContext = createContext(null);




const App = () => {
const [value, setValue] = useState("")
const onChangeData = (e) => {setValue(e.target.value)}


const [num, setNum] = useState(0);
const [ShowAddProducts, setShowAddProducts]= useState(false);
  return (

 
<BrowserRouter>
<ThemeContext.Provider value="itemsFilter, additem, removeItem, addedItems, items, searchValue, changingSearchData, setShowAddProducts, setShowAddProducts, removeItem">
<div className="body__container"></div>




<div className="nav">
<Link to = "/">Home</Link>
<Link to = "/checkout">Checkout</Link>

<Search value={value} onChangeData={onChangeData}/>
<Cart num={num} setshowCart={setShowAddProducts}/>









</div>
<div className="nav-right"></div>
  <Routes>

  <Route path="/" element={<Home setNum ={setNum} ShowAddProducts ={ShowAddProducts} setShowAddProducts ={setShowAddProducts}/>}/>
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