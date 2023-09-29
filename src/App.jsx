import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet, Link } from 'react-router-dom'
import { baseUrl } from './shared'
import Sort from './components/Sort';
import ProductGroup from './components/ProductGroup';

import './stylesheets/app.css'




export const LoginContext = createContext();
// const ThemeContext = createContext(null);

// Persistant Cart
// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))

// Fuctions
const App = () => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [cart, setCart] = useState([])
  const [slide, setSlide] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  useEffect  (() => {

    const localCart = async () => {

    const cartFromLocalStorage = await JSON.parse(localStorage.getItem('cart'))
    if (cartFromLocalStorage && cartFromLocalStorage.length>0){
      setCart(cartFromLocalStorage)
    }
  }

  localCart () 

  },[]
  )
  // Persistant Cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)
  const [inputValue, setInputValue] = useState('')

  const context = {
    cartState: [cart, setCart],
    searchState: [search, setSearch],
    prodState: [products, setProducts],
    sliderState: [slide, setSlide]
  }

  const handleKeypress = e => {         
    if (e.keyCode === 13) 
    {      handleSubmit();    }  };

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.getItem('refresh')) {
        const url = baseUrl + 'api/token/refresh/'
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: localStorage.getItem('refresh')
          })
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            setLoggedIn(true)
          })
      }
    }

    const minute = 1000 * 60
    refreshTokens()
    const i = setInterval(refreshTokens, minute * 3)

    //FakeStoreAPI fetch
    fetch(`https://fakestoreapi.com/products${category}${sort}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
   
    return () => {
      clearInterval(i)
    }
  }, [category, sort]);

  function changeLoggedIn(value) {
    value ? setLoggedIn(value) : localStorage.clear()
  }

  const onChangeData = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <>
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <div className="nav">
        
        <Link to="/">Storefront</Link>
        {/* Login/Logout Form */}
        {
        loggedIn ?
        <Link to="/login" onClick={() => {
          localStorage.removeItem("token")
          setLoggedIn(false)
        }}>Sign Out</Link>:
        <Link to="/login">Sign In</Link> 
      }


{/* Dropdown filter menu */}
<div className="dropDown">
                <ProductGroup category={category} setCategory={setCategory} /> 
            </div>

{/* Sort Items */}
<div className="sort">
                <Sort Sort={sort} setSort={setSort} />
            </div>

        
{/* Searchbar */}
<div className="searchbar">
<h4>Search</h4>
<input
type='text'
placeholder="Search..."
  onChange={(e) => setSearch(e.target.value)}
  />
                {list &&
                    list.filter((value) => {
                        if (search === '') {
                            return value
                        } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
                            return value
                        } else if (value.category.includes({ category })) {
                            return value
                        }
                    })
                        .map((item) => {
                            return (
                                <div key={item.id} className="searchbar">
                                    <img className="img" src={item.image} alt={item.title} />
                                    <h3>{item.title}</h3>
                                    <p>{item.category}</p>
                                    <span>{item.price} ${" "}</span>
                                    <p>{`${item.description}`}</p>
                                </div>
                            );
                        })}     
            </div>

       
{/* Cart Button */}
        <button
          className="ui-change-btn"
          onClick={() => {
            setSlide(true)
          }}>
          <Link to="/checkout">Checkout<span>{cart.length}</span> {cart.length === 1 ? 'Item' : 'Items'}</Link>
        </button>
      </div>
      <Outlet context={context} />
      </LoginContext.Provider>  
    </>

  )
}
export default App


