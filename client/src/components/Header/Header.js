import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import holedig from '../../assets/holedig.jpg'

//Set website header, includes the bar with home 
const NewHeader = () => {
    return (
        <div style={{backgroundImage:`url(${holedig})`,  backgroundSize:"cover", backgroundPosition:"50px", backgroundPositionX:"0"}} class="ui fluid container">
            <div>
                {/* Logo - Stored in client/public */}
                <div >
                    <div class="column" style={{ paddingTop:"40px"}}>
                        <div >
                            <img class="ui centered image" style={{ border: "4px solid #009aff"}} src={"/sandvik_header_2.png"} alt="Sandvik logo" />
                        </div>
                    </div>
                </div>

                {/* Page Links */}
                <div style={{ marginTop: "35px", marginBottom: "35px", position: "sticky" }} class="ui inverted menu" >
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
