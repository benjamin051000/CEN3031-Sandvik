import React from 'react';

const CalculatorOutput = (props) => {
    let calculation_inputs = props.location.state.inputs; // Will be here
    console.log(calculation_inputs);


    /* TODO: This is where we would call the function to get the outputs. For now, dummy outputs will be used. */
    const outputs = calculation_inputs;

    return (
        <div>
            <h1>Outputs:</h1>
            {Object.keys(outputs).map((e) => 
            <p>{e}: {outputs[e]}</p>)}
        </div>
    );

};

export default CalculatorOutput;