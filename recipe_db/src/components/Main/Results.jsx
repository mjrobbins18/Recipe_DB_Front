import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { DataContext } from './DataContext';
import { Link } from 'react-router-dom';
import '../../css/Main/Results.css'

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
                        <Card className = "recipeCard" >
                            <Card.Img id = "cardImg" variant="top" src={item.recipe_body[0].image ? item.recipe_body[0].image : item.recipe_body[0].image_url}/>
                            <div className = "cardTitle"> 
                            <Card.Title><p>{item.recipe_body[0].title}</p></Card.Title>
                            <Card.Text id = "cardUser">{item.user.username}</Card.Text>
                            <Card.Body>
                            This is where a breif description of each recipe is going to go. 
                            </Card.Body>
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