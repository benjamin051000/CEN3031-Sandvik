import React from 'react';
import {Link} from 'react-router-dom';

const CalculatorOutput = (props) => {
    const inputNames = {
        "projName":"Project Name",
        "custName":"Customer Name",
        "companyName":"Company Name",
        "date":"Date",
        "ucs":"Rock UCS",
        "fracturization":"Fracturization",
        "elevation":"Elevation",
        "fuelCost":"Fuel Cost",
        "estHours":"Estimated Hours",
        "temp":"Ambient Temperature",
        "carbTaxTonne":"Carbon Tax ($ per Tonne)",
        "drillTimePercent":"Drill Time (% of Time Active)",
        "fuelTankSize":"Fuel Tank Size",
        "engineRebuildCost":"Engine Rebuild Cost",
        "compRebuildCost":"Compressor Rebuild Cost",
        "pipeSize":"Pipe Size (Units !!!!!!!!!!!!!!!!!!!!!!!)",
        "holeDepth":"Hole Depth",
        "dthComp":"DTH Compressor",
        "dthWap":"DTH WAP",
        "dthHammer":"DTH Hammer",
        "dthBit":"DTH Bit",
        "rotPulldown":"Rotary Pulldown",
        "rotComp":"Rotary Compressor",
        "rotBit":"Rotary Bit",
        "rotRpm":"Rotary RPM",
    }


    let calculation_inputs = props.location.state.inputs; // Will be here
   
    console.log('[CalculatorOutput.js] Received output info:',props.location.state.outputs);
    /* TODO: This is where we would call the function to get the outputs. For now, dummy outputs will be used. */
    //const outputs = {};


    return (
        <div class="ui centered container">
               
            <div style={{color: "white"}} class="ui relaxed internally celled grid">
                <div class="one column row">
                    <div class="column">
                        <h1 style={{fontSize:"20pt", color:"#009aff"}} class="ui left aligned header">Project Specifications:</h1>
                        <div class="ui three column grid">
                            {  Object.keys(calculation_inputs).map((e) => 
                                <p class="column">{inputNames[e]}: {calculation_inputs[e]}</p>)
                            }
                        </div>
                    </div>
                </div>
                <div class="two column row">
                    <div class="six wide column">
                        <h1 style={{fontSize:"20pt", color:"#009aff"}}>Rig Model</h1>
                        <p>This is the recommended rig. You can change the model to assess different pricings.</p>
                        {/* TODO: get recommended rig from function */}
                        <select>
                            <option>Drill #1</option>
                            <option>Drill #2</option>
                            <option>Drill #3</option>
                        </select>
                    </div>
                    <div class="ten wide column">
                        <h1 style={{fontSize:"20pt", color:"#009aff"}}>Pricing Information</h1>
                        <p>...</p>
                        {/* TODO get outputs & pricing info from function */}
                    </div>
                </div>
            </div>

            <div class="ui grid">
                <div class="one wide left floated column">
                    <Link to="/dashboard" class="ui blue medium button" >Back</Link>
                </div>
                <div class="ten wide column"></div>
                <div style={{marginRight:"-10px"}} class="one wide column">
                    <button class="ui blue medium button" type="Edit">Edit</button>
                </div>    
                <div style={{marginRight:"85px"}} class="one wide right floated column">
                    <button class="ui blue medium button" type="Delete">Delete</button>
                </div>    
            </div> 
        </div>
    );

};

export default CalculatorOutput;