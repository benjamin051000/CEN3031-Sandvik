import React from 'react';
import {Link} from 'react-router-dom';

import './Dashboard.css';

function Dashboard() {
   

    return (
        <div>
            <h1 className="dashboard-header">Dashboard</h1>
            
            <div className="buttons-layout">
                <Link to="/calculator" className="dashboard-button">New Calculation</Link>
                <Link to="/history" className="dashboard-button">History</Link>
                <Link to="/settings" className="dashboard-button">Settings</Link>
            </div>
                       
        </div>
    );
}

export default Dashboard;
