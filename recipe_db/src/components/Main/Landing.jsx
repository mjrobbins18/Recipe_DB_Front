import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import axiosInstance from '../../AxiosAPI';
import Create from '../Recipe/Create';
import CreateForm from '../Recipe/CreateForm';
import Recipe from '../Recipe/Recipe';
import RecipeCard from '../Recipe/RecipeCard';
import RecipeCont from '../Recipe/RecipeCont';
import Login from '../User/Login';
import Signup from '../User/Signup';
import About from './About';
import { DataContext } from './DataContext';
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'


function Landing(props) {

    // State
    const [showSidebar, setShowSidebar ] = useState(false)

    // Handle Show Sidebar
    const handleShowSidebar = () => setShowSidebar(true)
    
    return (
        <div>
            <nav>
                <Button variant = 'primary' onClick = { handleShowSidebar }>Nav</Button>

                    <Sidebar showSidebar = { showSidebar }
                             setShowSidebar = { setShowSidebar }  />
            </nav>
            <main>
                    <Route exact path = '/login' render = { Login }/>
                    <Route exact path = '/signup' render = { Signup }/>
                    <Route exact path = '/create' render = { Create }/>
                    <Route exact path = '/' render = { RecipeCard }/>
            </main>
                
            
            
            
            
        </div>
    );
}

export default Landing;