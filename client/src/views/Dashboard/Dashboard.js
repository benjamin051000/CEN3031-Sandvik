import React from 'react';
import {Link} from 'react-router-dom';

import './Dashboard.css';

function Dashboard() {
    const Flippy = () =>{
        localStorage.setItem("userId", 3)
       
    }

    return (
        <div class="ui centered container">
            <h2 style={{fontSize:"30pt", color:"#009aff"}} class="ui centered header">Dashboard</h2>
            
            <div class="ui middle aligned center aligned three column grid">
                <div class="column">
                    
                    <Link to="/calculator" style={{marginBottom:"15px"}} class="ui fluid massive blue button">Calculator</Link>
                    
                    <Link to="/history" style={{marginTop:"15px", marginBottom:"15px"}} class="ui fluid massive blue button">History</Link>
                    
                    <Link to="/settings" style={{marginTop:"15px", marginBottom:"15px"}} class="ui fluid massive blue button">Settings</Link>
                   
                    <button onClick={Flippy} class="ui blue button">test</button>
                </div>
            </div>     

        </div>
    );
}

export default Dashboard;
