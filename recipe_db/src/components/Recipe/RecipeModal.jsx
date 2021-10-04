import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';



function RecipeModal({ showRecipeModal, setShowRecipeModal, handleShowRecipeModal, id}) {


// History
const history = useHistory()

// close Modal
const handleCloseRecipeModal = (event) => {
    setShowRecipeModal(false)
    history.push(`${event.target.id}`)
    window.location.reload()
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
                        <Button variant = 'primary' id = {`/recipe/${id}`} onClick = { handleCloseRecipeModal }> View Recipe </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    );
}

export default RecipeModal;