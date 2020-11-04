import React from 'react';

const CalculatorOutput = (props) => {
    let calculation_inputs = props.location.state.inputs; // Will be here
    console.log(calculation_inputs);

    return <p><u>Outputs:</u></p>
};

export default CalculatorOutput;