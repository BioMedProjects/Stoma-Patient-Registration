import React, { useState, useEffect } from "react";
import logo from '../assets/img/logo.png'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export function Navbar(props) {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    const toggleClick = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        const storage = localStorage.getItem("user")
        const data = JSON.parse(storage);
        setUser(data)
    }, [])
    const logout = () => {
        const request = {
            "data": user.token
        }
        axios
            .post('http://127.0.0.1:8000/users/logout/', request)
            .then(() => {
                localStorage.removeItem("user")
                navigate('/')
            })
            .catch((err) => {
                return (err);
            })
    }
    const handleClick = () => {
        const storage = localStorage.getItem("user")
        const user = JSON.parse(storage);
        if (user) {
            if (!user.is_staff) {
                navigate('/account')
            } else navigate('/accountdoc')
        } else navigate('/')
    }
    return (
        <div>
            <nav className="bg-black shadow ">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="w-full justify-between flex items-center">
                            <a className="flex-shrink-0 hidden md:block" href="/">
                                <img src={logo} alt="Workflow" className="w-5 py-2 ml-2" />
                            </a>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                        Strona główna
                                    </a>
                                    <button className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleClick}>
                                        Konto
                                    </button>
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                        Cennik
                                    </a>
                                    <a className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/#">
                                        Kontakt
                                    </a>
                                    {user ? (<button onClick={() => logout()} className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Wyloguj
                                    </button>) : null}
                                </div>
                            </div>
                        </div>
                        <div className="block">
                            <div className="ml-4 flex items-center md:ml-6">
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none" onClick={toggleClick}>
                                <svg width="20" height="20" fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {toggle ? (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Strona główna
                            </a>
                            <button className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={handleClick}>
                                Konto
                            </button>
                            <b className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Cennik
                            </b>
                            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                                Kontakt
                            </a>
                            {user ? (<button onClick={() => logout()} className="text-yellow-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                Wyloguj
                            </button>) : null}
                        </div>
                    </div>) : (<div />)
                }
            </nav>
        </div>

    );
}