import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import InputTabs  from "../../components/InputTabs"
import * as Yup from 'yup';

import './Calculator.css'
import run_calculations from '../../functions/FormulaController.js';

/*
        Formik component:
        -initialValues is the list of all the form inputs and their default values
        -validationSchema essentially makes sure that inputs are correct and will return messages if not
        uses Yup which is a complement to formik which makes error handling pretty easy and clean
        -onSubmit is our submission function, takes the values from all the forms and turns it into a JSON object
        also manipulates a hook that can be used to disable our submit button when data is being processed

        Form component: Our form, container for label, Field, and ErrorMessage

        label:html label, nothing special

        Field: A Formik form field, takes in the desired input name and type, and creates a field which data may then be entered into

        ErrorMessage: Location of error message to be displayed when the data in the corresponding field is not valid
    */

export default function Calculator() {
    const [inputs, setInputs] = useState({});
    // const [outputs, setOutputs] = useState({});

    const objectEmpty = (obj) => {
        // because Object.keys(new Date()).length === 0;
        // we have to do some additional check
        return Object.keys(obj).length === 0
            && obj.constructor === Object;
    }

    // Either render the input form or redirect to the outputs
    // Depending on whether outputs is an empty object.
    return (
        !objectEmpty(inputs) ?
            <Redirect to={{
                pathname: '/CalculatorOutput',
                state: { inputs: inputs, outputs: run_calculations(inputs) }
            }} />

            :

            <CalcInputForm inputs={inputs} setInputs={setInputs} />


    );
}

/* Component to render the input form. */
const CalcInputForm = ({ inputs, setInputs, setOutputs }) => {
    return <div class="ui centered container">
        <div>
            <h1 style={{ fontSize: "30pt", color: "#009aff" }} class="ui centered header">New Calculation Form</h1>
        </div>
        <div>
            <Formik
                initialValues={{
                    userId: localStorage.getItem("userId"),
                    // Client info
                    projName: '',
                    custName: '',
                    companyName: '',
                    date: '',

                    // Site conditions
                    ucs: '',
                    fracturization: '',
                    elevation: '',
                    fuelCost: '',
                    estHours: '',
                    temp: '',
                    carbTaxTonne: '',
                    drillTimePercent: '',
                    fuelTankSize: '',
                    engineRebuildCost: '',
                    compRebuildCost: '',

                    // Rig spec
                    pipeSize: '',
                    holeDepth: '',

                    // DTH
                    dthComp: '',
                    dthWap: '',
                    dthHammer: '',
                    dthBit: '',

                    // Rotary
                    rotPulldown: '',
                    rotComp: '',
                    rotBit: '',
                    rotRpm: ''
                }}

                // TODO update this for new inputs
                // validationSchema={Yup.object({
                //     custName: Yup.string().required('Required'),
                //     company: Yup.string().required('Required'),
                //     email: Yup.string().required('Required'),
                //     temperature: Yup.string().required('Required'),
                //     rock_hardness: Yup.string().required('Required'),
                //     depth: Yup.string().required('Required'),
                //     color: Yup.string().required('Required'),
                //     size: Yup.string().required('Required'),
                //     speed: Yup.string().required('Required'),
                //     power: Yup.string().required('Required'),
                // })}

                onSubmit={(values) => {
                    setInputs(values);
                    
                    if(localStorage.getItem("historyStorage")){
                        let history = JSON.parse(localStorage.getItem("historyStorage"))
                        history.push(values);
                        localStorage.setItem("historyStorage", JSON.stringify(history))
                    }

                    else{
                        let stringValues = '[' + JSON.stringify(values) + ']'
                        let history = JSON.parse(stringValues);
                        localStorage.setItem("historyStorage", JSON.stringify(history));
                    }
                }}

            >
                <Form class="ui form">
                    <div style={{marginTop:"30px"}}>
                       {/** Inputs are imported via the InputTabs component */}
                       <InputTabs />

                        <div style={{ marginTop: "60px" }} class="ui centered grid">
                            <div class="left floated column">
                                <Link to="/dashboard" class="ui blue huge button" >Back</Link>
                            </div>
                            <div style={{ marginRight: "90px" }} class="right floated column">
                                <button class="ui blue huge button" type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
    
}