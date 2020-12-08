import { drillingCalc } from './formulas/DrillingCalc.js';
import {rotaryFormulas, rotaryPower, calculator_rotary} from './formulas/RotaryFormulas.js';
import {HP_CMS_outputs, HP_CMS_STD, HP_CMS_CMS} from './formulas/HP_CMS.js';
import {DTH} from './formulas/DTHFormulas.js';
//Inputs to add:
 /*
 * Drilling time percent
 * rpm
 * rock_DRI
 */
// const subset_of_obj_properties = (({ a, c }) => ({ a, c }))(object);


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

    let drillingCalc_inputs = (({ holeDepth, rotPulldown }) => ({ holeDepth, rotPulldown }))(input);
    let drillingCalc_outputs = get_drillingCalc_info(drillingCalc_inputs, rig_model);

    // Rotary formula calculations
    let rotary_info = get_rotary_info(input.elevation, rig_model);
    let rotaryFormulas = get_rotaryFormulas_info(input, rig_model, drillingCalc_outputs);
    let rotaryPower = get_rotaryPower_info(input, drillingCalc_outputs.adjusted_WOB);

    let drillingCalc_inputs = (({holeDepth, pulldown}) => ({holeDepth, pulldown}))(input);
    let drillingCalc_outputs = get_drillingCalc_info(drillingCalc_inputs, get_rig_model()); 

    let rotaryFormulas_inputs = (({rock_UCS, rpm, holeDepth, fracturization}) => ({rock_UCS, rpm, holeDepth, fracturization}))(input_json);
    let rotaryFormulas = get_rotaryFormulas_info(input, get_rig_model(), drillingCalc_outputs);

    let rotaryPower_inputs = (({rotary_bit, adjusted_WOB, rpm, bit}) => ({rotary_bit, adjusted_WOB, rpm, bit}))(input_json);
    let rotaryPower = get_rotaryPower_info(input);


    return {
        drillingCalc_outputs,
        rotary_info,
        rotaryFormulas,
        rotaryPower
    };

    


    return {error: 'NOT IMPLEMENTED'};

    
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
function get_drillingCalc_info({ holeDepth, rotPulldown }, rig_model) {

    let single_pass = rig_model.RHT_SinglePass;
    let pipeLength = rig_model.RHT_PipeLength;
    let loader_cap = rig_model.RHT_LoaderCap;



    let number_of_pipes = drillingCalc.number_of_pipes(holeDepth, single_pass, pipeLength);
    let number_of_pipes_too_deep = drillingCalc.number_of_pipes_too_deep(holeDepth, single_pass, pipeLength, loader_cap, number_of_pipes);

    let pipeWeight = drillingCalc.get_pipe_weight(pipeLength);
    let drill_string_wt = drillingCalc.get_drill_string_wt(loader_cap, pipeWeight, number_of_pipes_too_deep);
    let available_WOB = drillingCalc.available_WOB(rig_model.RHT_RHWeight, rig_model.RPD_MaxPulldown, drill_string_wt);

    let pulldown_Force = drillingCalc.get_pulldown_force(rig_model.RPD_MaxPulldown, rig_model.RPD_MaxFeedPressure, rotPulldown)
    let adjusted_WOB = drillingCalc.adjusted_WOB(rig_model.RHT_RHWeight, pulldown_Force, drill_string_wt);

    let hammer; // TODO figure out where to get this

    let adjusted_feed_pressure = drillingCalc.get_adjusted_feed_pressure(hammer);
    let pulldown_force_DTH = drillingCalc.get_pulldown_force_DTH(adjusted_feed_pressure, rotPulldown);
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
    let fracturization_Word = input.fracturization;   
    let fracturization = DTH.fracturization(fracturization_Word);
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
function get_rotaryPower_info(inputs, adjusted_WOB) {
    let { rotRpm, rotBit: bit } = inputs;

    let w = rotaryPower.w(bit, adjusted_WOB);

    let hp = rotaryPower.hp(rotRpm, bit, w, adjusted_WOB);

    let rotation_power = rotaryPower.rotation_power(hp);

    return {w, hp, rp: rotation_power};
}

function get_HP_CMS_outputs(inputs, rig_model){
    let drill_time_percent = inputs.drill_time_percent;
    let altitude = inputs.elevation;
    let compressor_vol = inputs.dthComp;
    let hole_diam = rig_model.Rotary_BitSize / 25.4;
    let rod_diam = rig_model.PipeSize / 25.4;

    let non_drill_time_percent = HP_CMS_outputs.non_drilling_time_percent(drill_time_percent);

    let altitude_ambient_pressure = HP_CMS_outputs.altitude_ambient_pressure(altitude);

    let altitude_volume_mass = HP_CMS_outputs.altitude_volume_mass(compressor_vol, altitude_ambient_pressure);

    let compressor_actual_volume_for_altitude = HP_CMS_outputs.compressor_actual_volume_for_altitude(compressor_vol, altitude_volume_mass);

    let calculated_UHV_with_altitude_derated_volume = HP_CMS_outputs.calculated_UHV_with_altitude_derated_volume(compressor_actual_volume_for_altitude, hole_diam, rod_diam );

    let calculated_volume_altitude_derated_percent = HP_CMS_outputs.calculated_volume_altitude_derated_percent(compressor_actual_volume_for_altitude, compressor_vol);

    return{ non_drill_time_percent,
        altitude_ambient_pressure,
        altitude_volume_mass,
        compressor_actual_volume_for_altitude,
        calculated_UHV_with_altitude_derated_volume,
        calculated_volume_altitude_derated_percent
    };
}

function get_HP_CMS_STD_outputs(inputs, rig_model){

    let compressor_vol = inputs.dthComp;
    let altitude_ambient_pressure = inputs.altitude_ambient_pressure //Could use get_HP_CMS_outputs as another parameter to get this
    let running_pressure = inputs.Wap;



    //For all Engine values, will use first engine as temp values
    let fuel_burn = rig_model.Engine[0].Fuel_BurnRate;
    let engine_hp = rig_model.Engine[0].Nominal_HP;
    let est_parasitic_hp = 225; //Some rig model has different values but some do not have this maybe just take average value?

    let max_fuel_consumption = HP_CMS_STD.max_fuel_consumption(fuel_burn, engine_hp);

    let total_HP_compressor = HP_CMS_STD.total_hp_compressor(altitude_ambient_pressure, compressor_vol, running_pressure, 1.8);
    let load_factor = HP_CMS_STD.load_factor();

    let fuel_consumption_on_load_per_hour = HP_CMS_STD.fuel_consumption_on_load_per_hour(load_factor,fuel_burn,est_parasitic_hp,total_HP_compressor);



}


function get_DTH_info(inputs, rig_model, drillingCalc_outputs){
    
    let rock_UCS = input.rock_UCS;
    let holeDepth = input.holeDepth;
    let fracturization_Word = input.fracturization;   
    let fracturization = DTH.fracturization(fracturization_Word);
    let WAP = inputs.dthWap;


    let pipeLength = rig_model.RHT_PipeLength;
    let feed_rate = rig_model.RHT_FeedRate;
    let hoist_rate = rig_model.RHT_HoistRate;
    let setup = rig_model.RHT_SetUp;
    let single_pass = rig_model.RHT_SinglePass;
    let hammer_ROP_factor1 = rig_model.DTH_Hammer[0].ROP_Factor[0];
    let hammer_ROP_factor2 = rig_model.DTH_Hammer[0].ROP_Factor[1];
    let hammer_bit = inputs.dthBit;
    let rock_DRI = inputs.rock_DRI

    let number_of_pipes = drillingCalc.number_of_pipes(holeDepth, single_pass, pipeLength);

    let ground_conditions = DTH.ground_conditions(rock_UCS);


    let adjusted_hammer_ROP = DTH.adjusted_hammer_ROP(hammer_ROP_factor1, hammer_ROP_factor2, hammer_bit);

    let ROP_in_DRI_at_given_pressure = DTH.ROP_in_DRI_at_given_pressure(adjusted_hammer_ROP, WAP);

    let inst_rop = DTH.inst_rop(rock_DRI,ground_conditions,ROP_in_DRI_at_given_pressure);

    let penetration_rate = DTH.penetration_rate(inst_rop);

    let pure_penetration_rate = DTH.pure_penetration_rate(penetration_rate);

    let _80_percent_driller_efficiency_penetration_rate = rotaryFormulas._80_percent_driller_efficiency_penetration_rate(pure_penetration_rate,fracturization);

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

    return{
        drill_time,
        collaring,
        add_pipe,
        retract,
        setup,
        cleaning
    };

}


