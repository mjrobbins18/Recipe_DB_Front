import React, { useState } from 'react';
import axiosInstance from '../../AxiosAPI';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel, Popover, Row, Col } from 'react-bootstrap';


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
            setValidated(true)
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
        setState(initialState)
        }
        
    
}



    return (
        <div>
            
            <Form noValidate validated = {validated} onSubmit = { handleSubmit }>
                <Row className = 'mb-3'>
                <Form.Group as={Col} controlId = "formGridName" className = 'mb-3'>
                    <FloatingLabel
                      controlId = "floatingInput"
                      label = "First Name"
                      className = "mb-3"  >
                            <Form.Control
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
                        controlId = "floatingInput"
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
                <Form.Group controlId = "formGroupUsername" className = 'mb-3'> 
                    <FloatingLabel
                        controlId = "floatingInput"
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
                    <Form.Control.Feedback type = "invalid">Please Choose a Username</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                
                <Form.Group controlId = "formGroupEmail" className = 'mb-3'>
                    <FloatingLabel
                        controlId = "floatingInput"
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
                        <Form.Control.Feedback type = "invalid">Please Enter a Valid Email</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId = "formGroupPassword" className = 'mb-3'>    
                    <FloatingLabel
                        controlId = "floatingInput"
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
                         <Form.Control.Feedback type = "invalid">Please Enter a Password that is at least 8 characters.</Form.Control.Feedback>
                    </FloatingLabel>
                </Form.Group>
                <Button variant="primary" type = 'submit'>Submit</Button>
            </Form>
        </div>
    );
}

export default SignupForm;