import React from 'react';
import { Link } from 'react-router-dom';

//Set website header, includes the bar with home
const NewHeader = () => {
    return (
        <div class="ui fluid container">
            
            <div className="sandvik-header">
                      
                {/* Logo - Stored in client/public */} 
                <div style={{marginTop:"40px"}} >
                    <div class="column">
                        <img style={{border:"4px solid #009aff"}} class="ui centered image" src={ "/sandvik_header_2.png" } alt="Sandvik logo" />
                    </div>   
                </div>

                {/* Page Links */}
                <div style={{marginTop:"35px",  marginBottom:"35px", position:"static"}} class="ui inverted menu" >
                    <div class="right menu" >
                    <Link class="item" to='/login' >Sign in</Link>
                    <Link class="item" to='/dashboard'>Dashboard</Link>
                    <Link class="item" to="/settings">Settings</Link>
                    </div>
                </div>
            </div>

            

        </div>
        
    )
}

export default NewHeader;
