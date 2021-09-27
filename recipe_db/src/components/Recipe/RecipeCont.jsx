import React from 'react';
import Recipe from './Recipe';

function RecipeCont({ match }) {
    return (
        <div>
            <Recipe
                match = { match }/>
        </div>
    );
}

export default RecipeCont;