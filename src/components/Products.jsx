import ProductCard from './ProductCards'
import { useOutletContext } from 'react-router-dom'
import '../stylesheets/cards.css'

const Products = () => {
  const { prodState, sliderState, searchState } = useOutletContext()
  const [products] = prodState
  const [slide] = sliderState
  const [search] = searchState
  const itemsFilter = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="body__container">
      {/* {!!slide && <SlidingCheckout />} */}
      <div className="card__body">
        {!!itemsFilter.length &&
          itemsFilter.map((product, i) => <ProductCard product={product} key={i} />)}
      </div>
    </div>
  )
}

export default Products
