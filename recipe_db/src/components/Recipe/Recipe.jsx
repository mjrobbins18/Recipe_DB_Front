import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosAPI';
import '../../css/Recipe/Recipe.css'
import Spinner from 'react-bootstrap/Spinner'
import { HashLink } from 'react-router-hash-link';


function Recipe({ match }) {
  // Recipe id
    const recipeId = match.params.id
  // State
    const [data, setData] = useState([])

  
    useEffect(() => {
      axiosInstance.get(`/recipes/${recipeId}`)
      .then(res => setData(res.data))
      .catch(console.error)
    }, [])

    console.log(data)
    if(!data.title){
      return(
        <div className = "loadDiv">
          <span>
            <Spinner animation="border" variant = "primary"/>
          </span>
        </div>
        
      )
    }else{
      return(
        <div className = "recipeDiv">
            <div className = "recipeBodyDiv">
              <div>
                <span>
              <h1>{data.title}</h1>
                <p>{data.user.username}</p>
                
              </span>
                <HashLink className = "nav-link" to = {`/recipe/${recipeId}/#comments`}>Comments</HashLink>
                <h4>{data.recipe_body[0].recipe_yield}</h4>
              </div>
              
              <img src = {data.recipe_body[0].image ? data.recipe_body[0].image : data.recipe_body[0].image_url} alt = {data.title}/>
              
          </div>
          <div className = "ingEquipDiv">
            <span>
                <h2>Ingredients</h2>
            </span>
                <ul>
                    {data.ingredients.map(item => {
                      return (
                        <li>
                          { item.quantity } { item.unit_of_measure } { item.name }
                        </li>
                      )
                    })}
                  </ul>
            <span>
                  <h2>Equipment</h2>
            </span>
                  <ul>
                    {data.equipment.map(item => {
                      return (
                        <li>
                          {item.quantity} {item.name}
                          </li>
                      )
                    })}
                  </ul>
          </div>
          <div className = "procedureDiv">
                <span>
                <h2>Procedure</h2>
                </span>
                <ol>
                {data.procedure.map(item => {
                  return (
                    <li>
                      {item.step}
                      </li>
                  )
                })}
              </ol>
          </div>
         <div id = "comments">
           
         </div>
          
        </div>
      )
    }
    
  }

export default Recipe;