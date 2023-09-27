import { useOutletContext } from 'react-router-dom'
import '../stylesheets/cards.css'


const ProductCard = ({ product }) => {


  const { cartState } = useOutletContext()
  const [cart, setCart] = cartState

  const checkCartForProduct = () => {
    if (cart.filter((p) => p.id === product.id).length) {
      return true
    }
    return false
  }
  
  const isInCart = checkCartForProduct()

  function addItem(product) {
    const newProduct = { ...product, qty: 1 }
    const newCart = [...cart, newProduct]
    
    setCart(newCart)
    console.log(newCart)
  }

  function removeItem(product) {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id)
    setCart(newCart)
  }

  return (
    <div className="card">
      <img className="card__img" src={product.image} alt={`image of ${product.title}`} />
      <div>
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <p>{product.description}</p>
      </div>

      {/* Price of item listed in cart */}
      <div className="card-price-add">
        <span>Price : ${product.price}</span>
        <button
          className={!isInCart ? 'add-item-btn' : 'remove-item-btn'}
          onClick={() => {
            !isInCart ? addItem(product) : removeItem(product)
          }}>
          {!isInCart ? 'ADD ' : 'CANCEL'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
