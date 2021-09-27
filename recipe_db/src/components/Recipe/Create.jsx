import React, { useState } from 'react';
import CreateForm from './CreateForm';
import TitleModal from './TitleModal';


function Create(props) {

   
    return (
        <div>
            <TitleModal/>
            <CreateForm/>
        </div>
    );
}

export default Create;