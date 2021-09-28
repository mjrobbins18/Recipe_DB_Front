import React from 'react';
import Update from './Update';


function UpdateContainer({ match }) {
    return (
        <div>
            <Update match = { match }/>
        </div>
    );
}

export default UpdateContainer;