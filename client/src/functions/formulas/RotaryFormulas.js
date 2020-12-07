/*
    Rotary Formulas
*/

const rotaryFormulas = {
    UCS: (rock_UCS) => {
        return rock_UCS / 0.00689457;
    },

    penetration_rate: (adjusted_WOB, rpm, ucs, rotary_bit) => {
        return 2.18 * adjusted_WOB * rpm / ((0.2 * ucs * rotary_bit ** 0.9) * ucs / 10000);
    },

    pure_penetration_rate: (pen_rate_rot) => {
        return pen_rate_rot / 3.28083;
    },

    _80_percent_driller_efficiency_penetration_rate: (pure_pen_rate, fracturization) => {
        return pure_pen_rate * fracturization * 0.8;
    },

    drill_time: (hole_depth, driller_eff_pen_rate_80p) => {
        // driller_eff_pen_rate_80p from _80_percent_driller_efficiency_penn_rate
        return hole_depth * 60 / driller_eff_pen_rate_80p;
    },
    
    add_pipe: (num_pipes, rig_spec_add_pipe) => {
        if (num_pipes <= 0)
            return 0;
        
        return num_pipes * rig_spec_add_pipe;
    },

    retract: (num_pipes, pipe_len, feed_rate, hoist_rate) => {
        if (num_pipes <= 0)
            return pipe_len / hoist_rate;
        
        return num_pipes * pipe_len / feed_rate + num_pipes * pipe_len / hoist_rate;
    },

    remove: (add_pipe) => {
        // TODO redundant, remove this
        return add_pipe;
    },

    collaring: (fracturization, add_pipe, retract, remove, setup) => {
        // setup is a given value from the formulas.
        return (1 - fracturization) * (add_pipe + retract + remove + setup);
    },

    cleaning: (fracturization, drill_time) => {
        return 0.5 * (1 - fracturization) * drill_time;
    },

    total_time: (drill_time, collaring, add_pipe, retract, remove, setup, cleaning) => {
        // TODO does this need parameters, or can it just call the other functions?
        return drill_time + collaring + add_pipe + retract + remove + setup + cleaning;
    },

    total_percent_time_drilling: (drill_time, total_time) => {
        return drill_time / total_time;
    },

    net_penetration_rate: (driller_eff_pen_rate_80p, total_percent_time_drilling) => {
        return driller_eff_pen_rate_80p * total_percent_time_drilling;
    }
};

const rotaryPower = {
    w: (rotary_bit, adjusted_WOB) => {
        return rotary_bit * adjusted_WOB * 1.1 / 5;
    },

    hp: (rpm, bit, w, adjusted_WOB) => {
        // TODO horsepower?
        return 4.95 * rpm * bit / 25.4 * (w / 1000) ** 1.6 / adjusted_WOB;
    },

    rotation_power: (hp) => {
        return hp * 0.7457;
    }
};


/*
    Calculator Rotary Formulas
*/
// TODO ask brian if these are related to the above Rotary formulas or not.
const calculator_rotary = {
    maximum_UHV: (compressor_actual_volume_for_altitude, hole_diam, rod_diam) => {
        return compressor_actual_volume_for_altitude * 183.5 / (hole_diam ** 2 - rod_diam ** 2);
    },

    compressor_actual_volume_for_altitude: (compressor_vol, alt_vol_per_mass) => {
        return compressor_vol ** 2 / alt_vol_per_mass;
    },

    altitude_volume_per_mass: (compressor_vol, altitude) => {
        return 14.7 * compressor_vol / (14.7 * (1 - 0.0000069 * altitude) ** 5.25588);
    },
}