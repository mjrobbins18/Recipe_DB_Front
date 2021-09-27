import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
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
import Dashboard from '../User/Dashboard';
import DashboardContainer from '../User/DashboardContainer';



function Landing(props) {
    // Context
    const { currentUser } = useContext(DataContext)
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
                    <Route exact path = '/recipes' render = { RecipeCard }/>
                    <Route exact path = '/recipe/:id'  render = { routerProps => <RecipeCont match = { routerProps.match }/>}/>
                    <Route exact path = {`/dash/${currentUser}`} render = { DashboardContainer }/> 
                    <Route exact path = '/'>{currentUser ? <Redirect to = {`/dash/${currentUser}`}/> : <RecipeCard/> }</Route>
            </main>
                
            
            
            
            
        </div>
    );
}

export default Landing;