import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import {writeToCookie} from "../../functions/JSONFunctions"
import './Login.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/** Login styling based off example hosted at https://semantic-ui.com/examples/login.html */

/**
 * @param {*} props 
 */


//Set website header, includes the bar with home
const Login  = (props) => {
    

    return (
        <div class="ui centered container">
            <div class="ui middle aligned center aligned grid">
                <div class="six wide column">
                    <h2 class="ui header">
                        <div style={{fontSize:"25pt", color:"#009aff"}} class="content">Login to your account</div>
                    </h2>
                    <Formik 
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                    
                    
                        validationSchema={Yup.object({
                            email: Yup.string().required('Required'),
                            password: Yup.string().required('Required')
                        })}

                        onSubmit={(values) => {
                            
                        }}>
                        {/**^^^^^^^^^^^^^^^PROCESS FROM HERE */}

                        <Form class="ui large form">
                            <div class=" ui inverted stacked segment">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="user icon"></i>
                                        <Field name="email" type="email" placeholder="Email"/>
                                        <ErrorMessage component="required-message-login" name="email" />
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="lock icon"></i>
                                        <Field name="password" type="password" placeholder="Password"/>
                                        <ErrorMessage component="required-message-login" name="password" />
                                    </div>
                                </div>
                                <button type="submit" class="ui fluid large blue sumbit button">
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div class="ui message">
                        <a href="#">Create an Account</a>
                    </div>
                </div>
            
            </div>        
        </div>
        
    )
}

export default Login;