import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Create from '../Recipe/Create';
import CreateForm from '../Recipe/CreateForm';
import Recipe from '../Recipe/Recipe';
import RecipeCont from '../Recipe/RecipeCont';
import Login from '../User/Login';
import Signup from '../User/Signup';
import About from './About';
import { DataContext } from './DataContext';


function Landing(props) {
    const {currentUser} = useContext(DataContext)
    console.log(currentUser)
    return (
        <div>
            Welcome, {currentUser}
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
            {/* <About/> */}
            
            <Route exact path = '/login' render = { Login }/>
            <Route exact path = '/signup' render = { Signup }/>
            <Route exact path = '/' render = { Create }/> 
            
        </div>
    );
}

export default Landing;