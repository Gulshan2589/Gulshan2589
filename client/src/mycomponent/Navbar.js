import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Sun from '@iconscout/react-unicons/icons/uil-sun';
import Moon from '@iconscout/react-unicons/icons/uil-moon';
import { themeContext } from '../../src/Context';
import { useContext } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
// import Toggle from "../mycomponent/Toggle";


function Navbar() {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [showMediaIcons, setShowMediaIcons] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        theme.dispatch({ type: "toggle" })
    }
    const location = useLocation().pathname;
    if (location !== "/login" && location !== "/register") {
        return (
            <>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <div className="logo me-auto">
                            {/* <h1><NavLink to="/">Hisab Book</NavLink></h1> */}
                            <NavLink to="/"><img src="assets/img/log1.png" alt="" className="img-fluid" /></NavLink>
                        </div>
                        <nav id="navbar" className="navbar order-last ms-auto order-lg-0">
                            <ul>
                                <li><NavLink className="nav-link scrollto active" to="/">Home</NavLink></li>
                                <li><NavLink className="nav-link scrollto" to="/dashboard">Dashboard</NavLink></li>
                                <li><NavLink className="nav-link scrollto " to="/contact">Contact</NavLink></li>
                                <li><NavLink className="nav-link scrollto" to="/face">Face</NavLink></li>
                                <li><NavLink className="nav-link scrollto" to="/about">About</NavLink></li>
                            </ul>
                            <i className="bi bi-list mobile-nav-toggle"></i>
                        </nav>
                        <div className="toggle" onClick={handleClick}>
                            <Moon style={{
                                color: darkMode ? "white" : 'black'
                            }} />
                            <Sun style={{
                                color: darkMode ? "yellow" : ''
                            }} />
                            <div className="t-button"
                                style={darkMode ? { left: '3px' } : { right: '3px' }}
                            >
                            </div>
                        </div>
                        <div className="lg-button">
                            <button onClick={() => {
                                localStorage.removeItem('Hisabbook-user');
                                navigate("/login");
                            }}>Logout</button>
                        </div>
                    </div>
                </header>
            </>
        );
    }

}
export default Navbar;