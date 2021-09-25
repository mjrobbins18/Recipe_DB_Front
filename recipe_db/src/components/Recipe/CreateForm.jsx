import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../Main/DataContext';
import axiosInstance from '../../AxiosAPI';
import { useHistory } from 'react-router-dom';
import NextStep from './NextStep';


function CreateForm(props) {
    // currentuser
    const { currentUser } = useContext(DataContext)

    // State
    const [selectedFile, setSelectedFile] = useState(null)
    const [show, setShow] = useState(false)
    // Context
    const {inputState, setInputState} = useContext(DataContext)
    
    // History
    const history = useHistory()

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(currentUser)
        axiosInstance.post('/recipes/create',{
            title: inputState.title,
            category: inputState.category,
            user: currentUser,
            image_url: inputState.image_url,
            dish_components: inputState.dish_components,
            recipe_yield: inputState.recipe_yield,

        })
        .then(res => console.log(res))
        .catch(console.error)

    }

    // handle change
    const handleChange = (event) => {
        setInputState({
            ...inputState, [event.target.id]: event.target.value
        })
    }
 
    // handle file change for image upload
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }


    const onFileUpload = () => {
        setInputState({...inputState, 'image': selectedFile.name})

    }

    // Show Next Steps
    const showNext = () => {
        return(
            inputState.title ? setShow(true): null
        )
        
    }

    return (
        <div>
           
            <form onSubmit = { handleSubmit }>
        <h1>Title:</h1>
        <input id = 'title'
               value = {inputState.title}
               placeholder = "Title"
               onChange = { handleChange }/>
        <h1>Upload Image:</h1>
               <input type = 'file'
                      onChange = { onFileChange }/>
                {selectedFile ? 
            
                <div>
                    <h1>Image Details</h1>
                    <p>{selectedFile.name}</p>
                </div>
            
            :
            
                <div>
                    <p>Choose Image or Enter Image Url</p>
                </div>
            
        }
        <h1>Image URL:</h1>   
        <input id = 'image_url'
               value = {inputState.image_url}
               placeholder = "Image URL"
               onChange = { handleChange }/>
        <h1>Dish Components:</h1>       
        <input id = 'dish_components'
               value = {inputState.dish_components}
               placeholder = "Components"
               onChange = { handleChange }/>
        <h1>Category:</h1>
         <select onChange = { handleChange }
                id = "category"
                value = {inputState.category}>
            <option value = "null">-----</option>
            <option value = "Bread">Bread</option>
            <option value = "Canape">Canape</option>
            <option value = "Cheese">Cheese</option>
            <option value = "Chips">Chips</option>
            <option value = "Core">Core</option>
            <option value = "Oils">Oils</option>
            <option value = "Pasta">Pasta</option>
            <option value = "Preservation">Preservation</option>
            <option value = "Starch">Starch</option>
            <option value = "Vegetable">Vegetable</option>
            <option value = "Technique">Technique</option>
            <option value = "First Course">First Course</option>
            <option value = "Meat">Meat</option>
            <option value = "Miscellaneous">Miscellaneous</option>
            <option value = "Stock">Stock</option>

        </select>
            <h1>Yield:</h1>
            <input id = 'recipe_yield'
               value = {inputState.recipe_yield}
               placeholder = "Yield"
               onChange = { handleChange }/>
            
                <button onClick = { showNext } type = 'submit'>Next Step</button>
           </form>
           {show ? <NextStep/> : null}
     </div>
    );
    
}

export default CreateForm;