import React, { useEffect, useState } from "react";
import LoGo from "../../assets/react.svg";
import "./Header.css";
import Search from "../search/Search"
import User from "../user/User"
import Cart from "../cart/Cart"


const Header = ({items}) => {





  
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
