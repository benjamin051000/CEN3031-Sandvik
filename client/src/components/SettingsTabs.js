import React from 'react'
import { Tab } from 'semantic-ui-react'
import ChangePassword from './ChangePasswordModel'
import ChangeUsername from './ChangeUsernameModal'

const syncTo = () => {
   
    //Sync history
    fetch('/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: localStorage.getItem("historyStorage")
    }).then(res => res.json())
    .then(json => {
      console.log('json', json)
        if(json.success){
            
        }
        
    })
}

const syncFrom = () =>{
     //Sync drill data
     fetch('/api/drillRigs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(res => res.json())
    .then(json => {
        localStorage.setItem("drillData", JSON.stringify(json))
    })
    //Sync history
    fetch('/api/history/' + localStorage.getItem("userId"), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(res => res.json())
    .then(json => {
      localStorage.setItem("historyStorage", JSON.stringify(json))
    })
}



const panes = [

    {
        menuItem: 'Sync', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <div style={{ color: "#009aff", marginBottom: "15px" }} class="ui centered header">Sync with Server</div>
                <div style={{ marginTop: "30px" }} class="ui two column centered grid">
                    
                    <div style={{ color: "white", fontSize: "10pt", marginTop: "-15px"}}>Last Synced: MY DATE</div>
                    
                    <div class="row">
                        <button onClick={syncTo} class="ui blue medium button">Sync to server</button>
                        <button onClick={syncFrom} class="ui blue medium button">Sync from server</button>
                    </div>
                </div>
            </Tab.Pane  >
    },

    {
        menuItem: 'User Settings', render: () =>
            <Tab.Pane style={{ backgroundColor: "#272727", border: "5px solid #009aff" }}>
                <div style={{ color: "#009aff", marginBottom: "15px" }} class="ui centered header">User Settings</div>

                <div class="ui centered grid">
                    <div class="row">
                        <div class="ui vertical buttons">
                            <ChangeUsername />
                            <ChangePassword />

                        </div>
                    </div>
                </div>

            </Tab.Pane>
    },
]

const SettingsTabs = () => (
    <Tab menu={{ fluid: true, vertical: true, tabular: true, inverted: true, color: "blue" }} panes={panes} />
)

export default SettingsTabs
