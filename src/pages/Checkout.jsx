import React, { useEffect, useState, createContext, useContext } from "react";
// import { Outlet, Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom'
import CheckoutProduct from  '../components/CheckoutProducts';
import '../stylesheets/checkout.css'


export const LoginContext = createContext();


function Checkout(){
    const { prodState, cartState, sliderState } = useOutletContext()
    const [cart, setCart] = cartState

    const total = cart
      .reduce((acc, prod) => {
        return acc + Number(prod.qty) * Number(prod.price)
      }, 0)
      .toFixed(2)
      
   
      const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)
      const [inputValue, setInputValue] = useState('')
    


      function changeLoggedIn(value) {
        value ? setLoggedIn(value) : localStorage.clear()
      }

      // Items function
      const AddProducts = ({ items, click, removeItem, setAddedItem }) => {
        const total = items
          .reduce((pre, cur) => {
            return pre + Number(cur.addNumber) * Number(cur.price);
          }, 0)
          .toFixed(2);
        }
    

    return(
      <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
        <div className="right-side">
        <div className="right-side-header">

        {/* Items in cart */}
          <h1>
            <span className="total-items">{cart.length}</span>
            {cart.length <= 1 ? ' Item ' : '   Items '}
            In Cart
          </h1>

          <button
            className="remove-item-btn"
            onClick={() => {
              setCart([])
            }}>
            ⌫
          </button>
          
        </div>

        <div className="right-side-body">
          {cart.map((product, i) => (
            <CheckoutProduct product={product} key={i} />
          ))}
        </div>

        {/* Total */}
        <div className="right-side-footer">
          <div className="bar"></div>
          <div className="footer-head">
            <h1>Total:</h1>
            <h1>${total}</h1>
          </div>


          {/* Checkout Button*/}         
          <div className="check-out">
            <button
              className="check-out-btn"
              onClick={() => {
                cart.length >= 1 && print();
              }}
          >
              Checkout
            </button>
          </div>
        </div>
      </div>
      </LoginContext.Provider>
      
    )   
    
}

export default Checkout;

