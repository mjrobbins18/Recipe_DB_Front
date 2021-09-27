import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { DataContext } from '../Main/DataContext';
import axiosInstance from '../../AxiosAPI';
import { useHistory } from 'react-router-dom';
import { FloatingLabel } from 'react-bootstrap';


function CreateForm(props) {
    //    Initial State
    const initialIngredients = [{
        quantity: "",
        unit_of_measure: "",
        name: "",
        recipe: "",
    }]
    const initialEquipment = [{
        name: "",
        quantity: "",
        recipe: "",
    }]
    const initialProcedure = [{
        step: "",
        recipe: "",
    }]
    
    // currentuser
    const { currentUser } = useContext(DataContext)

    // State
    const [selectedFile, setSelectedFile] = useState(null)
    const [inputIngredient, setInputIngredient] = useState(initialIngredients)
    const [inputEquipment, setInputEquipment] = useState(initialEquipment)
    const [inputProcedure, setInputProcedure] = useState(initialProcedure)
   
    // Context
    const {inputState, setInputState, recipeTitle, initialRecipe} = useContext(DataContext)
    
    // History
    const history = useHistory()
    // Handle Ingredients, Equipment, Procedure Submit
    const handleBottomSubmit = () => {
        
        inputIngredient.map(list => {
            return(
                axiosInstance.post('/ingredient/create',
                {name: list.name,
                quantity: list.quantity,
                unit_of_measure: list.unit_of_measure,
                recipe: recipeTitle.title})
                .then(res => console.log(res))
                .catch(console.error)
            )
                })
        inputEquipment.map(list => {
            return(
                axiosInstance.post('/equipment/create',
                {name: list.name,
                quantity: list.quantity,
                recipe: recipeTitle.title})
                .then(res => console.log(res))
                .catch(console.error)
            )
                })  
        inputProcedure.map(list => {
            return(
                axiosInstance.post('/procedure/create',
                {step: list.step,
                recipe: recipeTitle.title})
                .then(res => console.log(res))
                .catch(console.error)
            )
                })
        setInputEquipment(initialEquipment)
        setInputIngredient(initialIngredients)
        setInputProcedure(initialProcedure)
        setInputState(initialRecipe)
        history.push('/')
        

    }
    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        handleBottomSubmit()
        axiosInstance.post('/recipes/body/create',{
            title: recipeTitle.title,
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
    const handleIngredients = (event, index) => {
        const { id, value } = event.target;
        const list = [...inputIngredient];
        list[index][id] = value;
        setInputIngredient(list);
        
    }
    const handleEquipment = (event, index) => {
        const { id, value } = event.target;
            const list = [...inputEquipment];
            list[index][id] = value;
            setInputEquipment(list);
    }
    const handleProcedure= (event, index) => {
        const { id, value } = event.target;
        const list = [...inputProcedure];
        list[index][id] = value;
        setInputProcedure(list);
    }
 
    // handle file change for image upload
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }


    const onFileUpload = () => {
        setInputState({...inputState, 'image': selectedFile.name})

    }

    // Remove Button Function
    const handleRemoveIngredient = index => {
        const list = [...inputIngredient];
        list.splice(index, 1);
        setInputIngredient(list);
    };
    const handleRemoveEquipment = index=> {
        const list = [...inputEquipment];
        list.splice(index, 1);
        setInputEquipment(list);
    };
    const handleRemoveProcedure = index => {
        const list = [...inputProcedure];
        list.splice(index, 1);
        setInputProcedure(list);
    };
    // Add Button Function
    const handleAddIngredient = (event) => {
        event.preventDefault()
        setInputIngredient([...inputIngredient, { quantity: "", unit_of_measure: "" , name: "", recipe: inputState.title}]);
    };
    const handleAddEquipment = (event) => {
        event.preventDefault()
        setInputEquipment([...inputEquipment, { quantity: "", name: "", recipe: inputState.title}]);
    };
    const handleAddProcedure = (event) => {
        event.preventDefault()
        setInputProcedure([...inputProcedure, { step: "", recipe: inputState.title}]);
    };


    return (
        <div>
           
            <Form onSubmit = { handleSubmit }>
        <h1>{recipeTitle.title}</h1>
                <Form.Group>
                    <FloatingLabel
                    label = "Image Url"
                    className = "mb-3">
                        <Form.Control
                        id = 'image_url'
                        size = 'lg'
                        value = {inputState.image_url}
                        placeholder = "Image URL"
                        onChange = { handleChange }
                        />
                    </FloatingLabel>

                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                    <FloatingLabel>Upload Image</FloatingLabel>
                    <Form.Control type="file" size ="lg"/>
                </Form.Group>
      
                <Form.Group>
                    <FloatingLabel
                    label = 'Dish Components (if any)'
                    className = "mb-3"
                    >
                        <Form.Control
                        id = 'dish_components'
                        value = {inputState.dish_components}
                        placeholder = "Components"
                        onChange = { handleChange }/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                        <Form.Select onChange = { handleChange }
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
                        </Form.Select>
                </Form.Group>    

                <Form.Group>
                    <FloatingLabel
                        label = "Yield"
                        className = "mb-3"
                        >
                        <Form.Control
                        size = "lg"
                        id = 'recipe_yield'
                        value = {inputState.recipe_yield}
                        placeholder = "Yield"
                        onChange = { handleChange }
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredients:</Form.Label>
                </Form.Group>    
                {inputIngredient.map((x, i) => {
                        return (
                            <div>
                    <Form.Group>
                    <FloatingLabel
                    label = "Qty."
                    className = 'mb-3'
                    >
                        <Form.Control
                        id = "quantity"
                        value = {x.quantity}
                        placeholder = "Quantity"
                        onChange = {e => handleIngredients(e, i)}/>
                    </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                    <FloatingLabel
                    label = "Unit"
                    className = 'mb-3'
                    >
                        <Form.Control
                        id = "unit_of_measure"
                        value = {x.unit_of_measure}
                        placeholder = "Unit of Measure"
                        onChange = {e => handleIngredients(e, i)}/>
                    </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                     <FloatingLabel
                     label = "Name"
                     className = 'mb-3'
                     >
                        <Form.Control
                        id = "name"
                        value = {x.name}
                        placeholder = "Ingredient Name"
                        onChange = {e => handleIngredients(e, i)}/>
                    </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                    {inputIngredient.length !== 1 && <Button variant = "primary" onClick = {() => handleRemoveIngredient(i)}>Remove</Button>}
                    {inputIngredient.length - 1 === i && <Button variant = "primary"  onClick = {handleAddIngredient}>Add</Button>}
                    </Form.Group>
                    </div>
                    )})}
                   <Form.Group>
                       <Form.Label>Equipment:</Form.Label>
                   </Form.Group>
                   {inputEquipment.map((x, i) => {
                        return (
                    <div>
                   <Form.Group>
                       <FloatingLabel
                       label = "Quantity"
                       className = "mb-3"
                        >
                            <Form.Control
                            id = "quantity"
                            value = {x.quantity}
                            placeholder = "Quantity"
                            onChange = {e => handleEquipment(e, i)}
                            />    
                        </FloatingLabel>
                   </Form.Group>
                   <Form.Group>
                       <FloatingLabel
                       label = "Equipment Name"
                       className = "mb-3">
                            <Form.Control
                            id = "name"
                            value = {x.name}
                            placeholder = "Equipment Name"
                            onChange = {e => handleEquipment(e, i)}/>
                        </FloatingLabel>
                   </Form.Group>
                   <Form.Group>
                   {inputEquipment.length !== 1 && <Button variant = 'primary' onClick = {() => handleRemoveEquipment(i)}>Remove</Button>}
                   {inputEquipment.length - 1 === i && <Button variant = 'primary' onClick = {handleAddEquipment}>Add</Button>}
                   </Form.Group>
                   </div>
                )})}
                   <Form.Group>
                       <Form.Label>Procedure:</Form.Label>
                   </Form.Group>
                   {inputProcedure.map((x, i) => {
                             return (
                    <div>
                    <Form.Group>
                            <FloatingLabel
                            label = "Step"
                            classname = "mb-3">
                                <Form.Control
                                id = "step"
                                value = {x.step}
                                placeholder = "Step"
                                onChange = {e => handleProcedure(e, i)}/>
                            </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                    {inputProcedure.length !== 1 && <Button variant = "primary" onClick = {() => handleRemoveProcedure(i)}>Remove</Button>}
                    {inputProcedure.length - 1 === i && <Button variant = "primary"onClick = {handleAddProcedure}>Add</Button>}
                    </Form.Group>
                    </div>
                    )})}      

               <Button variant = "primary" type = "submit">Submit</Button>
           </Form>
           
     </div>
    );
    
}

export default CreateForm;




  //        <input type = 'file'
        //               onChange = { onFileChange }/>
        //         {selectedFile ? 
            
        //         <div>
        //             <h1>Image Details</h1>
        //             <p>{selectedFile.name}</p>
        //         </div>
            
        //     :
            
        //         <div>
        //             <p>Choose Image or Enter Image Url</p>
        //         </div>
            
        // }