import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

function Update({ match }) {
    // recipe id
    const recipeID = match.params.id

   
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
    const { currentUser, recipeInfo, setRecipeInfo } = useContext(DataContext)

    // State
    const [selectedFile, setSelectedFile] = useState(null)
    const [inputIngredient, setInputIngredient] = useState(initialIngredients)
    const [inputEquipment, setInputEquipment] = useState(initialEquipment)
    const [inputProcedure, setInputProcedure] = useState(initialProcedure)
    const [showRecipeModal, setShowRecipeModal] = useState(false)
    
   
    // Context
    const {inputState, setInputState, recipeTitle, setRecipeTitle, initialRecipe} = useContext(DataContext)
    
    // open Modal
    const handleShowRecipeModal = () => setShowRecipeModal(true) 
    
     // useeffect
     useEffect(() => {
        axiosInstance.get(`/recipes/${recipeID}`)
        .then(res => {
            setRecipeInfo(res.data)
            })
        .then(() => setInputIngredient(recipeInfo.ingredients))
        .catch(console.error)
    }, [])
   
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
        

    }

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
            
            axiosInstance.post('/recipes/body/create',{
                title: recipeTitle.title,
                category: inputState.category,
                user: currentUser,
                image_url: inputState.image_url,
                dish_components: inputState.dish_components,
                recipe_yield: inputState.recipe_yield,
    
            })
            .then(handleBottomSubmit())
            .then(res => console.log(res))
            .catch(console.error)
            .finally(handleShowRecipeModal())
            setRecipeTitle({title: ""})
       
    }

    // handle change
    const handleChange = (event) => {
        setInputState({
            ...inputState, [event.target.id]: event.target.value
            
        })
        console.log(inputState)
    }
    const handleIngredients = (event, index) => {
        const { id, value } = event.target;
        const list = [...recipeInfo.ingredients];
        list[index][id] = value;
        setInputIngredient(list);
        console.log(inputIngredient)
    }
    const handleEquipment = (event, index) => {
        const { id, value } = event.target;
            const list = [...recipeInfo.equipment];
            list[index][id] = value;
            setInputEquipment(list);
    }
    const handleProcedure= (event, index) => {
        const { id, value } = event.target;
        const list = [...recipeInfo.procedure];
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
        setRecipeInfo([recipeInfo.ingredients, { quantity: "", unit_of_measure: "" , name: "", recipe: recipeInfo.title}]);
    };
    const handleAddEquipment = (event) => {
        event.preventDefault()
        setInputEquipment([...inputEquipment, { quantity: "", name: "", recipe: inputState.title}]);
    };
    const handleAddProcedure = (event) => {
        event.preventDefault()
        setRecipeInfo([recipeInfo.procedure, { step: "", recipe: recipeInfo.title}]);
    };

