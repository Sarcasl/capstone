import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import '../stylesheets/cards.css'


const CardList = ({ product }) => {
  const { cartState } = useOutletContext()

  const [cart, setCart] = cartState


  function removeItem(product) {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id)
    setCart(newCart)
  }


  function changeQty(product, qty,e) {
    e.preventDefault()
    if (qty >= 1) {
      const newCart = cart.reduce((acc, cProd) => {
        if (cProd.id === product.id) {
          const newProd = { ...product, qty }
          acc.push(newProd)
          return acc
        }
        acc.push(cProd)
        return acc
      }, [])
      setCart(newCart)
    } else {
      removeItem(product)
    }
  }

  // Delete Button
  return (
    <div className="card-list-body">
      <img src={product.image} className="card-list-img" alt="" />
      <button
        className="delete-btn"
        onClick={() => {
          removeItem(product)
        }}>
        ✘
      </button>
      <h4>{product.title}</h4>
      <hr />

      {/* Add and minus buttons */}
      <div className="card-list-add-minus-body">
        <p>Price : ${product.price}</p>
        <div className="plus-items-minus">
          <button
            className="plus-btn"
            onClick={(e) => {
              
              changeQty(product, product.qty + 1,e)
            }}>
            +
          </button>
          <span className="num-of-items">{product.qty}</span>
          <button
            className="minus-btn"
            onClick={(e) => {
              changeQty(product, product.qty - 1,e)
            }}>
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardList
