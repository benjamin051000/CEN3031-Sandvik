import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

//Set website header, includes the bar with home
const Header = () => {
    return (
        <div>
            
            <div className="sandvik-header">
                      
                {/* Logo - Stored in client/public */} 
                <div className="logo-text-align">
                    <img src={ "/sandviklogo.png" } alt="Sandvik logo" />
                    <p className="name-text">Drillsite Calculator</p>
                </div>   

                {/* Page Links */}
                <div className="header-links">
                    <div className="header-links-filler" ></div>
                    <Link className="buttons-header" to='/login' >Sign in</Link>
                    <Link className="buttons-header" to='/dashboard'>Dashboard</Link>
                    <Link className="buttons-header" to="/settings">Settings</Link>
                </div>
            </div>

            

        </div>
        
    )
}

export default Header;
