import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import RigModal from '../../components/RigModal.js';
import {RigInformation, PricingInformation, RigDropdown} from '../../components/OutputComponents.js';
import dummy_data from './dummy_data.json';

import { Grid, Container, Button } from 'semantic-ui-react';

import run_calculations from '../../functions/FormulaController.js';


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
    "rockDRI": "Rock DRI"
}

const CalculatorOutput = (props) => {

    let [rig, setRig] = useState({});

    let calc_inputs, calc_outputs;

    if (props.location.state) {
        calc_inputs = props.location.state.inputs;
        // calc_outputs doesn't exist yet (needs to be calculated).
        calc_outputs = run_calculations(calc_inputs, rig);
    }
    else {
        calc_inputs = dummy_data.inputs;
        calc_outputs = dummy_data.outputs;
        console.log('[Output.js] Loaded dummy_data.json.')
    }

    return (
        <Container>
            <Grid style={{ color: "white" }} celled='internally'>
                <Grid.Row>
                    <Grid.Column>
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }} class="ui left aligned header">Project Specifications:</h1>
                        <Grid columns={3}>
                            {Object.keys(calc_inputs).map(e =>
                                <Grid.Column key={e}><u>{inputNames[e]}:</u> {calc_inputs[e]}</Grid.Column>)
                            }
                        </Grid>
                    </Grid.Column>
                </Grid.Row>


                {/* Rig model info and pricing info */}
                <Grid.Row>
                    <Grid.Column width={6}>
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }}>Rig Model</h1>
                        <p>This is the recommended rig. You can change the model to assess different pricings.</p>
                        {/* TODO: get recommended rig from function */}
                        {/* <select>
                            <option>Drill #1</option>
                            <option>Drill #2</option>
                            <option>Drill #3</option>
                        </select> */}
                        
                        <RigDropdown setRig={setRig}/>

                        <RigModal rig={rig}/>
                    
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <h1 style={{ fontSize: "20pt", color: "#009aff" }}>Pricing Information</h1>

                        <PricingInformation outputs={calc_outputs} />

                    </Grid.Column>
                </Grid.Row>


                {/* Rig calculator information */}
                <Grid.Row>
                    <Grid.Column>

                        <h1 style={{ fontSize: "20pt", color: "#009aff" }}>Rig Information</h1>

                        <RigInformation outputs={calc_outputs} />

                    </Grid.Column>
                </Grid.Row>
            </Grid>


            {/* Buttons at the bottom of the page */}
            <Grid>
                <Grid.Column floated='left'>
                    <Link to='/dashboard'>
                        <Button size='medium' color='blue'>
                            Back
                        </Button>
                    </Link>
                </Grid.Column>

                <Grid.Column style={{ marginRight: "-10px" }}>
                    <Button size='medium' color='blue' type="Edit">Edit</Button>
                </Grid.Column>

                <Grid.Column floated='right' style={{ marginRight: "85px" }}>
                    <Button size='medium' color='blue' type="Delete">Delete</Button>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default CalculatorOutput;