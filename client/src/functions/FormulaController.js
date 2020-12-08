import { drillingCalc } from './formulas/DrillingCalc.js';
import { rotaryFormulas, rotaryPower, calculator_rotary } from './formulas/RotaryFormulas.js';
import { HP_CMS_outputs, HP_CMS_STD, HP_CMS_CMS } from './formulas/HP_CMS.js';

/*
* Inputs to add:
* Hammer type: M30, M40, etc
* rpm
*/


/**
 * Runs all drill calculations. 
 * 
 * Returns an object containing results from each calculation category.
 * 
 * @param {Object} input - JSON containing all inputs from the Calculator.js input form, as seen below:
 * custName
 * projName
 * date
 * // Site conditions
 * ucs
 * fracturization
 * elevation
 * temp
 * // Rig spec
 * pipeSize
 * holeDepth
 * // DTH
 * dthComp
 * dthWap
 * dthHammer
 * dthBit
 * // Rotary
 * rotPulldown
 * rotComp
 * rotBit
 * rotRpm
 */
export default function run_calculations(input) {
    let rig_model = get_rig_model();

    let drillingCalc_inputs = (({ holeDepth, pulldown }) => ({ holeDepth, pulldown }))(input);
    let drillingCalc_outputs = get_drillingCalc_info(drillingCalc_inputs, rig_model);

    // Rotary formula calculations
    let rotary_info = get_rotary_info(input.elevation, rig_model);
    let rotaryFormulas = get_rotaryFormulas_info(input, rig_model, drillingCalc_outputs);
    let rotaryPower = get_rotaryPower_info(input);

    return {
        drillingCalc_outputs,
        rotary_info,
        rotaryFormulas,
        rotaryPower
    };
}


/**
 * Retrieves rig models from the drill database.
 */
function get_rig_model() {
    // TODO
    return { error: 'NOT IMPLEMENTED' };
}


/**
 * Calculates data from the DrillingCalc formula set.
 * 
 * @param {Object} input - Input from the frontend web form.
 * @param {Object} rig_model - Mongoose database results, in the form of DrillRigSchema.
 */
function get_drillingCalc_info(input, rig_model) {
    let holeDepth = input.holeDepth;
    let pulldown = input.pulldown;

    let single_pass = rig_model.RHT_SinglePass;
    let pipeLength = rig_model.RHT_PipeLength;
    let loader_cap = rig_model.RHT_LoaderCap;



    let number_of_pipes = drillingCalc.number_of_pipes(holeDepth, single_pass, pipeLength);
    let number_of_pipes_too_deep = drillingCalc.number_of_pipes_too_deep(holeDepth, single_pass, pipeLength, loader_cap, number_of_pipes);

    let pipeWeight = drillingCalc.get_pipe_weight(pipeLength);
    let drill_string_wt = drillingCalc.get_drill_string_wt(loader_cap, pipeWeight, number_of_pipes_too_deep);
    let available_WOB = drillingCalc.available_WOB(rig_model.RHT_RHWeight, rig_model.RPD_MaxPulldown, drill_string_wt);

    let pulldown_Force = drillingCalc.get_pulldown_force(rig_model.RPD_MaxPulldown, rig_model.RPD_MaxFeedPressure, pulldown)
    let adjusted_WOB = drillingCalc.adjusted_WOB(rig_model.RHT_RHWeight, pulldown_Force, drill_string_wt);

    let hammer; // TODO figure out where to get this

    let adjusted_feed_pressure = drillingCalc.get_adjusted_feed_pressure(hammer);
    let pulldown_force_DTH = drillingCalc.get_pulldown_force_DTH(adjusted_feed_pressure, pulldown);
    let adjusted_WOB_for_DTH = drillingCalc.adjusted_WOB_for_DTH(rig_model.RHT_RHWeight, drill_string_wt, pulldown_force_DTH);

    return {
        number_of_pipes,
        available_WOB,
        adjusted_WOB,
        adjusted_WOB_for_DTH
    };
}

