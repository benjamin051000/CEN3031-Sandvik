import React from 'react';
import {Grid, Tab, Dropdown} from 'semantic-ui-react';

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

const RigDropdown = ({rigs, setRig}) => {

    // rigs is a list of rigs. Duh.
    const rigOptions = rigs.map((rigInfo, idx) => {
        return {
            key: idx,
            value: rigInfo,
            text: rigInfo.Model
        }
    });

    console.log('[RigDropdown] rigOptions:', rigOptions);

    return (
        <Dropdown 
            onChange={(_, {value}) => {setRig(value)}}
            options={rigOptions}
            // defaultValue={0}
        />
    );
}

export {
    PricingInformation,
    RigInformation,
    RigDropdown
};