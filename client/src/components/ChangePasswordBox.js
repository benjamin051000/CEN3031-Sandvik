import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export default function ChangePasswordBox() {

  const changePassword = (oldPassword, newPassword) => {
    fetch('/api/account/changepass', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: localStorage.getItem("userId"),
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if (json.success) {
          alert("Password changed!")
        }
      })
  }

  return (
    <div class="ui centered container">
      <div class="ui middle aligned center aligned grid">
        <div class="six wide column">
          <h2 class="ui header">
            <div style={{ fontSize: "15pt", color: "#009aff" }} class="content">Change Password</div>
          </h2>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
            }}

            onSubmit={(values) => {
              changePassword(values.oldPassword, values.newPassword)

            }}>
            {/**^^^^^^^^^^^^^^^PROCESS FROM HERE */}

            <Form class="ui large form">
              <div class=" ui inverted stacked segment">
                <div class="field">
                  <div class="ui input">

                    <Field name="oldPassword" type="password" placeholder="New Password" />
                    <ErrorMessage component="required-message-login" name="oldPassword" />
                  </div>
                  <div class="ui input">

                    <Field name="newPassword" type="password" placeholder="New Password" />
                    <ErrorMessage component="required-message-login" name="newPassword" />
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
