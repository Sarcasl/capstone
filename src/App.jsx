import React, { useEffect, useState, createContext, useContext } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
// import AddProducts from "./components/addproducts/AddProducts";
// import CardBody from "./components/cards/CardBody";
import User from "./components/user/User";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/header/Products"
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Home from "./pages/home";

import "./App.css";

const ThemeContext = createContext(null);

// function  searchBar() {
//  const searchBar = useContext(ThemeContext);
//  const cartStatus =  useContext(ThemeContext)
// }



const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
    console.count("hi");
  }, []);


  function changingSearchData(e) {
    setSearchValue(e.target.value);

  }
  
  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }


  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }


  return (

 
<BrowserRouter>
{/* <Header items={items}/> */}
<ThemeContext.Provider value="itemsFilter, additem, removeItem, addedItems, items, searchValue, changingSearchData, setShowAddProducts, setShowAddProducts, removeItem">
  <Routes>
  <Route path="/" element={<Home/>}/>
  {/* <Route path="/" element={<div><Search/><AddProducts/><CardBody/></div>}/> */}
  </Routes>
</ThemeContext.Provider>

    



</BrowserRouter>


  )};


export default App;

