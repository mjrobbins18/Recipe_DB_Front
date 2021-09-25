import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import axiosInstance from '../../AxiosAPI';
import Create from '../Recipe/Create';
import CreateForm from '../Recipe/CreateForm';
import NextStep from '../Recipe/NextStep';
import Recipe from '../Recipe/Recipe';
import RecipeCard from '../Recipe/RecipeCard';
import RecipeCont from '../Recipe/RecipeCont';
import Login from '../User/Login';
import Signup from '../User/Signup';
import About from './About';
import { DataContext } from './DataContext';


function Landing(props) {
    // handle logout
    const logout = () => {
        axiosInstance.post('/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        })
        .then(res => {
            console.log(res)
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('username')
            axiosInstance.defaults.headers['Authorization'] = null; 
        }
        )
        .catch(console.error) 

    }
    const {currentUser} = useContext(DataContext)
    console.log(currentUser)
    return (
        <div>
            <nav>
                    Welcome, {currentUser}
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <button onClick= {logout}>Logout</button>
            </nav>
            <main>
                    <Route exact path = '/login' render = { Login }/>
                    <Route exact path = '/signup' render = { Signup }/>
                    <Route exact path = '/' render = { RecipeCard }/>
            </main>
                
            
            
            
            
        </div>
    );
}

export default Landing;