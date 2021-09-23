import React, { useState } from 'react';
import axiosInstance from '../../AxiosAPI';

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
        const token = res.data
        localStorage.setItem('refresh_token', token.refresh)
        localStorage.setItem('access_token', token.access)
        setState(initialState)
          } )
    .catch(console.error)
   
}


    return (
        <div>
            Login
            <form onSubmit = { handleSubmit }>
                <label>Username:
                    <input type = "text" 
                           placeholder = "Username"
                           id = "username"
                           value = { formState.username }
                           onChange = { handleChange }/>
                </label>
                <label>
                    Password:
                    <input type = "text" 
                           placeholder = "Password"
                           id = "password"
                           value = { formState.password }
                           onChange = { handleChange }/>
                </label>
                <button type = 'submit'>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;