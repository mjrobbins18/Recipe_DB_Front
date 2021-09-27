import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosAPI';



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
        <h1>Loading</h1>
      )
    }else{
      return(
        <div>
          <h1>{data.title}</h1>
          <h2>Created by: {data.user.username}</h2>
         <img src = {data.recipe_body[0].image ? data.recipe_body[0].image : data.recipe_body[0].image_url} alt = {data.title}/>
         <h4>Yield: {data.recipe_body[0].recipe_yield}</h4>
         <h2>Ingredients</h2>
         <ul>
            {data.ingredients.map(item => {
              return (
                <li>
                  { item.quantity } { item.unit_of_measure } { item.name }
                </li>
              )
            })}
          </ul>
          <h2>Equipment</h2>
          <ul>
            {data.equipment.map(item => {
              return (
                <li>
                  {item.quantity} {item.name}
                  </li>
              )
            })}
          </ul>
          <h2>Procedure</h2>
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
      )
    }
    
  }

export default Recipe;