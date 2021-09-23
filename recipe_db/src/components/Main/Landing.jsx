import React from 'react';
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import RecipeCont from '../Recipe/RecipeCont';
import Login from '../User/Login';
import Signup from '../User/Signup';
import About from './About';


function Landing(props) {
    return (
        <div>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
            {/* <About/> */}
            <Route exact path = '/login' render = { Login }/>
            <Route exact path = '/signup' render = { Signup }/>
            <Route exact path = '/' render = { RecipeCont }/> 
            
        </div>
    );
}

export default Landing;