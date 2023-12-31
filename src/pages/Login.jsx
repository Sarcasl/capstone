import React, { useEffect, useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import { baseUrl } from '../shared';
import '../stylesheets/account.css'

function Login() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [slide, setSlide] = useState(false)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const location = useLocation();
    const navigate = useNavigate();


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


        fetch('https://fakestoreapi.com/products/')
            .then((res) => res.json())
            .then((data) => setProducts(data))

        return () => {
            clearInterval(i)
        }
    }, [])


// Login and Logout Function
    function appLogin(e) {
        e.preventDefault();
        const url = 'https://fakestoreapi.com/auth/login'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {


                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setLoggedIn(true);
                navigate(
                    location?.state?.previousUrl
                        ? location.state.previousUrl
                        : '/'
                );
            });
    }


    // Login CSS    
    return (
        <form className="m-2 w-full max-w-sm" id="customer" onSubmit={appLogin}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label for="username">Username</label>
                </div>

                <div className="md:w-3/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label for="password">Password</label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="password"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
        </form>
    );
}

export default Login;