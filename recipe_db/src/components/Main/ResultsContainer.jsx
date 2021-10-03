import React from 'react';
import Search from '../Search/Search';
import Results from './Results';

function ResultsContainer(props) {
    return (
        <div >
            <div className = "searchhide">
            <Search/>
            </div>
         
            <br></br>
            <Results/>
        </div>
    );
}

export default ResultsContainer;