import React, { useContext, useEffect, useState } from 'react';
import '../../css/User/Dashboard.css'
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import Pagination from 'react-bootstrap/Pagination'
import S3 from 'react-aws-s3'
import Spinner from 'react-bootstrap/Spinner'


function Dashboard(props) {

    // Context
    const { currentUser, setRecipeInfo, loading, setLoading } = useContext(DataContext)

    // History
    const history = useHistory()

    // State
    const [createdRecipes, setCreatedRecipes] = useState([])
    

    const WAIT_TIME = 5000
    useEffect(() => {
        setLoading(true)
        // const id = setInterval(() => {
        axiosInstance.get(`/recipes/user/${currentUser}`)
        .then(res => {
            setCreatedRecipes(res.data)
            setLoading(false)
        })
        .catch(console.error)
    // }
        // ,WAIT_TIME);
        // return () => clearInterval(id)
    }, [])




    // Handle Delete Created Recipe
    const deleteRecipe = (event) => {
        setLoading(true)
        axiosInstance.get(`/recipes/${event.target.id}`)
        .then(res => {
            if(res.data.recipe_body[0].image){
            let fileName = res.data.recipe_body[0].image
            const config = {
                bucketName: process.env.REACT_APP_BUCKET_NAME,
                region: process.env.REACT_APP_REGION,
                accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
            }
           const ReactS3Client = new S3(config)
            ReactS3Client.deleteFile(fileName).then(data => {
                console.log(data)
            })
        }
        })
        
        .then(axiosInstance.delete(`/recipes/${event.target.id}`)
        .then(res => {
            console.log(res)
            axiosInstance.get(`/recipes/user/${currentUser}`)
            .then(res => {
            setCreatedRecipes(res.data)
            setLoading(false)
        })
        .catch(console.error)
        })
        // .finally(window.location.reload())
        .catch(console.error)
        )
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
    const itemsPerPage = 8

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
        
        <div id = "createdButtons">
        <Button id = {item.id} variant = 'outline-primary' size = 'sm' onClick = { handleUpdate }>Update</Button>
        <Button id = {item.id} variant = 'outline-secondary' size = 'sm' onClick = { deleteRecipe }>Delete</Button>
        </div>
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
                <div id = "createdRecipes">

               
                <div className = "dashHeading">
                    Recipes Created by {currentUser}
                    <Button variant = "success" onClick = {() => history.push('/create')}>Create</Button>
                </div>
                {loading ?
          <div className = "loadDiv">
            <span>
              <Spinner animation="border" variant = "primary"/>
            </span>
          </div>
          : currentItems.map((item, index) => {
       
            return (
                <div className = "createdItems">
            <Link to = {`/recipe/${item.id}`} id = "recipeLink" className = "nav-link" key={index}>{item.title}</Link>
            
            <div id = "createdButtons">
            <Button id = {item.id} variant = 'outline-primary' size = 'sm' onClick = { handleUpdate }>Update</Button>
            <Button id = {item.id} variant = 'outline-secondary' size = 'sm' onClick = { deleteRecipe }>Delete</Button>
            </div>
            </div>
            )
        })
}
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
                {loading ? 
                <div className = "loadDiv">
                <span>
                  <Spinner animation="border" variant = "primary"/>
                </span>
              </div>
              : 
                createdRecipes.map(post => {
                    return (
                    post.recipe_post.map((item => {
                        return (
                            
                            <div className = "createdItems">
                            <Link to = {`/recipe/${item.recipe}`} id = "recipeLink" className = "nav-link" >{item.user}: {item.body}</Link>
                            </div>
                        )
                    }))
                    ) 
                })
            }
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