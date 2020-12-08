/* 
    DTH (Down-the-hole) formulas
*/

/* 
    inst_rop: instantaneous ROP (From rig info)
*/
const DTH = {
    penetration_rate: (inst_rop) => {
        return inst_rop * 3.28084;
    },
    

    inst_rop: (rock_DRI, ground_conditions, ROP_in_DRI_at_given_pressure) => {
        //Ground_conditions based on Rock UCS
        //1-100 -> Ground_conditions = 1
        //101-200 -> Ground_conditions = 2
        //201-300 -> Ground_conditions = 3
        //301-infinity -> Ground_conditions = 4
        if (ground_conditions == 1)
        {
            let factor1 = ROP_in_DRI_at_given_pressure * 30 / rock_DRI * (30/rock_DRI) ** 0.8 *1.15
            let factor2 = ROP_in_DRI_at_given_pressure * 32 / rock_DRI * (32/rock_DRI) ** 0.8 *1.15
            let factor3 = ROP_in_DRI_at_given_pressure * 34 / rock_DRI * (34/rock_DRI) ** 0.8 *1.15
            let factor4 = ROP_in_DRI_at_given_pressure * 36 / rock_DRI * (36/rock_DRI) ** 0.8 *1.15
            let factor5 = ROP_in_DRI_at_given_pressure * 38 / rock_DRI * (38/rock_DRI) ** 0.8 *1.15
            let factor6 = ROP_in_DRI_at_given_pressure * 40 / rock_DRI * (40/rock_DRI) ** 0.8 *1.15
            return (factor1 + factor2 + factor3 + factor4 + factor5 + factor6)/6;
        }
        if (ground_conditions == 2)
        {
            let factor1 = ROP_in_DRI_at_given_pressure * 42 / rock_DRI * (42/rock_DRI) ** 0.8 *1.15
            let factor2 = ROP_in_DRI_at_given_pressure * 44 / rock_DRI * (44/rock_DRI) ** 0.8 *1.15
            let factor3 = ROP_in_DRI_at_given_pressure * 46 / rock_DRI * (46/rock_DRI) ** 0.8 *1.15
            let factor4 = ROP_in_DRI_at_given_pressure * 48 / rock_DRI * (48/rock_DRI) ** 0.8 *1.15
            let factor5 = ROP_in_DRI_at_given_pressure * 50 / rock_DRI * (50/rock_DRI) ** 0.8 *1.15
            let factor6 = ROP_in_DRI_at_given_pressure * 52 / rock_DRI * (52/rock_DRI) ** 0.8 *1.15
            return (factor1 + factor2 + factor3 + factor4 + factor5 + factor6)/6;
        }
        if (ground_conditions == 3)
        {
            let factor1 = ROP_in_DRI_at_given_pressure * 54 / rock_DRI * (54/rock_DRI) ** 0.8 *1.15
            let factor2 = ROP_in_DRI_at_given_pressure * 56 / rock_DRI * (56/rock_DRI) ** 0.8 *1.15
            let factor3 = ROP_in_DRI_at_given_pressure * 58 / rock_DRI * (58/rock_DRI) ** 0.8 *1.15
            let factor4 = ROP_in_DRI_at_given_pressure * 60 / rock_DRI * (60/rock_DRI) ** 0.8 *1.15
            let factor5 = ROP_in_DRI_at_given_pressure * 62 / rock_DRI * (62/rock_DRI) ** 0.8 *1.15
            let factor6 = ROP_in_DRI_at_given_pressure * 64 / rock_DRI * (64/rock_DRI) ** 0.8 *1.15
            let factor7 = ROP_in_DRI_at_given_pressure * 66 / rock_DRI * (66/rock_DRI) ** 0.8 *1.15
            return (factor1 + factor2 + factor3 + factor4 + factor5 + factor6 + factor7)/7;
        }
        if (ground_conditions == 4)
        {
            let factor1 = ROP_in_DRI_at_given_pressure * 68 / rock_DRI * (68/rock_DRI) ** 0.8 *1.15
            let factor2 = ROP_in_DRI_at_given_pressure * 70 / rock_DRI * (70/rock_DRI) ** 0.8 *1.15
            let factor3 = ROP_in_DRI_at_given_pressure * 72 / rock_DRI * (72/rock_DRI) ** 0.8 *1.15
            let factor4 = ROP_in_DRI_at_given_pressure * 74 / rock_DRI * (74/rock_DRI) ** 0.8 *1.15
            let factor5 = ROP_in_DRI_at_given_pressure * 76 / rock_DRI * (76/rock_DRI) ** 0.8 *1.15
            let factor6 = ROP_in_DRI_at_given_pressure * 78 / rock_DRI * (78/rock_DRI) ** 0.8 *1.15
            return (factor1 + factor2 + factor3 + factor4 + factor5 + factor6)/6;
        }

    },
    
    
    // TODO investigate "Rock DRI"

    adjusted_hammer_ROP: (hammer_rop_factor1, hammer_rop_factor2, dth_hammer_available_bit) => {
        return hammer_rop_factor1 * hammer_rop_factor2 / dth_hammer_available_bit;
    },

    ROP_in_DRI_at_given_pressure: (adjusted_hammer_ROP, air_factor) => {
        const factors = {
            180: 0.46,
            350: 1,
            500: 1.465
        };

        return adjusted_hammer_ROP * factors[air_factor];
    },
    //////////////////////////////////////////////////////////////////////
    /* Everything below this line is a duplicate in RotaryFormulas.js. */

    pure_penetration_rate: (pen_rate_DTH_hammer) => {
        return pen_rate_DTH_hammer / 3.28083;
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