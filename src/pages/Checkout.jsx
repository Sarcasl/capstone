import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Link} from "react-router-dom"
import Search from "../components/search/Search"
import Cart from "../components/cartStatus/CartStatus"
import Login from "../pages/Login"

import NotFound from '../components/NotFound';
import Register from '../pages/Register';
import { baseUrl } from '../shared';



// import "./App.css";

export const LoginContext = createContext();




const ThemeContext = createContext(null);




const Checkout = () => {
  useEffect(() => {
    function refreshTokens() {
        if (localStorage.refresh) {
            const url = baseUrl + 'api/token/refresh/';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh: localStorage.refresh,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    localStorage.access = data.access;
                    localStorage.refresh = data.refresh;
                    setLoggedIn(true);
                });
        }
    }

    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
}, []);

const [loggedIn, setLoggedIn] = useState(
    localStorage.access ? true : false
);

function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
        localStorage.clear();
    }
}


const [value, setValue] = useState("")
const onChangeData = (e) => {setValue(e.target.value)}


const [num, setNum] = useState(0);
const [ShowAddProducts, setShowAddProducts]= useState(false);





  return (
<LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
 
<BrowserRouter>
<ThemeContext.Provider>
<div className="body__container"></div>




<div className="nav">
<Link to = "/">Home</Link>
<Link to = "/login">Login/SignUp</Link>
<Link to = "/checkout">Checkout</Link>
<Search value={value} onChangeData={onChangeData}/>
<Cart num={num} setshowCart={setShowAddProducts}/>
</div>


<div className="nav-right"></div>
  <Routes>
    <Route>
  {/* <Route path="/" element={<Home setNum ={setNum} ShowAddProducts ={ShowAddProducts} setShowAddProducts ={setShowAddProducts}/>}/> */}
  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/login" element={<div>Login</div>} />
  </Route>
  </Routes>
  <div></div>
</ThemeContext.Provider>

    

</BrowserRouter>
</LoginContext.Provider>

  )};


export default Checkout; 