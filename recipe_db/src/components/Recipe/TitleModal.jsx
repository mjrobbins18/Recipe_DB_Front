import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axiosInstance from '../../AxiosAPI';
import { FloatingLabel } from 'react-bootstrap';
import { DataContext } from '../Main/DataContext';
import { useHistory } from 'react-router';

function TitleModal({ recipeID }) {


     // History
     const history = useHistory()
    
    

    //  Context
    const { recipeTitle, setRecipeTitle,currentUser, showTitleModal, setShowTitleModal, showInstructionModal, setShowInstructionModal, recipeInfo, setRecipeInfo } = useContext(DataContext)
 
     // handle title submit
     const handleTitleSubmit = (event) => {
        event.preventDefault()
            axiosInstance.post('/recipes/create',{
                title: recipeTitle.title,
                user: currentUser,
            })
            .then(res => console.log(res))
            .finally(history.push('/create/body'))
            .catch(console.error)
        
     }
     // handle title change
     const handleTitleChange = (event) => {
            setRecipeTitle({
                ...recipeTitle, [event.target.id]: event.target.value
            })
        
     }
    //  handle Instruction modal
    const handleInstructionModal = (event) => {
        event.preventDefault()
        setShowInstructionModal(true)
        setShowTitleModal(false)
    }
    //  Close Modal
     const handleTitleClose = () => setShowTitleModal(false)
    return (
        <div>
            <Modal
                size = 'lg'
                show = { showTitleModal }
                onHide = { handleTitleClose }
                backdrop = "static"
                keyboard = { false }
                centered>
                <Modal.Header>
                    
                 <Modal.Title><h2>What is the title of your recipe?</h2></Modal.Title>
                    
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleTitleSubmit }>
                        <Form.Group>
                            <FloatingLabel
                                label = "Recipe Title"
                                className = 'mb-3'>
                                    <Form.Control
                                        autoFocus
                                        size = "lg"
                                        type = "text" 
                                        placeholder = "First Name"
                                        id = "title"
                                        value = {recipeTitle.title }
                                        onChange = { handleTitleChange }/>
                                </FloatingLabel>
                        </Form.Group>
                        {recipeTitle.title.length > 0 ? <Button variant = 'primary' type = 'submit' onClick = {() => setShowTitleModal(false)}>Next Step</Button>
                        : <Button variant = 'primary' type = 'submit' onClick = {() => setShowTitleModal(false)} disabled>Next Step</Button> }
                        <Button variant = 'success' onClick = { handleInstructionModal }>First Time?</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TitleModal;