import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

//Set website header, includes the bar with home
const Header = () => {
    return (
        <div>
            
            <div className="sandvik-header">
                      
                {/* Logo - Stored in client/public */} 
                <div style={{marginTop:"45px"}} class="ui center aligned container">
                    <div class="ui two column grid">
                        <div class="column"><img src={ "/sandviklogo.png" } alt="Sandvik logo" /></div>
                        <div class="column"><p className="name-text">Drillsite Calculator</p></div>
                    </div>   
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
