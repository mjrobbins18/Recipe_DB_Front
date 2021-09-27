import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { DataContext } from '../Main/DataContext';
import { useHistory } from 'react-router';



function RecipeModal({ showRecipeModal, setShowRecipeModal, handleShowRecipeModal}) {


// History
const history = useHistory()

// close Modal
const handleCloseRecipeModal = (event) => {
    setShowRecipeModal(false)
    history.push(`${event.target.id}`)
}

      
    return (
        <div>
            <Modal
                onHide = { handleCloseRecipeModal }
                show = { showRecipeModal } 
                backdrop = "static"
                keyboard = { false }
                centered
                >
                    <Modal.Header>
                        <Modal.Title>Recipe Created!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Where would you like to go now?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'primary' id = '/' onClick = { handleCloseRecipeModal }> Home </Button>
                        <Button variant = 'primary' id = '/recipe' onClick = { handleCloseRecipeModal }> View Recipe </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
}

export default RecipeModal;