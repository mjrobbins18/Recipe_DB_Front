import React from 'react';
import '../../css/Recipe/RecipeCard.css'
import Search from '../Search/Search';
import { HashLink } from 'react-router-hash-link';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
function Header(props) {
    return (
        <div>
            <div>
            <Search/>
            </div>
        <div className = "headerContainer">
        {/* <CloudinaryContext cloudName="duod7q5c4">
  <div>
    <Image publicId="sample" width="50" />
  </div>
  <Image publicId="sample" width="0.5" />
</CloudinaryContext> */}
       
            <div className= "recipeCardHeader">
                <h1>Welcome to What's Cookin'!</h1>
                <h2>Search for recipes to cook today.</h2>
                <ul>
                    <li>Login or Signup to create a recipe</li>
                    <li>User's have an interactive dashboard to see all their stuff: Created recipes, favorites, and more!</li>
                    <li>Weekly meal planner on the way.</li>
                    <li>Restaurant accounts coming soon!</li>
                </ul>
                <HashLink className = "nav-link" to = {`/recipes/#browse`}>Check Out Some Recipes!</HashLink>
            </div>
            </div>
        </div>
    );
}

export default Header;