import React from 'react';
import {Link} from 'react-router-dom';

import './Dashboard.css';

function Dashboard() {
   

    return (
        <div>
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <div className="buttons-layout">
                <Link to="/calculator" className="button">New Calculation</Link>
                <Link to="/history" className="button">History</Link>
                <Link to="/settings" className="button">Settings</Link>
            </div>
                       
        </div>
    );
}

export default Dashboard;
