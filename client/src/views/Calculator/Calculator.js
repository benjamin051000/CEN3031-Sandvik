import React from 'react';
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
            <div style={{marginLeft:"150px"}}>
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
                        alert(JSON.stringify(values, null))
                    }}

                >
                    <Form>
                        <h1 className="calculator-section-header">Client Information</h1>
                            <div className="input-grid">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" />
                                <ErrorMessage name="name" />
                                

                                <label className="input-spacer" htmlFor="company">Company</label>
                                <Field name="company" type="text" />  
                                <ErrorMessage name="company" />
                                

                                <label className="input-spacer" htmlFor="email">Email Address</label>
                                <Field name="email" type="email" />
                                <ErrorMessage name="email" />
                                

                                <label className="input-spacer" htmlFor="phone">Phone Number</label>
                                <Field name="phone" type="text" />

                            </div>

                        <h1 className="calculator-section-header">Site Information</h1>
                            <div className="input-grid">
                                <label htmlFor="temperature">Temperature</label>
                                <Field name="temperature" type="text" />
                                <ErrorMessage name="temperature" />
                                

                                <label className="input-spacer" htmlFor="rock_hardness">Rock Hardness</label>
                                <Field name="rock_hardness" type="text" />  
                                <ErrorMessage name="rock_hardness" />
                                

                                <label className="input-spacer" htmlFor="depth">Depth</label>
                                <Field name="depth" type="text" />
                                <ErrorMessage name="depth" />
                                

                                <label className="input-spacer" htmlFor="color">Color</label>
                                <Field name="color" type="text" />
                                <ErrorMessage name="color" />

                            </div>


                        <h1 className="calculator-section-header">Current Rig Specs</h1>
                            <div className="input-grid">
                                <label htmlFor="size">Size</label>
                                <Field name="size" type="text" />
                                <ErrorMessage name="size" />
                                

                                <label className="input-spacer" htmlFor="speed">Speed</label>
                                <Field name="speed" type="text" />  
                                <ErrorMessage name="speed" />
                                

                                <label className="input-spacer" htmlFor="power">Power</label>
                                <Field name="power" type="text" />
                                <ErrorMessage name="power" />
                              
                            </div>

                        <button className="button" type="submit">Submit</button>
                        
                    </Form>

                </Formik>

                



                


            </div>
            
        </div>
    );
}

export default Calculator;
