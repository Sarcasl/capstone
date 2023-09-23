import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { baseUrl } from './shared'

const App = () => {
  const [slide, setSlide] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  // const [ShowAddProducts, setShowAddProducts]= useState(false);
  const [cart, setCart] = useState([])
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access') ? true : false)
  const [inputValue, setInputValue] = useState('')

  const context = {
    cartState: [cart, setCart],
    searchState: [search, setSearch],
    prodState: [products, setProducts],
    sliderState: [slide, setSlide]
  }

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

    // JR: Fetch and set products in App
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data))
    // JR: must clear intervals and timeouts this way
    return () => {
      clearInterval(i)
    }
  }, [])

  function changeLoggedIn(value) {
    value ? setLoggedIn(value) : localStorage.clear()
  }

  const onChangeData = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login/SignUp</Link>
        <Link to="/checkout">Checkout</Link>
        <input
          className="search__input"
          type="text"
          placeholder="Enter product name"
          value={inputValue}
          onChange={onChangeData}
        />
        <button className="ui-change-btn" onClick={() => setSearch(inputValue)}>
          Search
        </button>
        <button
          className="ui-change-btn"
          onClick={() => {
            setSlide(true)
          }}>
          Checkout <span>{cart.length}</span> {cart.length === 1 ? 'item' : 'items'}
        </button>
      </div>
      <Outlet context={context} />
    </>
  )
}

export default App

//move browser router
//indent lines
