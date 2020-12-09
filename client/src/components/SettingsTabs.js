import React from 'react';
import { Tab } from 'semantic-ui-react';
// import { writeToJSON } from "../functions/JSONFunctions";


const panes = [
  { menuItem: 'Rig Spec Settings', render: () => 
    <Tab.Pane style={{backgroundColor:"#272727", border:"5px solid #009aff"}}>
      <div style={{color:"#009aff", marginBottom:"15px"}} class="ui centered header">Rig Spec Settings</div>
      <div style={{marginTop:"15px"}} class="ui three centered column grid">
          <div class="ui blue medium button">Add</div>
          <div class="ui blue medium button">Edit</div>
          <div class="ui blue medium button">Delete</div>
      </div>
    </Tab.Pane> },

  { menuItem: 'Sync', render: () => 
    <Tab.Pane style={{backgroundColor:"#272727", border:"5px solid #009aff"}}>
        <div style={{color:"#009aff", marginBottom:"15px"}} class="ui centered header">Sync with Server</div>
        <div style={{marginTop:"30px"}} class="ui two column centered grid">
            <div class="two wide column">
                <div style={{color:"white", fontSize:"10pt", marginTop:"-15px", marginBottom:"30px"}}>Last Synced: MY DATE</div>
            </div>
            <div>
                <button onClick={{}} class="ui blue medium button">Sync</button>
            </div>
        </div>
    </Tab.Pane  > },

  { menuItem: 'User Settings', render: () => 
    <Tab.Pane style={{backgroundColor:"#272727", border:"5px solid #009aff"}}>
        <div style={{color:"#009aff", marginBottom:"15px"}} class="ui centered header">User Settings</div>
        
        <div class="ui centered grid">
            <div class="row">
                <div class="ui vertical buttons">
                <div class="ui blue medium button">Change Username</div>
                <div class="ui blue medium button">Change Password</div>
            </div>
            </div>
                <div class="row">
                <div class="ui grey medium button">Delete Account</div>
            </div>
        </div>
        
    </Tab.Pane> },
    ]

const SettingsTabs = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true, inverted:true, color: "blue" }} panes={panes} />
)

export default SettingsTabs
