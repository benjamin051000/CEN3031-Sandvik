import React from 'react';
import {useState} from 'react'
// import { Redirect } from 'react-router-dom';
// import {writeToCookie} from "../../functions/JSONFunctions"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';

/** Login styling based off example hosted at https://semantic-ui.com/examples/login.html */

//Set website header, includes the bar with home
const SignUp  = () => {

    const [accountCreateState, setAccountCreateState] = useState(false)

    return accountCreateState ? <Redirect to='/login'/> : 

    (

        <div class="ui centered container">
            <div class="ui middle aligned center aligned grid">
                <div class="six wide column">
                    <h2 class="ui header">
                        <div style={{fontSize:"25pt", color:"#009aff"}} class="content">Create a new account</div>
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
                            fetch('/api/account/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                    username: values.username,
                                    password: values.password,
                                  }),
                            }).then(res => res.json()).
                            then(json => {
                                console.log('json', json)
                                if(json.success){
                                    alert("Account Created Successfully!")
                                    setAccountCreateState(true)
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
                                    Create Account
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            
            </div>        
        </div>
        
    )
}

export default SignUp;