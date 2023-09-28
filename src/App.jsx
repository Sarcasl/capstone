import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet, Link } from 'react-router-dom'
import { baseUrl } from './shared'
import Sort from './Components/Sort';
import Dropdown from './Components/Dropdown';

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



<div className="dropDown">
                <Dropdown category={category} setCategory={setCategory} /> 
            </div>
            

<div className="sort">
                <Sort sort={sort} setSort={setSort} />
            </div>



            
    
<div className="searchbar">
<h4>Global Search</h4>
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


