const HP_CMS_outputs = {
    non_drilling_time_percent: (drilling_time_perc) => {
        // drilling_time_perc is a form input
        return 1 - drilling_time_perc;
    },

    altitude_ambient_pressure: (altitude) => {
        // altitude is a form input
        return 14.7 - altitude * 0.0004;
    },

    altitude_volume_mass: (compressor_volume, alt_ambient_pressure) => {
        // compressor_vol is a form input.
        // alt_ambient_pressure is the output of HP_CMS_altitude_ambient_pressure.
        return 14.7 * compressor_volume / alt_ambient_pressure;
    },

    compressor_actual_volume_for_altitude: (compressor_volume, alt_volume_mass) => {
        // compressor_vol is a form input.
        // alt_volume_mass is the output of HP_CMS_altitude_volume_mass.
        return compressor_volume ** 2 / alt_volume_mass;
    },

    calculated_UHV_with_altitude_derated_volume: (compressor_act_vol, hole_diam, rod_diam) => {
        // compressor_act_vol is the output of HP_CMS_compressor_actual_volume_for_altitude.
        // compressor_vol is a form input.
        return compressor_act_vol * 183.5 / (hole_diam ** 2 - rod_diam ** 2)
    },

    calculated_volume_altitude_derated_percent: (compressor_act_vol, compressor_vol) => {
        // compressor_act_vol is the output of HP_CMS_compressor_actual_volume_for_altitude.
        // compressor_vol is a form input.
        return compressor_act_vol / compressor_vol;
    }
};

///////////////////////////////////////////////////////////////////////////////////////

/*  HP CMS STD

Glossary of parameters:

    *** Form inputs ***
    - load_factor
    - compressor_vol
    - drilling_time_perc
    - est_hours
    - fuel_cost
    - carbon_tax_dollars_per_tonne


    *** Based off engine model or rig model ***
    - fuel_burn
    - engine_hp
    - est_parasitic_hp (not defined for some rig models)
    - fuel_tank_size
    - fuel_v_life


    *** Intermediary values ***
    - total_hp_compressor is the output of HP_CMS_STD.total_hp_compressor.
    - alt_ambient_pressure is the output of HP_CMS_outputs.altitude_ambient_pressure.
    - fuel_consumption_on_load_hr is the output of HP_CMS_STD.fuel_consumption_on_load_per_hour.
    - fuel_consumption_off_load_hour is the output of HP_CMS_STD_fuel_consumption_off_load_hour.
    - non_drilling_time_perc is the output of HP_CMS_outputs.non_drilling_time_percent.
    - avg_fuel_consumption_per_hour is the output of HP_CMS_STD.avg_fuel_consumption_per_hour.
    - max_fuel_consumption is the output of HP_CMS_STD.max_fuel_consumption.
    - annual_fuel_consumption is the output of HP_CMS_STD.annual_fuel_consumption.
    - engine_life_est is the output of HP_CMS_STD.engine_life_estimated.
    - carbon_output is the output of HP_CMS_STD.carbon_output.
    - total_saving_with_component_life_inc is the output of HP_CMS_STD.total_saving_with_component_life_increase.
    - annual_fuel_cost is the output of HP_CMS_STD.annual_fuel_cost.
    - total_savings is the output of HP_CMS_STD.cost_before_and_after_total_savings.
    - annual_engine_cost  is the output of HP_CMS_STD.cost_to_run_engine_annually.
    - annual_compressor_cost is the output of HP_CMS_STD.cost_to_run_compressor_annually.


    *** UNKNOWN (TODO) ***
    - running_pressure
    - friction_mult
    - engine_rebuild_cost
    - compressor_rebuild_cost

*/
const HP_CMS_STD = {
    max_fuel_consumption: (fuel_burn, engine_hp) => {
        return fuel_burn * engine_hp * 0.7457;
    },

    fuel_consumption_on_load_per_hour: (load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) => {
        return load_factor * fuel_burn / (0.85 * 1000) * 0.7457 * (est_parasitic_hp + total_hp_compressor);
    },

    total_hp_compressor: (alt_ambient_pressure, compressor_vol, running_pressure, friction_mult = 1.8) => {
        // TODO this isn't using friction_mult ?
        return 144 * 2 * alt_ambient_pressure * compressor_vol * 1.41 / (33000 * 1.41 - 1) * (running_pressure / alt_ambient_pressure) ** (0.41 / 2.82 - 1);
    },

    load_factor: (ground_conditions) => {
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
        if (ground_conditions < 1 || ground_conditions > 4)
            throw "ground_conditions out of bounds!";

        return 1.1 + 0.05 * ground_conditions;
    },

    fuel_consumption_off_load_hour: (load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) => {
        // Note: This formula is functionally identical to the called function, just scaled by 0.7.
        return HP_CMS_STD.fuel_consumption_on_load_per_hour(load_factor, fuel_burn, est_parasitic_hp, total_hp_compressor) * 0.7;
    },

    avg_fuel_consumption_per_hour: (fuel_consumption_on_load_hr, drilling_time_perc, fuel_consumption_off_load_hour, non_drilling_time_perc) => {
        return fuel_consumption_on_load_hr * drilling_time_perc + fuel_consumption_off_load_hour * non_drilling_time_perc;
    },

    avg_load_factor: (avg_fuel_consumption_per_hour, max_fuel_consumption) => {
        return avg_fuel_consumption_per_hour / max_fuel_consumption;
    },

    annual_fuel_consumption: (avg_fuel_consumption_per_hour, est_hours) => {
        return avg_fuel_consumption_per_hour * est_hours;
    },

    daily_fuel_consumption: (annual_fuel_consumption) => {
        return annual_fuel_consumption / 365;
    },

    endurance_hours: (fuel_tank_size, avg_fuel_consumption_per_hour) => {
        return fuel_tank_size / avg_fuel_consumption_per_hour;
    },

    annual_fuel_cost: (annual_fuel_consumption, fuel_cost) => {
        return annual_fuel_consumption * fuel_cost / 100;
    },

    engine_life_estimated: (fuel_v_life, avg_fuel_consumption_per_hour) => {
        return fuel_v_life * 0.264 / avg_fuel_consumption_per_hour;
    },

    cost_to_run_engine_annually: (engine_rebuild_cost, engine_life_est, est_hours) => {
        return engine_rebuild_cost / engine_life_est * est_hours;
    },

    cost_to_run_compressor_annually: (compressor_rebuild_cost, engine_life_est, est_hours) => {
        return compressor_rebuild_cost / engine_life_est * est_hours;
    },

    carbon_output: (avg_fuel_consumption_per_hour, est_hours) => {
        // (2.683 t/1000l fuel)(2.957ton/264 Gall) was in the name of this spreadsheet cell.
        return avg_fuel_consumption_per_hour * est_hours * 2.957 / 264;
    },

    carbon_tax_per_tonne: (carbon_output, carbon_tax_dollars_per_tonne) => {
        return carbon_output * carbon_tax_dollars_per_tonne;
    },

    cost_per_hour_fuel_engine_compressor: (total_saving_with_component_life_inc, est_hours) => {
        return total_saving_with_component_life_inc / est_hours;
    },

    cost_before_and_after_total_savings: (carbon_tax_dollars_per_tonne, annual_fuel_cost) => {
        return carbon_tax_dollars_per_tonne + annual_fuel_cost;
    },

    total_saving_with_component_life_increase: (cost_before_and_after_total_savings, annual_engine_cost, annual_compressor_cost) => {
        return cost_before_and_after_total_savings + annual_engine_cost + annual_compressor_cost;
    },

    cost_per_hour_fuel_engine_compressor: (total_savings, est_hours) => {
        return total_savings / est_hours;
    }
};



