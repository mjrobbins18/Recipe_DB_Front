import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';



function Dashboard(props) {

    // Context
    const { currentUser, recipeInfo, setRecipeInfo } = useContext(DataContext)

    // History
    const history = useHistory()

    // State
    const [createdRecipes, setCreatedRecipes] = useState([])
  
    useEffect(() => {
        axiosInstance.get(`/recipes/user/${currentUser}`)
        .then(res => setCreatedRecipes(res.data))
        .catch(console.error)
    }, [])

    // Handle Delete Created Recipe
    const deleteRecipe = (event) => {
        axiosInstance.delete(`/recipes/${event.target.id}`)
        .then(res => console.log(res))
        .finally(window.location.reload())
        .catch(console.error)
    }

    // Handle Update
    const handleUpdate = (event) => {
        axiosInstance.get(`/recipes/${event.target.id}`)
        .then(res => setRecipeInfo(res.data.title))
        .finally(history.push(`/update/${event.target.id}`))
        .catch(console.error)
    }

    return (
        <div className = "dashboardBack">
        <div className = "dashboardContainer">
            <div className = "createdRecipeDiv">
                <div className = "dashHeading">
                    Created Recipes
                </div>
                
                {createdRecipes.map(recipe => {
                    return(
                        <div className = "createdItems">
                            <Link to= {`/recipe/${recipe.id}`} id = "recipeLink" className="nav-link">{recipe.title}</Link>
                            <span>
                            <Button id = {recipe.id} variant = 'outline-primary' size = 'sm' onClick = { handleUpdate }>Update</Button>
                            <Button id = {recipe.id} variant = 'outline-secondary' size = 'sm' onClick = { deleteRecipe }>Delete</Button>
                            </span>
                           
                        </div>
                    )
                })}
                <Link to = "/create" >
                 <div className = "createRecipeDiv">
                 <div className = "dashHeading">
                    New Recipe
                    </div>
                    <p>+</p>
                    
                </div>
                </Link>
            </div>
            
            <div className = "verticalContainer">
                
                <div className = "favoriteRecipeDiv">
                <div className = "dashHeading">
                    Favorite Recipes
                    </div>
            </div>
            </div>
            <div className = "postsOnYourRecipeDiv">
            <div className = "dashHeading">
                Posts on Your Recipes
                </div>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;