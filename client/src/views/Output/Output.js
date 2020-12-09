import React from 'react';
import { Link } from 'react-router-dom';

import dummy_data from './dummy_data.json';

const inputNames = {
    "projName": "Project Name",
    "custName": "Customer Name",
    "companyName": "Company Name",
    "date": "Date",
    "ucs": "Rock UCS",
    "fracturization": "Fracturization",
    "elevation": "Elevation",
    "fuelCost": "Fuel Cost",
    "estHours": "Estimated Hours",
    "temp": "Ambient Temperature",
    "carbTaxTonne": "Carbon Tax ($ per Tonne)",
    "drillTimePercent": "Drill Time (% of Time Active)",
    "fuelTankSize": "Fuel Tank Size",
    "engineRebuildCost": "Engine Rebuild Cost",
    "compRebuildCost": "Compressor Rebuild Cost",
    "pipeSize": "Pipe Size",
    "holeDepth": "Hole Depth",
    "dthComp": "DTH Compressor",
    "dthWap": "DTH WAP",
    "dthHammer": "DTH Hammer",
    "dthBit": "DTH Bit",
    "rotPulldown": "Rotary Pulldown",
    "rotComp": "Rotary Compressor",
    "rotBit": "Rotary Bit",
    "rotRpm": "Rotary RPM",
}

const CalculatorOutput = (props) => {

    let calc_inputs, calc_outputs;
    if (props.location.state) {
        let { inputs: i, outputs: o } = props.location.state;

        // TODO does this work? Or is this python syntax? Lol
        calc_inputs = i;
        calc_outputs = o;
        console.log('[Output.js] Received output info:', calc_outputs);
    }
    else {
        calc_inputs = dummy_data.inputs;
        calc_outputs = dummy_data.outputs;
        console.log('[Output.js] Loaded dummy_data.json.')
    }

    return (
        <div class="ui centered container">
            <div style={{ color: "white" }} class="ui relaxed internally celled grid">
                <div class="one column row">
                    <div class="column">
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }} class="ui left aligned header">Project Specifications:</h1>
                        <div class="ui three column grid">
                            {Object.keys(calc_inputs).map(e =>
                                <p class="column"><u><h3>{inputNames[e]}:</h3></u> {calc_inputs[e]}</p>)
                            }
                        </div>
                    </div>
                </div>
                <div class="two column row">
                    <div class="six wide column">
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }}>Rig Model</h1>
                        <p>This is the recommended rig. You can change the model to assess different pricings.</p>
                        {/* TODO: get recommended rig from function */}
                        <select>
                            <option>Drill #1</option>
                            <option>Drill #2</option>
                            <option>Drill #3</option>
                        </select>
                    </div>
                    <div class="ten wide column">
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }}>Pricing Information</h1>
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
                <div style={{ marginRight: "-10px" }} class="one wide column">
                    <button class="ui blue medium button" type="Edit">Edit</button>
                </div>
                <div style={{ marginRight: "85px" }} class="one wide right floated column">
                    <button class="ui blue medium button" type="Delete">Delete</button>
                </div>
            </div>
        </div>
    );

};

export default CalculatorOutput;