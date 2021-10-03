import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import { render } from '@testing-library/react';



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
    
    // Pagination for Created Recipes
    const [pages, setPages] = useState({
        currentPage: 1
    })
    const itemsPerPage = 10

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
    console.log(pageNums.length)
    return (
        <div className = "dashboardBack">
        <div className = "dashboardContainer">
            <div className = "createdRecipeDiv">
                <div className = "dashHeading">
                    Recipes Created by {currentUser}
                    <Button variant = "success" onClick = {() => history.push('/create')}>Create</Button>
                </div>        
                {renderItems}
                <br />
                {pageNums.length === 1 ? null :
              <div className = "pagination">
              {paginationBasic}
              </div>
                }
                </div>
                {/* <Link to = "/create" >
                 <div className = "createRecipeDiv">
                 <div className = "dashHeading">
                    New Recipe
                    </div>
                    <p>+</p>
                    
                </div>
                </Link>
            
             */}
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





// {createdRecipes.map(recipe => {
//     return(



// )
// })}