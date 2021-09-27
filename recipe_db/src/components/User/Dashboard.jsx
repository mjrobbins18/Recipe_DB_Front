import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';



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
                Created Recipes
                {createdRecipes.map(recipe => {
                    return(
                        <Link to= {`/recipe/${recipe.id}`} className="nav-link">{recipe.title}</Link>
                    )
                })}
            </div>
            <div className = "verticalContainer">
                <div className = "createRecipeDiv">
                    Create Recipe
                    <h1>+</h1>
                </div>
                <div className = "favoriteRecipeDiv">
                    Favorite Recipes
            </div>
            </div>
            <div className = "postsOnYourRecipeDiv">
                Posts on Your Recipes
            </div>
        </div>
    );
}

export default Dashboard;