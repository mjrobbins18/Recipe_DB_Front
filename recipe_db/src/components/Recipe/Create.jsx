import React, { useState } from 'react';
import CreateForm from './CreateForm';
import InstructionModal from './InstructionModal';
import TitleModal from './TitleModal';



function Create(props) {
    
   
    return (
        <div className = "recipeFormContainer">
            <InstructionModal/>
            <TitleModal/>
        </div>
    );
}

export default Create;