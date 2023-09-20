import React, { useEffect, useState } from "react";
import LoGo from "../../assets/react.svg";
import "./Header.css";
import Search from "../search/Search"
import User from "../user/User"
import Cart from "../cart/Cart"


const Header = ({items}) => {
  // const [showAddProducts, setShowAddProducts] = useState(false);
  // const [searchValue, setSearchValue] = useState("");
  // const [addedItems, setAddedItem] = useState([]);

  // function changingSearchData(e) {
  //   setSearchValue(e.target.value);

  // } 
  // function addItem(item) {
  //   item.addNumber = 1;
  //   const itemArr = addedItems;
  //   setAddedItem([...itemArr, item]);
  // }

  






  
  //Header of store
  return (<div>
    <header>
      {/* <img className="header__logo" src={LoGo} alt="" /> */}
      <h1>Variety Store</h1>
    </header>



<div className ="body">
       <div className="body__container">
        <div className="nav">
          <div className="nav-right">
             <User/>
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSearchData}
            /> 
            <Cart num={addedItems.length} click={setShowAddProducts} />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;
