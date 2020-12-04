
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

function HP_CMS_STD_fuel_consumption_on_load_per_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) {
    // load_factor is a form input.
    // fuel_burn is based off engine model.
    // est_parasitic_hp is based off of rig model.
    // total_hp_compressor is the output of HP_CMS_STD_total_hp_compressor
    return load_factor * fuel_burn / (0.85 * 1000) * 0.7457 * (est_parasitic_hp + total_hp_compressor);
}

function HP_CMS_STD_total_hp_compressor(alt_ambient_pressure, compressor_vol, running_pressure, friction_mult=1.8) {
    // alt_ambient_pressure is the output of HP_CMS_altitude_ambient_pressure.
    // compressor_vol is a form input.
    // running_pressure
    // TODO determine if friction_mult is a constant
    return 144 * 2 * alt_ambient_pressure * compressor_vol * 1.41 / (33000 * 1.41 - 1) * (running_pressure / alt_ambient_pressure) ** (0.41 / 2.82 - 1);
}

function HP_CMS_STD_load_factor(ground_conditions) {
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

function HP_CMS_STD_fuel_consumption_off_load_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) {
    // load_factor is a form input.
    // fuel_burn and engine_hp are based off of engine model.
    // est_parasitic_hp is based off of rig model.
    // total_hp_compressor is the output of HP_CMS_STD_total_hp_compressor

    // Note: This formula is functionally identical to the called function, just scaled by 0.7.
    return HP_CMS_STD_fuel_consumption_on_load_per_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) * 0.7;
}

function HP_CMS_STD_avg_fuel_consumption_per_hour(fuel_consumption_on_load_hr, drilling_time_perc, fuel_consumption_off_load_hour, non_drilling_time_perc) {
    // fuel_consumption_on_load_hr is the output of HP_CMS_STD_fuel_consumption_on_load_per_hour.
    // drilling_time_perc is a form input.
    // fuel_consumption_off_load_hour is the output of HP_CMS_STD_fuel_consumption_off_load_hour.
    // non_drilling_time_perc is the output of HP_CMS_non_drilling_time_percent.
    return fuel_consumption_on_load_hr * drilling_time_perc + fuel_consumption_off_load_hour * non_drilling_time_perc;
}

function HP_CMS_STD_avg_load_factor(avg_fuel_consumption_per_hour, max_fuel_consumption) {
    // avg_fuel_consumption_per_hour is the output of HP_CMS_STD_avg_fuel_consumption_per_hour.
    // max_fuel_consumption is the output of HP_CMS_STD_max_fuel_consumption.
    return avg_fuel_consumption_per_hour / max_fuel_consumption;
}

function HP_CMS_STD_annual_fuel_consumption(avg_fuel_consumption_per_hour, est_hours) {
    // avg_fuel_consumption_per_hour is the output of HP_CMS_STD_avg_fuel_consumption_per_hour.
    // est_hours is a form input.
    return avg_fuel_consumption_per_hour * est_hours;
}

function HP_CMS_STD_daily_fuel_consumption(annual_fuel_consumption) {
    // annual_fuel_consumption is the output of HP_CMS_STD_annual_fuel_consumption.
    return annual_fuel_consumption / 365;
}

function HP_CMS_STD_endurance_hours(fuel_tank_size, avg_fuel_consumption_per_hour) {
    // fuel_tank_size is based off the rig model.
    // avg_fuel_consumption_per_hour is the output of HP_CMS_STD_avg_fuel_consumption_per_hour.
    return fuel_tank_size / avg_fuel_consumption_per_hour;
}

function HP_CMS_STD_annual_fuel_cost(annual_fuel_consumption, fuel_cost) {
    // annual_fuel_consumption is the output of HP_CMS_STD_annual_fuel_consumption.
    // fuel_cost is a form input.
    return annual_fuel_consumption * fuel_cost / 100;
}

function HP_CMS_STD_engine_life_estimated(fuel_v_life, avg_fuel_consumption_per_hour) {
    // fuel_v_life is based off of engine model.
    // avg_fuel_consumption_per_hour is the output of HP_CMS_STD_avg_fuel_consumption_per_hour.
    return fuel_v_life * 0.264 / avg_fuel_consumption_per_hour;
}

function HP_CMS_STD_cost_to_run_engine_annually(engine_rebuild_cost, engine_life_est, est_hours) {
    // engine_rebuild_cost
    // engine_life_est is the output of HP_CMS_STD_engine_life_estimated.
    // est_hours is a form input.
    return engine_rebuild_cost / engine_life_est * est_hours;
}

function HP_CMS_STD_cost_to_run_compressor_annually(compressor_rebuild_cost, engine_life_est, est_hours) {
    // compressor_rebuild_cost
    // engine_life_est is the output of HP_CMS_STD_engine_life_estimated.
    // est_hours is a form input.
    return compressor_rebuild_cost / engine_life_est * est_hours;
}

function HP_CMS_STD_carbon_output(avg_fuel_consumption_per_hour, est_hours) {
    // (2.683 t/1000l fuel)(2.957ton/264 Gall) was in the name of this spreadsheet cell.
    // avg_fuel_consumption_per_hour is the output of HP_CMS_STD_avg_fuel_consumption_per_hour.
    // est_hours is a form input.
    return avg_fuel_consumption_per_hour * est_hours * 2.957 / 264;
}

function HP_CMS_STD_carbon_tax_per_tonne(carbon_output, carbon_tax_dollars_per_tonne) {
    // carbon_output is the output of HP_CMS_STD_carbon_output
    // carbon_tax_dollars_per_tonne is a form input.
    return carbon_output * carbon_tax_dollars_per_tonne;
}

function HP_CMS_STD_cost_per_hour_fuel_engine_compressor(total_saving_with_component_life_inc, est_hours) {
    // total_saving_with_component_life_inc is the output of HP_CMS_STD_total_saving_with_component_life_increase.
    // est_hours is a form input.
    return total_saving_with_component_life_inc / est_hours;
}

function HP_CMS_STD_cost_before_and_after_total_savings(carbon_tax_dollars_per_tonne, annual_fuel_cost) {
    // carbon_tax_dollars_per_tonne is a form input.
    // annual_fuel_cost is the output of HP_CMS_STD_annual_fuel_cost.
    return carbon_tax_dollars_per_tonne + annual_fuel_cost;
}

function HP_CMS_STD_total_saving_with_component_life_increase(total_savings, annual_engine_cost, annual_compressor_cost) {
    // total_savings is the output of HP_CMS_STD_cost_before_and_after_total_savings
    // annual_engine_cost  is the output of HP_CMS_STD_cost_to_run_engine_annually.
    // annual_compressor_cost is the output of HP_CMS_STD_cost_to_run_compressor_annually.
    return cost_before_and_after_total_savings + annual_engine_cost + annual_compressor_cost;
}

function HP_CMS_STD_cost_per_hour_fuel_engine_compressor(total_savings, est_hours) {
    // total_savings is the output of HP_CMS_STD_cost_before_and_after_total_savings. 
    // est_hours is a form input.
    return total_savings / est_hours;
}

