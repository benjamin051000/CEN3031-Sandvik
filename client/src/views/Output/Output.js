import React from 'react';
import { Link } from 'react-router-dom';

import RigModal from '../../components/RigModal.js';
import dummy_data from './dummy_data.json';

import { Grid, Container, Button, Tab } from 'semantic-ui-react';

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

const outputNames = {
    // drillingCalc_outputs
    "number_of_pipes": "Number of Pipes",
    "available_WOB": "Available WOB",
    "adjusted_WOB": "Adjusted WOB",
    "adjusted_WOB_for_DTH": "Adj. WOB for DTH",
    // rotary_info
    "max_uhv": "Maximum UHV",
    // rotaryFormulas
    "drill_time": "Drill time",
    "collaring": "Collaring",
    "add_pipe": "Add pipe",
    "retract": "Retract",
    "setup": "Setup",
    "cleaning": "Cleaning",
    "net_penetration_rate": "Net Penetration Rate",
    // rotaryPower
    "w": "W",
    "hp": "Horsepower", // ?? TODO
    "rp": "Rotation Power", // ??
    // dth_info duplicated in rotaryFormulas
    // HP_CMS_STD
    "max_fuel_consumption": "Max Fuel Consumption",
    "fuel_consumption_on_load_per_hour": "Fuel Consumption on load per hour",
    "total_HP_compressor": "Total HP Compressor",
    "fuel_consumption_off_load_per_hour": "Fuel Consumption off load per hour",
    "avg_fuel_consumption_per_hour": "Average Fuel Consumption per hour",
    "avg_load_factor": "Average Load Factor",
    "annual_fuel_consumption": "Annual Fuel Consumption",
    "daily_fuel_consumption": "Daily Fuel Consumption",
    "endurance_hours": "Endurance Hours",
    "annual_fuel_cost": "Annual Fuel Cost",
    "engine_life_estimated": "Engine Life Estimated",
    "cost_to_run_engine_annually": "Annual Engine Cost",
    "cost_to_run_compressor_annually": "Annual Compressor Cost",
    "carbon_output": "Carbon Output",
    "carbon_tax_per_tonne": "Carbon Tax",
    "cost_per_hour_fuel_engine_compressor": "Engine Compressor Cost per hour",
    "cost_before_and_after_total_savings": "Total Savings",
    "total_saving_with_component_life_increase": "Total Savings with Component Life Increase"
    // HP_CMS_CMS duplicated in HP_CMS_STD
}

const categoryNames = {
    "drillingCalc_outputs": "Drilling",
    "all_rotary_info": "Rotary Info",
    // "rotaryFormulas": "Rotary Time and Penetration",
    // "rotaryPower": "Rotary Power",
    "dth_info": "DTH Time and Penetration",
    "HP_CMS_STD": "HP_STD",
    "HP_CMS_CMS": "HP_CMS"
}

const CalculatorOutput = (props) => {

    const toEdit = () =>{
        localStorage.setItem("isEditing", true);
        localStorage.setItem("editingItem", JSON.stringify(JSON.parse(localStorage.getItem("historyStorage"))[0]))
        //Redirect to input page
    }

    //const toDelete = () => {
        //return ;
    //}


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
                        <select>
                            <option>Drill #1</option>
                            <option>Drill #2</option>
                            <option>Drill #3</option>
                        </select>
                        
                        <RigModal />
                    
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


const PricingInformation = ({ outputs }) => {
    // Extract pricing info from the props.
    let pricing = {
        "STD": outputs.HP_CMS_STD,
        "CMS": outputs.HP_CMS_CMS
    };

    return (
        <Grid columns={2}>
            {
                Object.keys(pricing).map(e => (
                    <Grid.Column key={e}>
                        <h2>{e}</h2>
                        <u>Total Savings:</u> ${pricing[e].cost_before_and_after_total_savings}
                        <br />
                        With life increase: ${pricing[e].total_saving_with_component_life_increase}
                    </Grid.Column>
                ))
            }
        </Grid>
    );
};

const RigInformation = ({ outputs }) => {

    const panes = Object.keys(outputs).map(e => {
        return {
            menuItem: categoryNames[e],
            render: () => (
                <Tab.Pane style={{backgroundColor:"#272727", border:"5px solid #009aff"}}
                >
                    <Grid columns={2}>
                        {
                            Object.keys(outputs[e]).map(f =>
                                <Grid.Column><p>{outputNames[f]}: {outputs[e][f]}</p></Grid.Column>
                            )
                        }
                    </Grid>
                </Tab.Pane>
            )
        }
    }
    );

    return (
        <Tab panes={panes} menu={{ fluid: true, tabular: true, vertical: true, inverted: true, color: "blue" }}/>
    );
};

export default CalculatorOutput;