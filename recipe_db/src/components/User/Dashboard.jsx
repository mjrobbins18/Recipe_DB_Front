import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'



function Dashboard(props) {

    // Context
    const { currentUser } = useContext(DataContext)

    // State
    const [createdRecipes, setCreatedRecipes] = useState([])
  
    useEffect(() => {
        axiosInstance.get(`/recipes/user/${currentUser}`)
        .then(res => setCreatedRecipes(res.data))
        .catch(console.error)
    }, [])
    console.log(createdRecipes)

    return (
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
                            <Button variant = 'outline-primary' size = 'sm'>Update</Button>
                            <Button variant = 'outline-secondary' size = 'sm'>Delete</Button>
                            </span>
                           
                        </div>
                    )
                })}
                <Link to = "/create">
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
    );
}

export default Dashboard;