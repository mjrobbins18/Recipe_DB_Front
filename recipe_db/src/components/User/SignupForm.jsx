import React, { useState } from 'react';
import axiosInstance from '../../AxiosAPI';


function SignupForm(props) {
    const initialState = {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: ""
    }

    const [formState, setState] = useState(initialState)
    const [errors, setErrors] = useState()
const  handleChange = (e) => {
    setState({
        ...formState, [e.target.id]: e.target.value
    })
}

const handleSubmit = (e) => {
    console.log('username:', formState.username, 'password:', formState.password, 'email:', formState.email)
    e.preventDefault()
    axiosInstance.post('/user/create/', {
        username: formState.username,
        password: formState.password,
        email: formState.email,
        first_name: formState.first_name,
        last_name: formState.last_name
    })
    .then(res => console.log(res))
    .catch(err => {
        console.log(err.stack)
        setErrors({errors: err.response.data})
    })
    setState(initialState)
}


    return (
        <div>
            Signup
            <form onSubmit = { handleSubmit }>
            <label>
                        First Name:
                        <input type = "text" 
                           placeholder = "First Name"
                           id = "first_name"
                           value = { formState.first_name }
                           onChange = { handleChange }/>
                           
                    </label>
                    <label>
                        Last Name:
                        <input type = "text" 
                           placeholder = "Last Name"
                           id = "last_name"
                           value = { formState.last_name }
                           onChange = { handleChange }/>
                    </label>
                <label>Username:
                    <input type = "text" 
                           placeholder = "Username"
                           id = "username"
                           value = { formState.username }
                           onChange = { handleChange }/>
                           { errors ? errors.errors.username : null}
                </label>
                <label>
                        Email:
                        <input type = "text" 
                           placeholder = "Email"
                           id = "email"
                           value = { formState.email }
                           onChange = { handleChange }/>
                           { errors ? errors.errors.email: null}
                    </label>
                <label>
                    Password:
                    <input type = "text" 
                           placeholder = "Password"
                           id = "password"
                           value = { formState.password }
                           onChange = { handleChange }/>
                           { errors ? errors.errors.password : null}
                </label>
                <button type = 'submit'>Submit</button>
            </form>
        </div>
    );
}

export default SignupForm;