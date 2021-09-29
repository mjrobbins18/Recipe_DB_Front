import React, { useContext, useEffect, useState } from 'react';
import '../../css/Main/Landing.css'
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
import arrow from '../../images/arrow.png'
import RecipeCardCont from '../Recipe/RecipeCardCont';
import OverlayTrigger  from 'react-bootstrap/OverlayTrigger';
import Tooltip  from 'react-bootstrap/Tooltip';
import ResultsContainer from './ResultsContainer';
import UpdateContainer from '../Recipe/UpdateContainer'


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
            <OverlayTrigger
                    placement='right'
                    overlay={
                        <Tooltip>Navigate the Site</Tooltip>
                    }>
                <div className = "arrowContainer" onClick = { handleShowSidebar }>
                
                <img className = "arrow" src = { arrow } alt = "arrow" />
                
                </div>
                </OverlayTrigger>
                    <Sidebar showSidebar = { showSidebar }
                             setShowSidebar = { setShowSidebar }  />
            </nav>
            <main>
                    <Route exact path = '/login' render = { Login }/>
                    <Route exact path = '/signup' render = { Signup }/>
                    <Route exact path = '/create' render = { Create }/>
                    <Route exact path = '/recipes' render = { RecipeCardCont }/>
                    <Route exact path = '/recipe/:id'  render = { routerProps => <RecipeCont match = { routerProps.match }/>}/>
                    <Route exact path = '/results/:query' render = { routerProps => <ResultsContainer match = {routerProps.match}/> }/>
                    <Route exact path = '/update/:id' render = { routerProps => <UpdateContainer match = {routerProps.match}/> }/>
                    <Route exact path = {`/dash/${currentUser}`} render = { DashboardContainer }/> 
                    <Route exact path = '/'>{currentUser ? <Redirect to = {`/dash/${currentUser}`}/> : <RecipeCard/> }</Route>
            </main>
                
            
            
            
            
        </div>
    );
}

export default Landing;