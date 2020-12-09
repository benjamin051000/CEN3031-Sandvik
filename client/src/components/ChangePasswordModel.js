import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function () {
    
    const changePassword = (oldPassword, newPassword) => {
        fetch('/api/account/changepass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: localStorage.getItem("userId"),
                oldPassword: oldPassword,
                newPassword: newPassword,
              }),
            }).then(res => res.json()).
            then(json => {
            console.log('json', json)
            if(json.success){
                alert("Password changed!")
            }
          })
    }

    return (
        <Modal
            trigger={<Button color='blue' size='small'>Change Password</Button>}
            header="Change Password"
            content="Change your password:"
            actions={[{content: 'Close', color:'blue'}]}
        />
    );
};
