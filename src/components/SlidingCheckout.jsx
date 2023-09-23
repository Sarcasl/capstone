import { useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useOutletContext } from 'react-router-dom'
const SlidingCheckout = () => {
  const { prodState, cartState, sliderState } = useOutletContext()
  const [cart, setCart] = cartState
  const [products, setProducts] = prodState
  const [slide, setSlide] = sliderState

  const total = cart
    .reduce((acc, prod) => {
      return acc + Number(prod.qty) * Number(prod.price)
    }, 0)
    .toFixed(2)

  return (
    <div className="addproducts__container">
      <div className="left-side">
        <div className="check-out-container">
          <div className="check-out-print">
            <h1 className="check-out-title">Shopping</h1>
            {/* <p>{curDate}</p> */}
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
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="right-side-header">
          <h1>
            Shopping <span className="total-items">{cart.length}</span>
            {cart.length <= 1 ? ' item' : ' items'}
          </h1>
          <button
            className="remove-item-btn"
            onClick={() => {
              setSlide(false)
            }}>
            ⌫
          </button>
        </div>

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

          {/* Check Out Button */}
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
  )
}

export default SlidingCheckout
