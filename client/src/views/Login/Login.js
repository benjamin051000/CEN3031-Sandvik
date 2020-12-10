import React from 'react';
import {useState} from 'react'
// import { Redirect } from 'react-router-dom';
// import {writeToCookie} from "../../functions/JSONFunctions"
import './Login.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'whatwg-fetch';
import { Redirect } from 'react-router-dom';

/** Login styling based off example hosted at https://semantic-ui.com/examples/login.html */

/**
 * @param {*} props 
 */


//Set website header, includes the bar with home
const Login  = () => {
    
    const [accountLoginState, setAccountLoginState] = useState(false)

    return accountLoginState ? <Redirect to='/dashboard'/> : 

   (
        <div class="ui centered container">
            <div class="ui middle aligned center aligned grid">
                <div class="six wide column">
                    <h2 class="ui header">
                        <div style={{fontSize:"25pt", color:"#009aff"}} class="content">Login to your account</div>
                    </h2>
                    <Formik 
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                    
                    
                        validationSchema={Yup.object({
                            username: Yup.string().required('Required'),
                            password: Yup.string().required('Required')
                        })}

                        onSubmit={(values) => {
                            fetch('/api/account/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    username: values.username,
                                    password: values.password,
                                  }),
                            }).then(res => res.json())
                            .then(json => {
                              console.log('json', json)
                                if(json.success){
                                    setAccountLoginState(true)
                                    localStorage.setItem("userId", values.username)
                                    localStorage.setItem("token", json.token)
                                }
                                
                            })
                        }}>
                        {/**^^^^^^^^^^^^^^^PROCESS FROM HERE */}

                        <Form class="ui large form">
                            <div class=" ui inverted stacked segment">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="user icon"></i>
                                        <Field name="username" type="text" placeholder="Username"/>
                                        <ErrorMessage component="required-message-login" name="username" />
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
                        <a href="/signup">Create an Account</a>
                    </div>
                </div>
            
            </div>        
        </div>
        
    )
}

export default Login;