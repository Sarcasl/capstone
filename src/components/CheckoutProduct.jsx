import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const CardList = ({ product }) => {
  const { cartState } = useOutletContext()

  const [cart, setCart] = cartState

  // JR: redefinition of remove Item, we want to avoid this
  // consider putting it in a helper file, necessitates refactor, adding "cart" and "setCart" as parameters
  function removeItem(product) {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id)
    setCart(newCart)
  }

  // JR: Change quantity of the item in the cart, not just a number
  // also, if it gets to 0 or less, remove it.
  // qty in this function can be any number, so you can add
  // a feature later to make a product qty anything
  function changeQty(product, qty) {
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
            onClick={() => {
              // JR: can change second arg later to be any number
              changeQty(product, product.qty + 1)
            }}>
            +
          </button>
          <span className="num-of-items">{product.qty}</span>
          <button
            className="minus-btn"
            onClick={() => {
              changeQty(product, product.qty - 1)
            }}>
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardList
