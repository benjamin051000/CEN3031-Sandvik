import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function ChangeUsernameBox() {
    
    const changeUsername = (newUsername) => {
        fetch('/api/account/changeuser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                oldUsername: localStorage.getItem("userId"),
                newUsername: newUsername,
              }),
            }).then(res => res.json())
            .then(json => {
            console.log('json', json)
            if(json.success){
                localStorage.setItem("userId", newUsername)
                alert("Username changed to: " + newUsername +"!")
            }
          })
    }

    return (
        <div class="ui centered container">
            <div class="ui middle aligned center aligned grid">
                <div class="six wide column">
                    <h2 class="ui header">
                        <div style={{fontSize:"15pt", color:"#009aff"}} class="content">Change Username</div>
                    </h2>
                    <Formik 
                        initialValues={{
                            newUsername: '',
                        }}
                    

                        onSubmit={(values) => {
                            changeUsername(values.newUsername)
 
                        }}>
                        {/**^^^^^^^^^^^^^^^PROCESS FROM HERE */}

                        <Form class="ui large form">
                            <div class=" ui inverted stacked segment">
                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="user icon"></i>
                                        <Field name="newUsername" type="text" placeholder="New Username"/>
                                        <ErrorMessage component="required-message-login" name="newUsername" />
                                    </div>
                                </div>
                                <button type="submit" class="ui fluid large blue sumbit button">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    </div>
                    </div>
                    </div>
    );
};
