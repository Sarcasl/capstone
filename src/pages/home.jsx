import React, { useEffect, useState, createContext, useContext } from "react";
import Cart from "../components/cart/Cart"
import Search from "../components/search/Search"
import Products from "../components/header/Products"

const Home = ({
  setNum, ShowAddProducts, setShowAddProducts
}) => {


const [showCart, setshowCart] = useState(false);
// const [num, setNum] = useState(0);

const [value, setValue] = useState("")
const onChangeData = (e) => {setValue(e.target.value)}

const [items, setItems] = useState([])
// const [ShowAddProducts, setShowAddProducts]= useState(false);

const [addedItems, setAddedItems] = useState([])


useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));
    console.count("hi");
  }, []);

useEffect(() => {
setNum (addedItems.length)
}, [addedItems]);


return (<div>
    {/* <Cart num={num} setshowCart={setShowAddProducts}/> */}
    <Products items={items} ShowAddProducts={ShowAddProducts} setShowAddProducts={setShowAddProducts} addedItems={addedItems} searchValue={value} setAddedItems={setAddedItems}/>
    </div>)

}

export default Home;