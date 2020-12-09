import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function ({ rig }) {
    // TODO add individual rig model specifications.


    let content;

    // TODO add formatting to output each section of the rig and all its keys and values.
    // if (rig !== {})
    //     content = Object.keys(rig).map(key => {
    //         return <p>{key}: {rig[key]}</p>;
    //     });
    // else
        content = <p>Please select a drill.</p>;

    return (
        <Modal
            trigger={<Button color='blue' size='small'>Rig Details</Button>}
            header="Rig Details"
            content={content}
            actions={[{ content: 'Close', color: 'red' }]}
        />
    );
};
