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

// const subset_of_obj_properties = (({ a, c }) => ({ a, c }))(object);

export default function run_calculations(input_json) {
    let rotary_inputs = input_json.elevation; // TODO this is a subset of input_json

    let rotary_output = get_rotary_information(rotary_inputs, get_rig_model());
}

function get_rig_model() {
    // TODO
    return {};
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
    let rod_diam = rig_mode.PipeSize / 25.4;
    
    let alt_vol_per_mass = calculator_rotary.altitude_volume_per_mass(comp_vol, altitude);

    let comp_act_vol_for_alt = calculator_rotary.compressor_actual_volume_for_altitude(comp_vol, alt_vol_per_mass);
    
    let max_uhv = calculator_rotary.maximum_UHV(comp_act_vol_for_alt, hole_diam, rod_diam);

    return max_uhv;
}
