import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { DataContext } from './DataContext';
import { Link } from 'react-router-dom';
import '../../css/Main/Results.css'
import altImage from '../../images/no-food.png'

function Results(props) {
    
    // Context
    const {searchResults} = useContext(DataContext)
    
    return (
        <div className = "resultsContainer">
            <div className = "recipeCardContainer">
            <Row xs={1} md={4} className="g-4">
                    {searchResults.map((item) => (
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
                    ))}
                </Row>
            </div>
            
        </div>
    );
}

export default Results;

