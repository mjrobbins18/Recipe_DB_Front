import React, { useContext, useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { DataContext } from '../Main/DataContext';
import RecipeModal from './RecipeModal';
import axiosInstance from '../../AxiosAPI';
import { useHistory } from 'react-router-dom';
import { FloatingLabel, Spinner } from 'react-bootstrap';
import '../../css/Recipe/CreateForm.css'
import S3 from 'react-aws-s3'

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
    
    // Context
    const { currentUser, inputState, setInputState, recipeTitle, setRecipeTitle, initialRecipe, setRecipeInfo, loading, setLoading } = useContext(DataContext)

    // History
    const history = useHistory()

    // State
    // const [selectedFile, setSelectedFile] = useState(null)
    const [inputIngredient, setInputIngredient] = useState(initialIngredients)
    const [inputEquipment, setInputEquipment] = useState(initialEquipment)
    const [inputProcedure, setInputProcedure] = useState(initialProcedure)
    const [showRecipeModal, setShowRecipeModal] = useState(false)
    const [recipe, setRecipe] = useState([])
    
    
    // useEffect
    
    useEffect(() => {
        if(recipeTitle){
            
                axiosInstance.get(`/recipes/title/${recipeTitle.title}`)
                .then(res => setRecipe(res.data[0]))
                .catch(console.error)
             
        }else {
            return null
        }
       
    }, [])
  
    // open Modal
    const handleShowRecipeModal = () => setShowRecipeModal(true) 
    
    // handle file change for image upload
 
    const fileinput = useRef()

    // Handle Ingredients, Equipment, Procedure Submit
    const handleBottomSubmit = () => {
        setLoading(true)
        inputIngredient.map(list => {
            return(
                axiosInstance.post('/ingredient/create',
                {name: list.name,
                quantity: list.quantity,
                unit_of_measure: list.unit_of_measure,
                recipe: recipe.id})
                .then(res => {
                    setLoading(false)
                    console.log(res)})
                .catch(console.error)
            )
                })
        inputEquipment.map(list => {
            return(
                axiosInstance.post('/equipment/create',
                {name: list.name,
                quantity: list.quantity,
                recipe: recipe.id})
                .then(res => {
                    setLoading(false)
                    console.log(res)})
                .catch(console.error)
            )
                })  
        inputProcedure.map(list => {
            return(
                axiosInstance.post('/procedure/create',
                {step: list.step,
                recipe: recipe.id})
                .then(res => {
                    setLoading(false)
                    console.log(res)})
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
            let file = fileinput.current.files[0]
            let newFileName = fileinput.current.files[0].name
            console.log(newFileName)
            console.log(file)
            const config = {
                bucketName: process.env.REACT_APP_BUCKET_NAME,
                region: process.env.REACT_APP_REGION,
                accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
            }
           const ReactS3Client = new S3(config)
           if(file.type === "image/png"  || 
              file.type === "image/jpeg" || 
              file.type === "image/jpg"  || 
              file.type === "image.svg"    ){
            setLoading(true)
            ReactS3Client.uploadFile(file, newFileName).then(data => {
                console.log(data)
                axiosInstance.post('/recipes/body/create',{
                    title: recipe.id,
                    category: inputState.category,
                    user: currentUser,
                    image: newFileName,
                    image_url: inputState.image_url,
                    dish_components: inputState.dish_components,
                    recipe_yield: inputState.recipe_yield,
        
                })
                .then(handleBottomSubmit())
                .then(res => {
                    setLoading(false)
                    
                    console.log(res)})
                .catch(console.error)
                .finally(handleShowRecipeModal())
                setRecipeTitle({title: ""})
            })
           }else{
               alert('file must be an image')
           }
           
            
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

// Cancel Recipe Build
const cancelRecipe = () => {
    axiosInstance.delete(`/recipes/${recipe.id}`)
    .then(() => history.push('/'))
    .finally(setRecipeInfo([]))
    .catch(err => console.log(err))

}
if(loading === true){
    return (
        <div className = "loadDiv"> 
          <span>
            <Spinner animation="border" variant = "primary"/>
          </span>
        </div>
    )
}else {
    return (
        <div className = "recipeFormContainer">

        
        <div className = "recipeForm">
           
            <Form onSubmit = { handleSubmit }>
        
            
                <h1>{recipeTitle.title}</h1>
            
            <Row>        
            <Col xs ="auto">
                    <Form.Group>
                        <FloatingLabel label = "Category">
                            <Form.Select onChange = { handleChange }
                                        id = "category"
                                        value = {inputState.category}
                                        size = 'lg'>
                                <option value = "null"></option>
                                <option value = "Bread">Bread</option>
                                <option value = "Canape">Canape</option>
                                <option value = "Cheese">Cheese</option>
                                <option value = "Chips">Chips</option>
                                <option value = "Core">Core</option>
                                <option value = "Oil">Oil</option>
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
                        value = {inputState.image_url}
                        placeholder = "Image URL"
                        onChange = { handleChange }
                        />
                    </FloatingLabel>

                </Form.Group>
            </Col>
  
            <Col md>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type = 'file' ref = { fileinput } size = 'lg'/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group>
                        <FloatingLabel
                        label = 'Dish Details'
                        className = "mb-3"
                        >
                            <Form.Control
                            id = 'dish_components'
                            value = {inputState.dish_components}
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
                        value = {inputState.recipe_yield}
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
                {inputIngredient.map((x, i) => {
                        return (
                            <div>
                    <Row>
                        <Col xs ={3}>
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
                        <Col xs ={3}>
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
                            {inputIngredient.length !== 1 && <Button variant = "danger" onClick = {() => handleRemoveIngredient(i)}>x</Button>}
                            {inputIngredient.length - 1 === i && <Button variant = "primary"  onClick = {handleAddIngredient}>+</Button>}
                            </Form.Group>
                    </Row>
                    </div>
                    )})}
                    <br></br>
                   <Form.Group>
                       <Form.Label><h5>Equipment:</h5></Form.Label>
                   </Form.Group>
                   {inputEquipment.map((x, i) => {
                        return (
                    <div>
                        <Row>
                            <Col xs ={3}>
                                <Form.Group>
                                    <FloatingLabel
                                    label = "Qty"
                                    className = "mb-3"
                                        >
                                            <Form.Control
                                            required
                                            id = "quantity"
                                            value = {x.quantity}
                                            placeholder = "Qty"
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
                                {inputEquipment.length !== 1 && <Button variant = 'danger' onClick = {() => handleRemoveEquipment(i)}>x</Button>}
                                {inputEquipment.length - 1 === i && <Button variant = 'primary' onClick = {handleAddEquipment}>+</Button>}
                                </Form.Group>
                        </Row>
                   </div>
                )})}
                <br></br>
                   <Form.Group>
                       <Form.Label><h5>Procedure:</h5></Form.Label>
                   </Form.Group>
                   {inputProcedure.map((x, i) => {
                             return (
                    <div>  
                            <Form.Group>
                                    <FloatingLabel
                                    label = "Step"
                                    className = "mb-3">
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
                    {inputProcedure.length !== 1 && <Button variant = "danger" onClick = {() => handleRemoveProcedure(i)}>x</Button>}
                    {inputProcedure.length - 1 === i && <Button variant = "primary"onClick = {handleAddProcedure}>+</Button>}
                    </Form.Group>
                    <br></br>
                        
                    </div>
                    )})}      

               <Button variant = "primary" type = "submit">Submit</Button>
               <Button variant = "danger" onClick = { cancelRecipe }>Cancel</Button>
            </Form>
           <RecipeModal
            id = {recipe.id}
            handleShowRecipeModal = { handleShowRecipeModal } 
            showRecipeModal = { showRecipeModal }
            setShowRecipeModal = { setShowRecipeModal }/>
           
     </div>
     </div>
    );
    
}
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