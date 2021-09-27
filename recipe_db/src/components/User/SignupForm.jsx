import React, { useState } from 'react';
import '../../css/User/SignupForm.css'
import axiosInstance from '../../AxiosAPI';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel, Modal, Row, Col } from 'react-bootstrap';
import CreatedModal from './CreatedModal';
import { useHistory } from 'react-router';


function SignupForm(props) {
    // Initial State
    const initialState = {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: ""
    }

    // State
    const [formState, setState] = useState(initialState)
    const [errors, setErrors] = useState()
    const [validated, setValidated] = useState(false)
    const [showModal, setShowModal] = useState(false)
    // History
    const history = useHistory()

    // close Modal
    const handleClose = () => {
        setShowModal(false)
        history.push('/login')
    }
    // open Modal
    const handleShow = () => {
        return validated ? setShowModal(true) : null }

    // Handle Change
    const  handleChange = (e) => {
        setState({
             ...formState, [e.target.id]: e.target.value
            })
        }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false){
            e.preventDefault()
            e.stopPropagation()
        }
        else{   
        axiosInstance.post('/user/create/', {
            username: formState.username,
            password: formState.password,
            email: formState.email,
            first_name: formState.first_name,
            last_name: formState.last_name
            
        })
        .then(res => console.log(res))
        .catch(err => {
            console.log(err.stack)})
        setValidated(true)
        setState(initialState)
        }
        
    
}



    return (
        <div className = "formDiv">
            
            <Form noValidate validated = {validated} onSubmit = { handleSubmit }>
                <Row className = 'mb-3'>
                <Form.Group as={Col}  className = 'mb-3'>
                    <FloatingLabel
                      label = "First Name"
                      className = "mb-3"  >
                            <Form.Control
                            autoFocus
                            size = "lg"
                            type = "text" 
                            placeholder = "First Name"
                            id = "first_name"
                            value = { formState.first_name }
                            onChange = { handleChange }/>
                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>       
                    </FloatingLabel>
                </Form.Group>
                
                
                <Form.Group as = {Col} controlId = "formGridName" className = 'mb-3'>   
                    <FloatingLabel
                        label = "Last Name"
                        className = "mb-3"  >
                            <Form.Control
                            size = 'lg'
                            type = "text" 
                            placeholder = "Last Name"
                            id = "last_name"
                            value = { formState.last_name }
                            onChange = { handleChange }/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </FloatingLabel>
                </Form.Group>
              </Row>
                <Form.Group className = 'mb-3'> 
                    <FloatingLabel
                        
                        label = "Username"
                        className = "mb-3"  >
                            <Form.Control
                                required 
                                size = 'lg'
                                type = "text" 
                                placeholder = "Username"
                                id = "username"
                                value = { formState.username }
                                onChange = { handleChange }/>
                                {validated ? 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        : 
                        <Form.Control.Feedback type = "invalid">Please Enter a Valid Email</Form.Control.Feedback>}
                    </FloatingLabel>
                </Form.Group>
                
                <Form.Group className = 'mb-3'>
                    <FloatingLabel
                       
                        label = "Email@example.com"
                        className = "mb-3"  >
                            <Form.Control 
                            required
                            size = 'lg'
                            type = "text" 
                            placeholder = "Email"
                            id = "email"
                            value = { formState.email }
                            onChange = { handleChange }/>
                        {validated ? 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        : 
                        <Form.Control.Feedback type = "invalid">Please Enter a Valid Email</Form.Control.Feedback>}
                        
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className = 'mb-3'>    
                    <FloatingLabel
                        
                        label = "Password"
                        className = "mb-3"  >
                        <Form.Control
                            required 
                            size = 'lg'
                            type = "Password" 
                            placeholder = "Password"
                            id = "password"
                            value = { formState.password }
                            onChange = { handleChange }/>
                            {validated ? 
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        : 
                        <Form.Control.Feedback type = "invalid">Please Enter a Valid Email</Form.Control.Feedback>}
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" size = 'lg' type = 'submit' onClick = { handleShow }>Submit</Button>
            </Form>
            
            <CreatedModal handleShow = { handleShow } 
            handleClose = { handleClose }
            showModal = { showModal }
            setShowModal = { setShowModal }/>
            
        </div>
    );
}

export default SignupForm;