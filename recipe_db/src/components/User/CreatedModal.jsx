import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function CreatedModal({ showModal, setShowModal, handleClose }) {

    return (
        <div>
            <Modal
                show = { showModal }
                onHide = { handleClose }
                backdrop = "static"
                keyboard = { false }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Username Created!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please login to continue!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'primary' onClick = { handleClose }> Login </Button>
                    </Modal.Footer>
                </Modal>
            
        </div>
    );
}

export default CreatedModal;