import React from 'react';
import {Link} from 'react-router-dom';
import {Formik, Field, Form, ErrorMessage} from 'formik';
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

function Calculator() {
    return (
        <div>
            <div className="calculator-header-position">
                <h1 className="calculator-header">New Calculation Form</h1>
            </div>
            <div className="calculator-section-header-position">
                <Formik
                    initialValues={{
                        name:'',
                        company:'',
                        email:'',
                        phone:'',
                        temperature:'',
                        rock_hardness:'',
                        depth:'',
                        color:'',
                        size:'',
                        speed:'',
                        power:''
                    }}

                    validationSchema={Yup.object({
                        name: Yup.string().required('Required'),
                        company: Yup.string().required('Required'),
                        email: Yup.string().required('Required'),
                        temperature: Yup.string().required('Required'),
                        rock_hardness: Yup.string().required('Required'),
                        depth: Yup.string().required('Required'),
                        color: Yup.string().required('Required'),
                        size: Yup.string().required('Required'),
                        speed: Yup.string().required('Required'),
                        power: Yup.string().required('Required'),
                    })}

                    onSubmit={(values)=>{
                        console.log(values);
                    }}

                >
                    <Form>
                        <h1 className="calculator-section-header">Client Information</h1>
                            <div className="input-grid">
                                <p>
                                    <label htmlFor="name">Name</label>
                                    <Field className="input-style" name="name" type="text" />
                                    <ErrorMessage component="required-message" name="name" />
                                </p>
                                
                                <p>
                                    <label htmlFor="company">Company</label>
                                    <Field className="input-style" name="company" type="text" />  
                                    <ErrorMessage component="required-message" name="company" />
                                </p>

                                <p>
                                    <label htmlFor="email">Email Address</label>
                                    <Field className="input-style" name="email" type="email" />
                                    <ErrorMessage component="required-message" name="email" />
                                </p>

                                <p>
                                    <label htmlFor="phone">Phone Number</label>
                                    <Field className="input-style" name="phone" type="text" />
                                </p>

                            </div>

                        <h1 className="calculator-section-header">Site Information</h1>
                            <div className="input-grid">

                                <p>
                                    <label htmlFor="temperature">Temperature</label>
                                    <Field className="input-style" name="temperature" type="text" />
                                    <ErrorMessage component="required-message" name="temperature" />
                                </p>   

                                <p>
                                    <label htmlFor="rock_hardness">Rock Hardness</label>
                                    <Field className="input-style" name="rock_hardness" type="text" />  
                                    <ErrorMessage component="required-message" name="rock_hardness" />
                                </p>

                                <p>
                                    <label htmlFor="depth">Depth</label>
                                    <Field className="input-style" name="depth" type="text" />
                                    <ErrorMessage component="required-message" name="depth" />
                                </p>

                                <p>
                                    <label htmlFor="color">Color</label>
                                    <Field className="input-style" name="color" type="text" />
                                    <ErrorMessage component="required-message" name="color" />
                                </p>

                            </div>


                        <h1 className="calculator-section-header">Current Rig Specs</h1>
                            <div className="input-grid">
                                <p>
                                    <label htmlFor="size">Size</label>
                                    <Field className="input-style" name="size" type="text" />
                                    <ErrorMessage component="required-message" name="size" />
                                </p>

                                <p>
                                    <label htmlFor="speed">Speed</label>
                                    <Field className="input-style" name="speed" type="text" />  
                                    <ErrorMessage component="required-message" name="speed" />
                                </p>

                                <p>
                                    <label htmlFor="power">Power</label>
                                    <Field className="input-style" name="power" type="text" />
                                    <ErrorMessage component="required-message" name="power" />
                                </p>

                            </div>

                        <div className="input-grid-button">
                            <Link to="/dashboard" className="button-calculator" >Back</Link>
                            <button style={{gridColumn:"3"}} className="button-calculator" type="submit">Submit</button>
                        </div>
                        
                    </Form>

                </Formik>

                
            </div>
            
        </div>
        
    );
}

export default Calculator;
