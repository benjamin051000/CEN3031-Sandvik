import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function ({rig_model}) {
    // TODO add individual rig model specifications.
    return (
        <Modal
            trigger={<Button color='blue' size='small'>Rig Details</Button>}
            header="Rig Details"
            content="Blah blah blah"
            actions={[{content: 'Close', color:'red'}]}
        />
    );
};
