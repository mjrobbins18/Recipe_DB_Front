import React from 'react';
import SignupForm from './SignupForm';

function Signup(props) {
    return (
        <div className = "formContainer">
            <span>
                <h1> Create a Username</h1>
            </span>
            
            <SignupForm/>
        </div>
    );
}

export default Signup;