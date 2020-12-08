/*
    Functions from DrillingCalc
*/
export const drillingCalc = {
    number_of_pipes_too_deep: (hole_depth, single_pass, pipe_len, loader_cap, number_of_pipes) => {
        // number_of_pipes is output of number_of_pipes
        let ans = hole_depth - single_pass - (pipe_len * loader_cap);

        if (ans > 0)
            return "Too deep";
        else
            return number_of_pipes;
    },

    number_of_pipes: (hole_depth, single_pass, pipe_length) => {
        return Math.round(hole_depth - single_pass / pipe_length);
    },

    get_pipe_weight: (pipe_length){
        switch(pipe_length){
        case 89:
        case 102:
            return 512;
        case 114:
            return 800;
        case 127:
            return 1100;
        case 140:
            return 1600;
        case 152:
            return 1381;
        case 165:
            return 1590;
        case 178: 
            return 2400;
        case 179:
            return 2720;
        case 194:
            return 2713;
        case 203:
            return 1675;
        case 219:
            return 3684;
        case 229:
            return 1961;
        case 244:
            return 3000;
        case 254:
            return 3245;
        case 260:
            return 4300;
        case 273:
            return 3550;
        case 324:
            return 4000;

        }
    },

    get_drill_string_wt: (loader_cap, pipe_weight, number_of_pipes_too_deep) => {
        // number_of_pipes_too_deep is output of number_of_pipes_too_deep
        if (number_of_pipes_too_deep == "Too deep")
            return loader_cap * pipe_weight;

        if (number_of_pipes_too_deep < 1)
            return pipe_weight;

        return pipe_weight * (number_of_pipes_too_deep + 1);
    },


    available_WOB: (rh_weight, max_pulldown, drill_string_wt) => {
        return rh_weight + max_pulldown + drill_string_wt;
    },

    adjusted_WOB: (rh_weight, pulldown_force, drill_string_wt) => {
        // pulldown_force is output of get_pulldown_force
        return rh_weight + pulldown_force + drill_string_wt;
    },

    get_pulldown_force: (max_pulldown, max_feed_pressure, pulldown) => {
        return max_pulldown / max_feed_pressure * pulldown;
    },

    adjusted_WOB_for_DTH: (rh_weight, drill_string_wt, pulldown_force_DTH) => {
        // pulldown_force_DTH is output of get_pulldown_force_DTH
        return rh_weight + drill_string_wt + pulldown_force_DTH;
    },

    get_pulldown_force_DTH: (adjusted_feed_pressure, pulldown) => {
        // Adjusted feed pressure =
        // 750 for hammers M30, M40, M50
        // 1200 for hammers M60, M80.
        return adjusted_feed_pressure * pulldown;
    }
};