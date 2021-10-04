import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import Pagination from 'react-bootstrap/Pagination'



function Dashboard(props) {

    // Context
    const { currentUser, setRecipeInfo } = useContext(DataContext)

    // History
    const history = useHistory()

    // State
    const [createdRecipes, setCreatedRecipes] = useState([])

    const WAIT_TIME = 5000
    useEffect(() => {
        const id = setInterval(() => {
        axiosInstance.get(`/recipes/user/${currentUser}`)
        .then(res => setCreatedRecipes(res.data))
        .catch(console.error)}
        ,WAIT_TIME);
        return () => clearInterval(id)
    }, [])




    // Handle Delete Created Recipe
    const deleteRecipe = (event) => {
        axiosInstance.delete(`/recipes/${event.target.id}`)
        .then(res => console.log(res))
        // .finally(window.location.reload())
        .catch(console.error)
    }

    // Handle Update
    const handleUpdate = (event) => {
        axiosInstance.get(`/recipes/${event.target.id}`)
        .then(res => setRecipeInfo(res.data.title))
        .finally(history.push(`/update/${event.target.id}`))
        .catch(console.error)
    }
    
    // Pagination for Created Recipes
    const [pages, setPages] = useState({
        currentPage: 1
    })
    const itemsPerPage = 9

    const handleNext = (event) => {
        setPages({...pages, 'currentPage': Number(event.target.id)})
    }
    const indexOfLastItems = pages.currentPage * itemsPerPage
    const indexOfFirstItems = indexOfLastItems - itemsPerPage
    const currentItems = createdRecipes.slice(indexOfFirstItems, indexOfLastItems)

    const renderItems = currentItems.map((item, index) => {
        return (
            <div className = "createdItems">
        <Link to = {`/recipe/${item.id}`} id = "recipeLink" className = "nav-link" key={index}>{item.title}</Link>
        
        <span>
        <Button id = {item.id} variant = 'outline-primary' size = 'sm' onClick = { handleUpdate }>Update</Button>
        <Button id = {item.id} variant = 'outline-secondary' size = 'sm' onClick = { deleteRecipe }>Delete</Button>
        </span>
        </div>
        )
    })

    let items = []
    let pageNums = []
    
    for (let number = 1; number <= Math.ceil(createdRecipes.length / itemsPerPage); number++) {
        pageNums.push(number)
        items.push(
            <Pagination.Item key = {number} id = {number} active = {number === pages.currentPage}>
                {number}
            </Pagination.Item>
        )
    }
    const paginationBasic = (
        <div>
            <Pagination onClick = { handleNext }>{items}</Pagination>
        </div>
    )
    
    return (
        <div className = "dashboardBack">
        <div className = "dashboardContainer">
            <div className = "createdRecipeDiv">
                <div>

               
                <div className = "dashHeading">
                    Recipes Created by {currentUser}
                    <Button variant = "success" onClick = {() => history.push('/create')}>Create</Button>
                </div>        
                {renderItems}
                <br />
               
                </div>
                
                {pageNums.length === 1 ? null :
              <div className = "paginationDiv">
              {paginationBasic}
              </div>
                }
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
                {createdRecipes.map(post => {
                    return (
                    post.recipe_post.map((item => {
                        return (
                            
                            <div className = "createdItems">
                            <Link to = {`/recipe/${item.recipe}`} id = "recipeLink" className = "nav-link" >{item.user}: {item.body}</Link>
                            </div>
                        )
                    }))
                    ) 
                })}
                
            </div>
        </div>
        </div>
    );
}

export default Dashboard;





// {createdRecipes.map(recipe => {
//     return(



// )
// })}