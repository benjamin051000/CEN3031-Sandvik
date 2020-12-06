/*
    Functions from DrillingCalc
*/
function number_of_pipes_too_deep(hole_depth, single_pass, pipe_len, loader_cap, number_of_pipes) {
    // number_of_pipes is output of number_of_pipes
    let ans = hole_depth - single_pass - (pipe_len * loader_cap);

    if(ans > 0)
        return "Too deep";
    else
        return number_of_pipes;
}

function number_of_pipes(hole_depth, single_pass, pipe_length) {
    return round(hole_depth - single_pass / pipe_length);
}

function get_drill_string_wt(loader_cap, pipe_weight, number_of_pipes_too_deep) {
    // number_of_pipes_too_deep is output of number_of_pipes_too_deep
    if(number_of_pipes_too_deep == "Too deep")
        return loader_cap * pipe_weight;
    else if (number_of_pipes_too_deep < 1)
        return pipe_weight;
    else
        return pipe_weight * (number_of_pipes_too_deep + 1)
}

function available_WOB(rh_weight, max_pulldown, drill_string_wt) {
    return rh_weight + max_pulldown + drill_string_wt;
}

function adjusted_WOB(rh_weight, pulldown_force, drill_string_wt) {
    // pulldown_force is output of get_pulldown_force
    return rh_weight + pulldown_force + drill_string_wt;
}

function get_pulldown_force(max_pulldown, max_feed_pressure, pulldown) {
    return max_pulldown / max_feed_pressure * pulldown;
}

function adjusted_WOB_for_DTH(rh_weight, drill_string_wt, pulldown_force_DTH) {
    // pulldown_force_DTH is output of get_pulldown_force_DTH
    return rh_weight + drill_string_wt + pulldown_force_DTH;
}

function get_pulldown_force_DTH(adjusted_feed_pressure, pulldown) {
    // Adjusted feed pressure =
    // 750 for hammers M30, M40, M50
    // 1200 for hammers M60, M80.
    return adjusted_feed_pressure * pulldown;
}
