import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import '../../css/Recipe/RecipeCard.css'
import Header from './Header';
import { Link } from 'react-router-dom';
import altImage from '../../images/no-food.png'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import About from '../Main/About'
import { DataContext } from '../Main/DataContext';

function RecipeCard(props) {
    
    // State
    const [data, setData] = useState([])

    // Context
    const {loading, setLoading} = useContext(DataContext)

    useEffect(() => {
      setLoading(true)
        axios.get('https://recipe-db-p4.herokuapp.com/api/recipes/view')
        .then(res => {
          setData(res.data)
          setLoading(false)})
        .catch(console.error)
    }, [])
   

    return (
        <div>

            <Header/>
            
            <div className = "browseContainer">

           
            <div id = "browse">
                <h1>Just for you</h1>
            </div>
      

            {loading ?
       <div className = "loadDiv">
       <span>
         <Spinner animation="border" variant = "primary"/>
       </span>
     </div>
       :   
        <div className = "recipeCardContainer">
            <Row xs={1} md={4} className="g-4" id = "recRow">
           {data.map((item) => {

                    
                     
                        return(
                        <div className = "recipeCardCont">
                        <div className = "grow">
                            
                          
                        <Col className ='g-4'>
                        <Link id = "cardLink" to = {`/recipe/${item.id}`}>
                    
                        
                        
                        
                      
                        
                          
                          <Card.Img id = "cardImg" variant="top" alt="No Image Available" src={item.recipe_body.length === 0 ? altImage : item.recipe_body[0].image_url || `https://mrnewbucket.s3.us-east-2.amazonaws.com/${item.recipe_body[0].image}`}/> 

                        
                            <div className = "cardBody"> 
                            
                            <Card.Title><div className = "cardTitle"><h2 id="title">{item.title}</h2><p id = "cardUser"> Created by {item.user}</p></div></Card.Title>
                            <Card.Body id = "cardBodyText">
                            {item.recipe_body.length === 0 ? <h4>Check this dish out!</h4> : item.recipe_body[0].dish_components}
                            </Card.Body>
                           
                            </div>
                           
                            
                        
                        
                       
                        </Link>
                        </Col>
                        </div>
                        </div>
                        
                     
                        )

})}
                </Row>
            </div>
}        
            </div>
                  <About/>
        </div>
    
    );
}

export default RecipeCard;