/**
 * Calculates data from the Rotary Info formula set.
 * 
 * @param {Object} input is input from the client form.
 * @param {Object} rig_model is the mongoose Schema DrillRigSchema.
 */
function get_rotary_info(altitude, rig_model) {

    let comp_vol = rig_model.HP_Comp;
    // Rotary_BitSize and PipeSize must be converted to inches (from mm).
    let hole_diam = rig_model.Rotary_BitSize / 25.4;
    let rod_diam = rig_model.PipeSize / 25.4;

    let alt_vol_per_mass = calculator_rotary.altitude_volume_per_mass(comp_vol, altitude);

    let comp_act_vol_for_alt = calculator_rotary.compressor_actual_volume_for_altitude(comp_vol, alt_vol_per_mass);

    let max_uhv = calculator_rotary.maximum_UHV(comp_act_vol_for_alt, hole_diam, rod_diam);

    return max_uhv;
}


/**
 * Calculates the rotaryFormulas
 * @param {Object} input - Form inputs
 * @param {Object} rig_model 
 * @param {Object} drillingCalc - DrillingCalc output data
 */
function get_rotaryFormulas_info(input, rig_model, drillingCalc) {
    let rock_UCS = input.rock_UCS;
    let rpm = input.rpm;
    let holeDepth = input.holeDepth;
    let fracturization = input.fracturization;   //May want to make a function to calculate it, right now it would be: none. light, moderate, or heavy

    let adjusted_WOB = drillingCalc.adjusted_WOB;
    let pipeLength = rig_model.RHT_PipeLength;
    let feed_rate = rig_model.RHT_FeedRate;
    let hoist_rate = rig_model.RHT_HoistRate;
    let setup = rig_model.RHT_SetUp;
    let single_pass = rig_model.RHT_SinglePass;

    let number_of_pipes = drillingCalc.number_of_pipes;

    let UCS = rotaryFormulas.UCS(rock_UCS);
    let penetration_rate = rotaryFormulas.penetration_rate(adjusted_WOB, rpm, UCS, rig_model.Rotary_BitSize);

    let pure_penetration_rate = rotaryFormulas.pure_penetration_rate(penetration_rate);

    let _80_percent_driller_efficiency_penetration_rate = rotaryFormulas._80_percent_driller_efficiency_penetration_rate(pure_penetration_rate, fracturization);

    let drill_time = rotaryFormulas.drill_time(holeDepth, _80_percent_driller_efficiency_penetration_rate);

    let add_pipe = rotaryFormulas.add_pipe(number_of_pipes, rig_model.RHT_AddPipe);

    let retract = rotaryFormulas.retract(number_of_pipes, pipeLength, feed_rate, hoist_rate);

    let remove = add_pipe;

    let collaring = rotaryFormulas.collaring(fracturization, add_pipe, retract, remove, setup);

    let cleaning = rotaryFormulas.cleaning(fracturization, drill_time);

    //Unsure if we should use the formula made or just add the values
    let total_time = drill_time + collaring + add_pipe + retract + remove + setup + cleaning;

    let total_percent_time_drilling = drill_time / total_time;

    let net_penetration_rate = rotaryFormulas.net_penetration_rate(_80_percent_driller_efficiency_penetration_rate, total_percent_time_drilling);

    return {
        drill_time,
        collaring,
        add_pipe,
        retract,
        setup,
        cleaning
    };
}

/**
 * Calculates the Rotary Power data.
 * @param {Object} inputs - Form inputs
 */
function get_rotaryPower_info(inputs) {

    let { rotary_bit, adjusted_WOB, rpm, bit } = inputs;

    let w = rotaryPower.w(rotary_bit, adjusted_WOB);

    let hp = rotaryPower.hp(rpm, bit, w, adjusted_WOB);

    let rotation_power = rotaryPower.rotation_power(hp);

    return { w, hp, rp: rotation_power };
}