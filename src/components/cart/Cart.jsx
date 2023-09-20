import React from "react";
import "./Cart.css";

//setshowCart will be the center function that displays the cart
//Amount of items listed on main page top right

const Cart = ({ num, setshowCart }) => {
  return (
    <button className="ui-change-btn" onClick={() => setshowCart(true)}>
      You Added <span>{num}</span> {num <= 1 ? "item" : "items"}
    </button>
  );
};



export default Cart;