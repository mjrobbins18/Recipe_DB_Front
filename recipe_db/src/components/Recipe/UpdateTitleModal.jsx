import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axiosInstance from '../../AxiosAPI';
import { FloatingLabel } from 'react-bootstrap';
import { DataContext } from '../Main/DataContext';

function TitleModal({ recipeID }) {


     // State
    
    

    //  Context
    const { currentUser, showTitleModal, setShowTitleModal, recipeInfo, setRecipeInfo } = useContext(DataContext)
 
     // handle title submit
     const handleTitleSubmit = (event) => {
        event.preventDefault()
            axiosInstance.put(`/recipes/${recipeID}`,{
                title: recipeInfo,
                user: currentUser,
            })
            .then(res => console.log(res))
            .catch(console.error)
        
     }
     // handle title change
     const handleTitleChange = (event) => {

            setRecipeInfo(event.target.value)
       
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
                    
                    <Modal.Title><h2> Would you like to change the title of your recipe?</h2></Modal.Title>
                    
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
                                        value = { recipeInfo }
                                        onChange = { handleTitleChange }/>
                                </FloatingLabel>
                        </Form.Group>
                        { recipeInfo.length > 0 ? <Button variant = 'primary' type = 'submit' onClick = {() => setShowTitleModal(false)}>Next Step</Button>
                        : <Button variant = 'primary' type = 'submit' onClick = {() => setShowTitleModal(false)} disabled>Next Step</Button> }
                        {/* <Button variant = 'success' onClick = { handleInstructionModal }>First Time?</Button> */}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TitleModal;