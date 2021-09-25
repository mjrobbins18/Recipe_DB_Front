import React, { useState } from 'react';
import axiosInstance from '../../AxiosAPI';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function LoginForm(props) {
    const initialState = {
        username: "",
        password: "",
    }

    const [formState, setState] = useState(initialState)
    const [data, setData] = useState({})

const  handleChange = (e) => {
    setState({
        ...formState, [e.target.id]: e.target.value
    })
}


const handleSubmit = (e) => {
    console.log('username:', formState.username, 'password', formState.password)
    e.preventDefault()
    axiosInstance.post('/token/obtain/', {
        username: formState.username,
        password: formState.password
    })
    .then(res => {
        axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access
        const token = res.data
        localStorage.setItem('refresh_token', token.refresh)
        localStorage.setItem('access_token', token.access)
        localStorage.setItem('username', formState.username)
        setState(initialState)
          } )
    .catch(console.error)
   
}


    return (
  
        <div>
            
            <Form onSubmit = { handleSubmit }>
            
            <Form.Group className = 'mb-3' controlId="formBasicUsername">
                <FloatingLabel
                    controlId = "floatingInput"
                    label = "Username"
                    className = "mb-3"  >
                    <Form.Control 
                           size = 'lg'
                           type = "text"
                           placeholder="Username" 
                           id = "username"
                           value = { formState.username }
                           onChange = { handleChange }/>
                </FloatingLabel>
                </Form.Group>
                <Form.Group className = 'mb-3' controlId="formBasicPassword">
                <FloatingLabel
                    controlId = "floatingInput"
                    label = "Password"
                    className = "mb-3"  >
                    <Form.Control 
                           size = 'lg'
                           type = "password"
                           placeholder= "Password" 
                           id = "password"
                           value = { formState.password }
                           onChange = { handleChange }/>
                </FloatingLabel>
                </Form.Group>
                <Button variant = "primary" type = 'submit'>Submit</Button>
            </Form>
        </div>
    
    );
}

export default LoginForm;