import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { DataContext } from '../Main/DataContext';
import { useHistory } from 'react-router';


function InstructionModal(props) {

    // State
    

    // History
    const history = useHistory()

    // Context
    const { showTitleModal, setShowTitleModal, showInstructionModal, setShowInstructionModal } = useContext(DataContext)

    // handle modal
    const handleInstructionModal = (event) => {
        event.preventDefault()
        setShowInstructionModal(false)
        setShowTitleModal(true)
    }
    const goHome = (event) => {
        history.push(`${event.target.id}`)
    }


    return (
        <div>
            <Modal
            size = 'lg'
            show = { showInstructionModal }
            onHide = { handleInstructionModal }
            backdrop = "static"
            keyboard = { false }
            centered>
                <Modal.Header>
                    <h1>Create a Recipe!</h1>
                </Modal.Header>
                <Modal.Body>
                    <h2>What's a good recipe without a name?<br></br></h2>
                     <ul>

                     <li><h3>The first step is to create a title for your recipe. </h3></li>
                    <li><h3> Next, fill the recipe body form out according to your recipe's needs.</h3></li>
                    <li><h3>The only required fields are Ingredients, Equipment, and Procedure. Otherwise, it's not really a recipe, right?</h3></li>
                    <li><h3>Don't worry if you make a mistake, any errors can be updated at any time after the recipe is created.</h3></li>
                    </ul>
                    <h3>Let's get cooking!</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant= "primary" id = '/' onClick = { goHome }>Home</Button>
                    <Button variant= "success" onClick = { handleInstructionModal }>Get Started!</Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}

export default InstructionModal;