import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import '../../css/Recipe/RecipeCard.css'
import Header from './Header';
import axiosInstance from '../../AxiosAPI';
import { Link } from 'react-router-dom';
import altImage from '../../images/no-food.png'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import About from '../Main/About'

function RecipeCard(props) {
    
    // State
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('https://recipe-db-p4.herokuapp.com/api/recipes/view')
        .then(res => setData(res.data))
        .catch(console.error)
    }, [])
   
console.log(data)
    if(!data[0]){
        return(
          <div className = "loadDiv">
            <span>
              <Spinner animation="border" variant = "primary"/>
            </span>
          </div>
          
        )
      }else{
    return (
        <div>

            <Header/>
            
            <div className = "browseContainer">

           
            <div id = "browse">
                <h1>Just for you</h1>
            </div>
       
        <div className = "recipeCardContainer">
            <Row xs={1} md={4} className="g-4">
                    {data.map((item) => {

                    
                     
                        return(
                        <div className = "recipeCardCont">
                        <Col>
                        <Link id = "cardLink" to = {`/recipe/${item.id}`}>
                        <Card  className = 'recipeCard grow'>
                        
                        
                        
                      
                        <div>
                          
                          <Card.Img id = "cardImg" variant="top" alt="No Image Available" src={item.recipe_body.length === 0 ? altImage : item.recipe_body[0].image_url}/> 

                        
                            <div className = "cardBody"> 
                            
                            <Card.Title><div className = "cardTitle"><h2>{item.title}</h2><p id = "cardUser"> Created by {item.user}</p></div></Card.Title>
                            <Card.Body id = "cardBodyText">
                            {item.recipe_body.length === 0 ? <h4>Check this dish out!</h4> : item.recipe_body[0].dish_components}
                            </Card.Body>
                           
                            </div>
                           
                            </div>
                        
                        
                        </Card>
                        </Link>
                        </Col>
                        </div>
                        
                     
                        )

})}
                </Row>
            </div>
            
            </div>
                  <About/>
        </div>
    
    );}
}

export default RecipeCard;