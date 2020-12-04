
/* Master function to get all output information from form input */
// Input below:
// {
//     // Client info
//     custName: '',
//     projName: '',
//     date: '',
//     // Site conditions
//     ucs: '',
//     fracturization: '',
//     elevation: '',
//     temp: '',
//     // Rig spec
//     pipeSize: '',
//     holeDepth: '',
//     // DTH
//     dthComp: '',
//     dthWap: '',
//     dthHammer: '',
//     dthBit: '',
//     // Rotary
//     rotPulldown: '',
//     rotComp: '',
//     rotBit: '',
//     rotRpm: ''
// }
function getOutputs(calculatorInput) {

}

///////////////////////////////////////////////////////////////////////////////////////

function HP_CMS_non_drilling_time_percent(drilling_time_perc) {
    // drilling_time_perc is a form input
    return 1 - drilling_time_perc;
}

function HP_CMS_altitude_ambient_pressure(altitude) {
    // altitude is a form input
    return 14.7 - altitude * 0.0004;
}

function HP_CMS_altitude_volume_mass(compressor_volume, alt_ambient_pressure) {
    // compressor_vol is a form input.
    // alt_ambient_pressure is the output of HP_CMS_altitude_ambient_pressure.
    return 14.7 * compressor_volume / alt_ambient_pressure;
}

function HP_CMS_compressor_actual_volume_for_altitude(compressor_volume, alt_volume_mass) {
    // compressor_vol is a form input.
    // alt_volume_mass is the output of HP_CMS_altitude_volume_mass.
    return compressor_volume ** 2 / alt_volume_mass;
}

function HP_CMS_calculated_UHV_with_altitude_derated_volume(compressor_act_vol, hole_diam, rod_diam) {
    // compressor_act_vol is the output of HP_CMS_compressor_actual_volume_for_altitude.
    // compressor_vol is a form input.
    return compressor_act_vol * 183.5 / (hole_diam ** 2 - rod_diam **2)
}

function HP_CMS_calculated_volume_altitude_derated_percent(compressor_act_vol, compressor_vol) {
    // compressor_act_vol is the output of HP_CMS_compressor_actual_volume_for_altitude.
    // compressor_vol is a form input.
    return compressor_act_vol / compressor_vol;
}

///////////////////////////////////////////////////////////////////////////////////////

/* Notes:
    est_parasitic_hp is not defined for some rig models.
*/

function HP_CMS_STD_max_fuel_consumption(fuel_burn, engine_hp) {
    // fuel_burn and engine_hp are based off of engine model.
    return fuel_burn * engine_hp * 0.7457;
}

function HMP_CMS_STD_fuel_consumption_on_load_per_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) {
    // load_factor is a form input.
    // fuel_burn is based off engine model.
    // est_parasitic_hp is based off of rig model.
    // total_hp_compressor is the output of HMP_CMS_STD_total_hp_compressor
    return load_factor * fuel_burn / (0.85 * 1000) * 0.7457 * (est_parasitic_hp + total_hp_compressor);
}

function HMP_CMS_STD_total_hp_compressor(alt_ambient_pressure, compressor_vol, running_pressure, friction_mult=1.8) {
    // alt_ambient_pressure is the output of HP_CMS_altitude_ambient_pressure.
    // compressor_vol is a form input.
    // running_pressure
    // TODO determine if friction_mult is a constant
    return 144 * 2 * alt_ambient_pressure * compressor_vol * 1.41 / (33000 * 1.41 - 1) * (running_pressure / alt_ambient_pressure) ** (0.41 / 2.82 - 1);
}

function HMP_CMS_STD_load_factor(ground_conditions) {
    // ground_conditions is the output of <TODO>

    // switch(ground_conditions) {
    //     case 1:
    //         return 1.15;
    //     case 2:
    //         return 1.2;
    //     case 3:
    //         return 1.25;
    //     case 4:
    //         return 1.3;
    // }
    if(ground_conditions < 1 || ground_conditions > 4)
        throw "ground_conditions out of bounds!";
    
    return 1.1 + 0.05 * ground_conditions;
}

function HMP_CMS_STD_fuel_consumption_off_load_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) {
    // load_factor is a form input.
    // fuel_burn and engine_hp are based off of engine model.
    // est_parasitic_hp is based off of rig model.
    // total_hp_compressor is the output of HMP_CMS_STD_total_hp_compressor

    // Note: This formula is functionally identical to the called function, just scaled by 0.7.
    return HMP_CMS_STD_fuel_consumption_on_load_per_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) * 0.7;
}

function HMP_CMS_STD_avg_fuel_consumption_per_hour(fuel_consumption_on_load_hr, drilling_time_perc, fuel_consumption_off_load_hour, non_drilling_time_perc) {
    // fuel_consumption_on_load_hr is the output of HMP_CMS_STD_fuel_consumption_on_load_per_hour.
    // drilling_time_perc is a form input.
    // fuel_consumption_off_load_hour is the output of HMP_CMS_STD_fuel_consumption_off_load_hour.
    // non_drilling_time_perc is the output of HP_CMS_non_drilling_time_percent.
    return fuel_consumption_on_load_hr * drilling_time_perc + fuel_consumption_off_load_hour * non_drilling_time_perc;
}

