import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function () {
    
    const changeUsername = (newUsername) => {
        fetch('/api/account/changeuser', {
            method: 'POST',
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
        <Modal
            trigger={<Button color='blue' size='small'>Change Username</Button>}
            header="Change Username"
            content={"Change your username\n Current Username: " + localStorage.getItem("userId")}
            actions={[{content: 'Close', color:'blue'}]}
        />
    );
};
