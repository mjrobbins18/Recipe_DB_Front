import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import '../../css/Recipe/RecipeCard.css'
import Header from './Header';
import axiosInstance from '../../AxiosAPI';
import { Link } from 'react-router-dom';


function RecipeCard(props) {
    
    // State
    const [data, setData] = useState([])

    useEffect(() => {
        axiosInstance.get('/recipes/view')
        .then(res => setData(res.data))
        .catch(console.error)
    }, [])
console.log(data)
    
    
    
    return (
        <div>

            <Header/>
            
            <div className = "browseContainer">

           
            <div id = "browse">
                <h1>Just for you</h1>
            </div>
        <div className = "recipeCardContainer">
            <Row xs={1} md={4} className="g-4">
                    {data.map((item) => (
                        <div >
                        <Col>
                        <Link id = "cardLink" to = {`/recipe/${item.id}`}>
                        <Card className = "recipeCard" >
                            {item.recipe_body[0].image | item.recipe_body[0].image ?
                            <Card.Img id = "cardImg" variant="top" src={item.recipe_body[0].image ? item.recipe_body[0].image : item.recipe_body[0].image_url}/> 
                            :null}
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
        </div>
      
    );
}

export default RecipeCard;