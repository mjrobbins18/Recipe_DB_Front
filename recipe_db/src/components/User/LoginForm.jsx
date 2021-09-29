import React, { useState } from 'react';
import axiosInstance from '../../AxiosAPI';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useHistory } from 'react-router';
import '../../css/User/LoginForm.css'

function LoginForm(props) {
    // Initial state
    const initialState = {
        username: "",
        password: "",
    }
    
    // State
    const [formState, setState] = useState(initialState)
    const [data, setData] = useState({})
    
    // History
    const history = useHistory()

    // Handle Change
    const  handleChange = (e) => {
        setState({
            ...formState, [e.target.id]: e.target.value
     })
    }

    // Handle submit
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
            window.location.reload()
            
            } )
        .finally(history.push('/'))
        .catch(console.error)
   
}


    return (
  
        <div className = "formDiv">
            
            <Form onSubmit = { handleSubmit }>
            
            <Form.Group className = 'mb-3' >
                <FloatingLabel
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
                <Form.Group className = 'mb-3'>
                <FloatingLabel
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
                <Button size = 'lg' variant = "primary" type = 'submit'>Submit</Button>
            </Form>
        </div>
    
    );
}

export default LoginForm;