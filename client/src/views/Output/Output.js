import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import RigModal from '../../components/RigModal.js';
import {RigInformation, PricingInformation, RigDropdown} from '../../components/OutputComponents.js';

import dummy_rig_models from './dummy_rig_models.json';
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


const get_rigs_from_storage = () => {
    // TODO check if its' there and sync if not ?
    return JSON.parse(localStorage.getItem('drillData'));
}

const CalculatorOutput = (props) => {

    const [rig, setRig] = useState({});
    const [gotoInput, setGotoInput] = useState(false);
    
    const toEdit = () =>{
        localStorage.setItem("isEditing", true);
        localStorage.setItem("editingItem", JSON.stringify(JSON.parse(localStorage.getItem("historyStorage"))[0]))
        setGotoInput(true)
    }

    //const toDelete = () => {
        //return ;
    //}

    let list_of_rigs;

    let calc_inputs, calc_outputs;

    // Load data (from dummy files or elsewhere)
    if (props.location.state) {
        calc_inputs = props.location.state.inputs;
        list_of_rigs = get_rigs_from_storage();
        console.log('Loaded form inputs & browser cache rig models.');
    }
    else {
        calc_inputs = dummy_data.inputs;
        list_of_rigs = dummy_rig_models;
        console.log('[Output.js] Loaded test inputs & rig models.')
    }

    const objectEmpty = (obj) => {
        // because Object.keys(new Date()).length === 0;
        // we have to do some additional check
        return Object.keys(obj).length === 0
            && obj.constructor === Object;
    };

    // Calculate the outputs, or load them from a dummy file.
    if(!objectEmpty(rig)) {
        console.log('[Output.js] Running calculations...');
        // calc_outputs doesn't exist yet (needs to be calculated).

        console.log('Input to be used in calculations:', calc_inputs, rig);

        calc_inputs.dthWap = parseInt(calc_inputs.dthWap);

        calc_outputs = run_calculations(calc_inputs, rig);
        console.log('calculated results:', calc_outputs);
    }
    else {
        console.log('[Output.js] loaded dummy output.');
        calc_outputs = dummy_data.outputs;
    }

    return gotoInput ? <Redirect to={{
        pathname: '/calculator',
    }} />
    :
    (
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
                        
                        <RigDropdown setRig={setRig} rigs={list_of_rigs}/>

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
                    <Button onClick={toEdit} size='medium' color='blue' type="Edit">Edit</Button>
                </Grid.Column>

                <Grid.Column floated='right' style={{ marginRight: "85px" }}>
                    <Button size='medium' color='blue' type="Delete">Delete</Button>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default CalculatorOutput;