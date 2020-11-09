import React from 'react';

const CalculatorOutput = (props) => {
    let calculation_inputs = props.location.state.inputs; // Will be here
    console.log(calculation_inputs);


    /* TODO: This is where we would call the function to get the outputs. For now, dummy outputs will be used. */
    const outputs = {};


    return (
        <div style={{color: "white"}}>
            <h1>Project Specifications:</h1>
            {Object.keys(calculation_inputs).map((e) => 
                <p>{e}: {calculation_inputs[e]}</p>
            )}

            <h1>Rig Model</h1>
            <p>This is the recommended rig. You can change the model to assess different pricings.</p>
            {/* TODO: get recommended rig from function */}
            <select>
                <option>Drill #1</option>
                <option>Drill #2</option>
                <option>Drill #3</option>
            </select>
            
            <h1>Pricing Information</h1>
            <p>...</p>
            {/* TODO get outputs & pricing info from function */}
        </div>
    );

};

export default CalculatorOutput;