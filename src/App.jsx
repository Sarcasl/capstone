import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet, Link } from 'react-router-dom'
import { baseUrl } from './shared'
// import { useTable, useSortBy } from './table'
import './stylesheets/app.css'




export const LoginContext = createContext();
const ThemeContext = createContext(null);

// Persistant Cart
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'))


const App = () => {
  const [cart, setCart] = useState(cartFromLocalStorage)
  const [slide, setSlide] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  const [list, setList] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');





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
        
        <Link to="/">Home</Link>
        {/* Login/Logout Form */}
        {
        loggedIn ?
        <Link to="/login" onClick={() => {
          localStorage.removeItem("token")
          setLoggedIn(false)
        }}>Logout</Link>:
        <Link to="/login">Login</Link> 
      }

        
    
        <div className='dropdown'>
            <h4>Select Category</h4>
            <select value={category} onChange={(e) => { setCategory(`/category/${e.target.value}`) }}>
                <option></option>
                <option>electronics</option>
                <option>jewelery</option>
                <option>men's clothing</option>
                <option>women's clothing</option>
            </select>
        </div>
    


{/* Searchbar */}
        <input
          className="search__input"
          type="text"
          placeholder="Enter product name"
          value={inputValue}
          onChange={onChangeData}
        />

        <button type="submit" className="ui-change-btn" onClick={() => setSearch(inputValue)} 
        onKeyDown={handleKeypress}>
          Search
        </button>
        

{/* Checkout button */}
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