/*  HP CMS CMS
    
Glossary of parameters:
    *** Form inputs ***
    - compressor_vol
    - volume_air_off_leakage
    - pressure_CMS_air_off
    - friction_mult
    
    
    *** Based off engine model or rig model ***
    None


    *** Intermediary values *** 
    - alt_ambient_pressure is the output of HP_CMS_outputs.altitude_ambient_pressure.
    - calc_vol_alt_derated_percent is the outptut of HP_CMS_outputs.calculated_volume_altitude_derated_percent.


    *** UNKNOWN (TODO) ***
    - running_pressure

*/
const HP_CMS_CMS = {
    total_hp_compressor: (alt_ambient_pressure, calc_vol_alt_derated_percent, compressor_vol, running_pressure, friction_mult = 1.8) => {

        // TODO determine if friction_mult is a constant
        return 144 * 2 * alt_ambient_pressure * calc_vol_alt_derated_percent * compressor_vol * 1.41 / (33000 * 1.41 - 1) * (running_pressure / alt_ambient_pressure) ** (0.41 / 2.82 - 1);

        // TODO see if we can just take the output of HP_CMS_STD_total_hp_compressor and multiply by calc_vol_alt_derated_percent
    },

    fuel_consumption_off_load_per_hour: (volume_air_off_leakage, pressure_CMS_air_off, friction_mult) => {
        return 144 * 2 * volume_air_off_leakage * 1.41 / (33000 * 1.41 - 1) * pressure_CMS_air_off ** (0.41 / 2.82 - 1) * friction_mult;
    }
};

export {
    HP_CMS_outputs,
    HP_CMS_STD,
    HP_CMS_CMS
};