console.log(recipeInfo)
console.log(inputState)
console.log(inputIngredient)
console.log(inputProcedure)
console.log(inputEquipment)
if(!recipeInfo.recipe_body){
    return (
        <div className = "loadDiv"> 
          <span>
            <Spinner animation="border" variant = "primary"/>
          </span>
        </div>
    )
}else {


    return (
        <div>
            <div className = "recipeFormContainer">

        
<div className = "recipeForm">
   
    <Form onSubmit = { handleSubmit }>

        <Form.Group>
            <FloatingLabel label = "Title">
                <Form.Control
                    placeholder = "Title"
                    id = "title"
                    value = {recipeInfo.title}
                    onChange = { handleChange }/>
            </FloatingLabel>
        </Form.Group>
        <br></br>
    <Row>        
    <Col xs ="auto">
            <Form.Group>
                <FloatingLabel label = "Category">
                    <Form.Select onChange = { handleChange }
                                id = "category"
                                value = {recipeInfo.recipe_body[0].category}
                                size = 'lg'>
                        <option value = "null"></option>
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
                </FloatingLabel>
            </Form.Group>
            <br></br>
    </Col>
</Row>
<Row>
    <Col md>
        <Form.Group id = "image_url">
            <FloatingLabel
            label = "Image Url"
            className = "mb-3">
                <Form.Control
                id = 'image_url'
                value = {recipeInfo.recipe_body[0].image_url}
                placeholder = "Image URL"
                onChange = { handleChange }
                />
            </FloatingLabel>

        </Form.Group>
    </Col>
    Or:
    <Col md>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" size ="lg"/>
        </Form.Group>
    </Col>
</Row>
<Row>
    <Col>
        <Form.Group>
                <FloatingLabel
                label = 'Dish Components (if any)'
                className = "mb-3"
                >
                    <Form.Control
                    id = 'dish_components'
                    value = {recipeInfo.recipe_body[0].dish_components}
                    placeholder = "Components"
                    onChange = { handleChange }/>
                </FloatingLabel>
            </Form.Group>
    </Col>
        
    <Col>
        <Form.Group>
            <FloatingLabel
                label = "Yield"
                className = "mb-3"
                >
                <Form.Control
                size = "lg"
                id = 'recipe_yield'
                value = {recipeInfo.recipe_body[0].recipe_yield}
                placeholder = "Yield"
                onChange = { handleChange }
                />
            </FloatingLabel>
        </Form.Group>
       
    </Col>
</Row>
        <Form.Group>
            <Form.Label><h5>Ingredients:</h5></Form.Label>
        </Form.Group>
        {recipeInfo.ingredients.map((x, i) => {
                return (
                    <div>
            <Row>
                <Col xs ="auto">
                    <Form.Group>
                    <FloatingLabel
                    label = "Qty."
                    className = 'mb-3'
                    >
                        <Form.Control
                        required
                        id = "quantity"
                        value = {x.quantity}
                        placeholder = "Quantity"
                        type = "number"
                        onChange = {e => handleIngredients(e, i)}/>
                    </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs ="auto">
                    <Form.Group>
                    <FloatingLabel
                    label = "Unit"
                    className = 'mb-3'
                    >
                        <Form.Control
                        required
                        id = "unit_of_measure"
                        value = {x.unit_of_measure}
                        placeholder = "Unit of Measure"
                        onChange = {e => handleIngredients(e, i)}/>

                    </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                    <FloatingLabel
                    label = "Name"
                    className = 'mb-3'
                    >
                        <Form.Control
                        required
                        id = "name"
                        value = {x.name}
                        placeholder = "Ingredient Name"
                        onChange = {e => handleIngredients(e, i)}/>
                    </FloatingLabel>
                    </Form.Group>
                </Col>
                    <Form.Group>
                    {x.length !== 1 && <Button variant = "danger" onClick = {() => handleRemoveIngredient(i)}>x</Button>}
                    {recipeInfo.ingredients.length - 1 === i && <Button variant = "primary"  onClick = {handleAddIngredient}>+</Button>}
                    </Form.Group>
            </Row>
            </div>
            )})}
            <br></br>
           <Form.Group>
               <Form.Label><h5>Equipment:</h5></Form.Label>
           </Form.Group>
           {recipeInfo.equipment.map((x, i) => {
                return (
            <div>
                <Row>
                    <Col xs ="auto">
                        <Form.Group>
                            <FloatingLabel
                            label = "Quantity"
                            className = "mb-3"
                                >
                                    <Form.Control
                                    required
                                    id = "quantity"
                                    value = {x.quantity}
                                    placeholder = "Quantity"
                                    type = "number"
                                    onChange = {e => handleEquipment(e, i)}
                                    />
                                </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                            label = "Equipment Name"
                            className = "mb-3">
                                    <Form.Control
                                    required
                                    id = "name"
                                    value = {x.name}
                                    placeholder = "Equipment Name"
                                    onChange = {e => handleEquipment(e, i)}/>
                                </FloatingLabel>
                        
                        </Form.Group>
                    </Col>        
                        <Form.Group>
                        {recipeInfo.equipment.length !== 1 && <Button variant = 'danger' onClick = {() => handleRemoveEquipment(i)}>x</Button>}
                        {recipeInfo.equipment.length - 1 === i && <Button variant = 'primary' onClick = {handleAddEquipment}>+</Button>}
                        </Form.Group>
                </Row>
           </div>
        )})}
        <br></br>
           <Form.Group>
               <Form.Label><h5>Procedure:</h5></Form.Label>
           </Form.Group>
           {recipeInfo.procedure.map((x, i) => {
                     return (
            <div>  
                    <Form.Group>
                            <FloatingLabel
                            label = "Step"
                            classname = "mb-3">
                                <Form.Control
                                required
                                id = "step"
                                value = {x.step}
                                placeholder = "Step"
                                onChange = {e => handleProcedure(e, i)}/>
                            </FloatingLabel>
                    </Form.Group>
                    <br></br>
            <Form.Group>
            {recipeInfo.procedure.length !== 1 && <Button variant = "danger" onClick = {() => handleRemoveProcedure(i)}>x</Button>}
            {recipeInfo.procedure.length - 1 === i && <Button variant = "primary"onClick = {handleAddProcedure}>+</Button>}
            </Form.Group>
            <br></br>
                
            </div>
            )})}      

       <Button variant = "primary" type = "submit">Update</Button>
   </Form>
   
</div>
</div>
        </div>
    );
}
}

export default Update;