import React from "react";
import "./Cart.css";

//Amount of items listed on main page top right
const Cart = ({ num, click }) => {
  return (
    <button className="ui-change-btn" onClick={() => click(true)}>
      You Added <span>{num}</span> {num <= 1 ? "item" : "items"}
    </button>
  );
};

export default Cart;
