import SlidingCheckout from './SlidingCheckout'
import ProductCard from './ProductCard'
import { useOutletContext } from 'react-router-dom'

const Products = () => {
  const { prodState, sliderState, searchState } = useOutletContext()
  // destructure state here
  const [products] = prodState
  const [slide] = sliderState
  const [search] = searchState
  const itemsFilter = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  // useEffect(() => {
  //   let i
  //   if (animate) {
  //     ;() => setAnimate(false), 200
  //   }
  //   return () => clearInterval(i)
  // }, [animate])

  return (
    <div className="body__container">
      {!!slide && <SlidingCheckout />}
      <div className="card__body">
        {!!itemsFilter.length &&
          itemsFilter.map((product, i) => <ProductCard product={product} key={i} />)}
      </div>
    </div>
  )
}

export default Products
