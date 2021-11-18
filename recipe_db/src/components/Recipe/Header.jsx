import React, { useContext } from 'react';
import '../../css/Recipe/RecipeCard.css'
import Search from '../Search/Search';
import { HashLink } from 'react-router-hash-link';
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router';
import { DataContext } from '../Main/DataContext';
import salad from '../../images/salad.png'
function Header(props) {
    
    // Context
    const {currentUser, setBackground} = useContext(DataContext)
    
    // history 
    const history = useHistory()
    return (
        <div>
            <div className = "searchhide">
            <Search/>
            </div>
        <div className = "headerContainer">

       
            <div className= "recipeCardHeader">
                <h1>Welcome to What's Cookin'!</h1>
                <h2>Search for recipes to cook today.</h2>
                <ul>
                    <li>Login or Signup to create a recipe</li>
                    <li>User's have an interactive dashboard to see all their stuff: Created recipes, favorites, and more!</li>
                    <li>Weekly meal planner on the way.</li>
                    <li>Restaurant accounts coming soon!</li>
                    <li>Click the icon at the top of the screen to navigate the site.</li>
                </ul>
                <div className = "buttonContainer">
                <div className = "linkbtn">
                <HashLink className = "link " to = {`/recipes/#browse`}>Check Out Some Recipes!</HashLink>
                </div>
                {currentUser ? 
                <Button variant = "success" onClick = {() => {setBackground(`url(${salad})`)
                history.push('/create')}}>New Recipe</Button>
                : null }
                </div>
                
            </div>
            </div>
        </div>
    );
}

export default Header;