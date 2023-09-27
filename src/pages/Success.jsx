import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom'
import CheckoutProduct from  '../components/CheckoutProducts';
import '../stylesheets/checkout.css'
import '../stylesheets/app.css'




function Success() {

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

{
    
    return (
    <div className="addproducts__container">
      <div className="left-side">
        <div className="check-out-container">
          <div className="check-out-print">
            <h1 className="check-out-title">Shopping</h1>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="table-item-title">Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, i) => (
                  <tr key={product.id}>
                    <td>{i + 1}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>{product.qty}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="total" colSpan={2}>
                    Total
                  </td>
                  <td className="total" colSpan={2}>
                    ${total}
                  </td>
                </tr>
              </tfoot>
            </table>


            <div className="right-side-body">
          {cart.map((product, i) => (
            <CheckoutProduct product={product} key={i} />
          ))}
        </div>

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
      </div>
    </div>
</div>
          





  );
}
      }

export default Success;