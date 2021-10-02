import React, { useState } from 'react';
import '../../css/User/SignupForm.css'
import axiosInstance from '../../AxiosAPI';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel, Modal, Row, Col, ListGroup } from 'react-bootstrap';
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
    const [errors, setErrors] = useState({errors:""
    })
  
    const [showModal, setShowModal] = useState(false)
    const [errorChecker, setErrorChecker] = useState(false)
    const [emailError, setEmailError] = useState(false)
    // History
    const history = useHistory()

    // close Modal
    const handleClose = () => {
        setShowModal(false)
        history.push('/login')
    }

    // Handle Change
    const  handleChange = (e) => {
        setState({
             ...formState, [e.target.id]: e.target.value
            })
        }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('/user/create/', {
            username: formState.username,
            password: formState.password,
            email: formState.email,
            first_name: formState.first_name,
            last_name: formState.last_name
            
        })
        .then(() => {setShowModal(true)})
        .catch (error => {
        // checks for type of error 
        let response = error.response.status
        if(response === 500){
            setErrorChecker(true)
            setInterval(() => setErrorChecker(false), 5000)
        }else if(response === 400){
            setEmailError(true)
            setInterval(() => setEmailError(false), 5000)
        }
       
    })
   
}


    return (
        <div className = "formDiv">
            
            <Form className = 'form' onSubmit = { handleSubmit }>
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
                            
                    </FloatingLabel>
                    {errorChecker ? <p>Username already exists</p>: null}
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
                   
                    </FloatingLabel>
                </Form.Group>
                {emailError ? <p>Enter a valid Email or Password greater than 8 characters</p>: null}
                <Button variant="primary" size = 'lg' type = 'submit' >Submit</Button>
            </Form>
        
            <CreatedModal
            handleClose = { handleClose }
            showModal = { showModal }
            setShowModal = { setShowModal }/>
            
          
            
        </div>
    );
}

export default SignupForm;