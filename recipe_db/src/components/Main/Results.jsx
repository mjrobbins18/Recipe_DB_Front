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
                        <div >
                        <Col>
                        <Link id = "cardLink" to = {`/recipe/${item.id}`}>
                        <Card className = "recipeCard grow" >
                            <Card.Img id = "cardImg" variant="top" src={item.recipe_body[0].image_url ? item.recipe_body[0].image_url : altImage}/>
                            <div className = "cardBody"> 
                            <div className = "cardTitle"> 
                            <Card.Title><div className = "cardTitle"><h2>{item.title}</h2><p id = "cardUser"> Created by {item.user}</p></div></Card.Title>
                            <Card.Body>
                            {item.recipe_body[0].dish_components ? item.recipe_body[0].dish_components : <h4>Check this dish out!</h4>}
                            </Card.Body>
                            </div>
                            </div>
                        </Card>
                        </Link>
                        </Col>
                        </div>
                    ))}
                </Row>
            </div>
            
        </div>
    );
}

export default Results;

