import React from 'react';
import LoginForm from './LoginForm';

function Login(props) {
    return (
        <div className = 'formContainer'>
            <span>
                <h1>Please Log in</h1>
            </span>
            <LoginForm/>
        </div>
    );
}

export default Login;