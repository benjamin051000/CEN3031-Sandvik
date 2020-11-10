import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';

import './Calculator.css'

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

    const objectEmpty = (obj) => {
        // because Object.keys(new Date()).length === 0;
        // we have to do some additional check
        return Object.keys(obj).length === 0
            && obj.constructor === Object;
    }

    // Either render the input form or redirect to the outputs
    // Depending on whether inputs is an empty object.
    return (
        !objectEmpty(inputs) ?
            <Redirect to={{
                pathname: '/CalculatorOutput',
                state: { inputs: inputs }
            }} />

            :

            <CalcInputForm setInputs={setInputs} />


    );
}

/* Component to render the input form. */
const CalcInputForm = ({ setInputs }) => {
    return <div>
        <div className="calculator-header-position">
            <h1 className="calculator-header">New Calculation Form</h1>
        </div>
        <div style={{ marginLeft: "150px" }}> 
            <Formik
                initialValues={{
                    // Client info
                    custName: '',
                    projName: '',
                    date: '',
                    // Site conditions
                    ucs: '',
                    fracturization: '',
                    elevation: '',
                    temp: '',
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
                //     name: Yup.string().required('Required'),
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
                }}

            >
                <Form>
                    {/* General info */}
                    <div className="calculator-section-header-position">
                        <h1 className="calculator-section-header">Client Information</h1>
                        <div className="input-grid">
                        <p>   
                            <label htmlFor="custName">Customer Name</label>
                            <Field name="custName" type="text" />
                            <ErrorMessage name="custName" />
                            </p>   
                            <p>   
                            <label className="input-spacer" htmlFor="projName">Project Name</label>
                            <Field name="projName" type="text" />
                            <ErrorMessage name="projName" />
                            </p>   
                            <p>   
                            <label className="input-spacer" htmlFor="date">Date</label>
                            <Field name="date" type="text" />
                            <ErrorMessage name="date" />
                            </p>   
                        </div>

                        {/* Site conditions */}
                        <h1 className="calculator-section-header">Site Conditions</h1>
                        <div className="input-grid">
                        <p>   
                            <label htmlFor="ucs">Rock UCS</label>
                            <Field name="ucs" type="text" />
                            <ErrorMessage name="ucs" />
                        </p>   
                        <p>   
                            <label className="input-spacer" htmlFor="fracturization">Fracturization</label>
                            <Field name="fracturization" as="select">
                                {['None', 'Light', 'Moderate', 'Heavy'].map(
                                    e => <option>{e}</option>
                                )}
                            </Field>
                            <ErrorMessage name="fracturization" />
                        </p>   

                        <p>   
                            <label className="input-spacer" htmlFor="elevation">Elevation</label>
                            <Field name="elevation" type="text" />
                            <ErrorMessage name="elevation" />
                        </p>   
                        <p>   
                            <label className="input-spacer" htmlFor="temp">Ambient Temperature</label>
                            <Field name="temp" type="text" />
                            <ErrorMessage name="temp" />
                        </p>   
                        </div>

                        {/* Overall Rig Specs */}
                        <h1 className="calculator-section-header">Rig Specifications</h1>
                        <div className="input-grid">
                        <p>   
                            <label htmlFor="pipeSize">Pipe Size</label>
                            <Field name="pipeSize" type="text" />
                            <ErrorMessage name="pipeSize" />
                        </p>   

                        <p>   
                            <label htmlFor="holeDepth">Hole Depth</label>
                            <Field name="holeDepth" type="text" />
                            <ErrorMessage name="holeDepth" />
                        </p>   
                        </div>

                        {/* Down-the-hole (DTH) */}
                        <h1 className="calculator-section-header">DTH</h1>
                        <div className="input-grid">
                        <p>   
                            <label htmlFor="dthComp">Comp</label>
                            <Field name="dthComp" type="text" />
                            <ErrorMessage name="dthComp" />
                        </p>   

                        <p>   
                            <label htmlFor="dthWap">WAP</label>
                            <Field name="dthWap" type="text" />
                            <ErrorMessage name="dthWap" />
                        </p>   

                        <p>   
                            <label htmlFor="dthHammer">Hammer</label>
                            <Field name="dthHammer" type="text" />
                            <ErrorMessage name="dthHammer" />
                        </p>   

                        <p>   
                            <label htmlFor="dthBit">Bit</label>
                            <Field name="dthBit" type="text" />
                            <ErrorMessage name="dthBit" />
                        </p>   
                        </div>


                        {/* Rotary */}
                        <h1 className="calculator-section-header">Rotary</h1>
                        <div className="input-grid">
                        <p>             
                            <label htmlFor="rotPulldown">Pulldown</label>
                            <Field name="rotPulldown" type="text" />
                            <ErrorMessage name="rotPulldown" />
                        </p>    
                        <p>              
                            <label htmlFor="rotComp">Comp</label>
                            <Field name="rotComp" type="text" />
                            <ErrorMessage name="rotComp" />
                        </p>  
                        <p>    
                            <label htmlFor="rotBit">Bit</label>
                            <Field name="rotBit" type="text" />
                            <ErrorMessage name="rotBit" />
                        </p>   
                        <p>   
                            {/* TODO: Consider a tooltip that says "Revolutions per minute" or additional info */}
                            <label htmlFor="rotRpm">RPM</label>
                            <Field name="rotRpm" type="text" />
                            <ErrorMessage name="rotRpm" />
                        </p>   
                        </div>


                        <div className="input-grid-button">
                            <Link to="/dashboard" className="button-calculator" >Back</Link>
                            <button style={{gridColumn:"3"}} className="button-calculator" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
}