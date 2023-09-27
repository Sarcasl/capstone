import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom'
import CheckoutProduct from  '../components/CheckoutProduct';
import '../stylesheets/checkout.css'

function Checkout(){
    const { prodState, cartState, sliderState } = useOutletContext()
    const [cart, setCart] = cartState

    const total = cart
      .reduce((acc, prod) => {
        return acc + Number(prod.qty) * Number(prod.price)
      }, 0)
      .toFixed(2)
      
   


    return (
      

        <div className="right-side">
        <div className="right-side-header">
          <h1>
            Shopping <span className="total-items">{cart.length}</span>
            {cart.length <= 1 ? ' item' : ' items'}
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

        {/* checkout function */}
        <div className="right-side-footer">
          <div className="bar"></div>
          <div className="footer-head">
            <h4>Total :</h4>
            <h1>${total}</h1>
          </div>


          {/* Check Out Button/Checkout Items */}
          <div className="check-out">
            <button
              className="check-out-btn"
              onClick={() => {
                cart.length >= 1 && print()
              }}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    )   
}

export default Checkout;
