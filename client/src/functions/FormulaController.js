import { drillingCalc } from './formulas/DrillingCalc.js';
import {rotaryFormulas, rotaryPower, calculator_rotary} from './formulas/RotaryFormulas.js';
import {HP_CMS_outputs, HP_CMS_STD, HP_CMS_CMS} from './formulas/HP_CMS.js';
// Inputs
// input_json example
/* {
    custName: '',
    projName: '',
    date: '',
    // Site conditions
    ucs: '',
    fracturization: '',
    elevation: '',
    temp: '',
    // Rig spec
    pipeSize: '',
    holeDepth: '',
    // DTH
    dthComp: '',
    dthWap: '',
    dthHammer: '',
    dthBit: '',
    // Rotary
    rotPulldown: '',
    rotComp: '',
    rotBit: '',
    rotRpm: ''
} */
//Inputs to add:
 /*
 * Hammer type: M30, M40, etc
 * rpm
 */
// const subset_of_obj_properties = (({ a, c }) => ({ a, c }))(object);

export default function run_calculations(input_json) {
    let rotary_inputs = input_json.elevation; // TODO this is a subset of input_json

    let rotary_output = get_rotary_information(rotary_inputs, get_rig_model());

    let drillingCalc_inputs = (({holeDepth, pulldown}) => ({holeDepth, pulldown}))(input_json);
    let drillingCalc_outputs = get_drillingCalc_information(drillingCalc_inputs, get_rig_model()); 
    return {error: 'NOT IMPLEMENTED'};
}

function get_rig_model() {
    // TODO
    return {};
}
/******************************************************************************************************
                                    Get Information Functions
/**
 * 
 * @param {*} input is input from the client form.
 * @param {*} rig_model is the mongoose Schema DrillRigSchema.
 */
function get_drillingCalc_information(input, rig_model){
    let holeDepth = input.holeDepth;  
    let pulldown = input.pulldown; 

    let single_pass = rig_model.single_pass;
    let pipeLength = rig_model.pipeLength;
    let loader_cap = rig_model.loader_cap;
    


    let number_of_pipes = drillingCalc.number_of_pipes(holeDepth, single_pass, pipeLength);
    let number_of_pipes_too_deep = drillingCalc.number_of_pipes_too_deep(holeDepth, single_pass, pipeLength, loader_cap, number_of_pipes);

    let pipeWeight = drillingCalc.get_pipe_weight(pipeLength);
    let drill_string_wt = drillingCalc.get_drill_string_wt(loader_cap, pipeWeight, number_of_pipes_too_deep);
    let available_WOB = drillingCalc.available_WOB(rig_model.RHT_RHWeight,rig_model.RPD_MaxPulldown, drill_string_wt);

    let pulldown_Force = drillingCalc.get_pulldown_force(rig_model.RPD_MaxPulldown, rig_model.RPD_MaxFeedPressure, pulldown)
    let adjusted_WOB = drillingCalc.adjusted_WOB(rig_model.RHT_RHWeight,pulldown_Force, drill_string_wt);

    let adjusted_feed_pressure = drillingCalc.get_adjusted_feed_pressure(hammer);
    let pulldown_force_DTH = drillingCalc.get_pulldown_force_DTH(adjusted_feed_pressure,pulldown);
    let adjusted_WOB_for_DTH = drillingCalc.adjusted_WOB_for_DTH(rig_model.RHT_RHWeight,drill_string_wt, pulldown_force_DTH);

    return {
        available_WOB,
        adjusted_WOB,
        adjusted_WOB_for_DTH

    };
}

/**
 * 
 * @param {*} input is input from the client form.
 * @param {*} rig_model is the mongoose Schema DrillRigSchema.
 */
function get_rotary_information(input, rig_model) {
    
    let altitude = input.elevation;

    let comp_vol = rig_model.HP_Comp;
    // Rotary_BitSize and PipeSize must be converted to inches (from mm).
    let hole_diam = rig_model.Rotary_BitSize / 25.4;
    let rod_diam = rig_model.PipeSize / 25.4;
    
    let alt_vol_per_mass = calculator_rotary.altitude_volume_per_mass(comp_vol, altitude);

    let comp_act_vol_for_alt = calculator_rotary.compressor_actual_volume_for_altitude(comp_vol, alt_vol_per_mass);
    
    let max_uhv = calculator_rotary.maximum_UHV(comp_act_vol_for_alt, hole_diam, rod_diam);

    return max_uhv;
}
//Need adjusted_WOB from get_drillingCalc_information ask Ben for opinion
//Temp solution parameter add drillingCalc_outputs
function get_rotaryFormulas_information(input, rig_model, drillingCalc) {
    let rock_UCS = input.rock_UCS;
    let rpm = input.rpm;
    let holeDepth = input.holeDepth;
    let fracturization = input.fracturization;   //May want to make a function to calculate it, right now it would be: none. light, moderate, or heavy
    let adjusted_WOB = drillingCalc.adjusted_WOB;
    let number_of_pipes = drillingCalc.number_of_pipes; //Need to make it an output or find a different way of transfering
    let pipeLength = rig_model.RHT_PipeLength;
    let feed_rate = rig_model.RHT_FeedRate;
    let hoist_rate = rig_model.RHT_HoistRate;

    let UCS = rotaryFormulas.UCS(rock_UCS);
    let penetration_rate = rotaryFormulas.penetration_rate(adjusted_WOB, rpm, UCS, rig_model.Rotary_BitSize);

    let pure_penetration_rate = rotaryFormulas.pure_penetration_rate(penetration_rate);
    
    let _80_percent_driller_efficiency_penetration_rate = rotaryFormulas._80_percent_driller_efficiency_penetration_rate(pure_penetration_rate,fracturization);

    let drill_time = rotaryFormulas.drill_time(holeDepth, _80_percent_driller_efficiency_penetration_rate);

    let add_pipe = rotaryFormulas.add_pipe(number_of_pipes, rig_model.RHT_AddPipe);

    let retract = rotaryFormulas.retract(number_of_pipes, pipeLength, feed_rate, hoist_rate );
    



    
}
