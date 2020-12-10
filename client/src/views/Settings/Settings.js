import React from 'react';
import SettingsTabs  from "../../components/SettingsTabs"
//import {useState} from 'react'

import "./Settings.css"

function Settings() {
    
// const [showUsername, setShowUsername] = useState(false)
// const [showPassword, setShowPassword] = useState(false)


    return (
        <div class="ui centered container">
            <SettingsTabs />
        </div>

    );
}

export default Settings;
