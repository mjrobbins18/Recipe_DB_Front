import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../Main/DataContext';
function CreateForm(props) {
    // currentuser
    const { currentUser } = useContext(DataContext)


    // Initial formstate
    const initialRecipe = [{
        title: "",
        user: currentUser,
        category: "",
        image: "",
        image_url: "",
        dish_components: "",
    }]
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
    
    
    // State
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('access_token')
        return savedToken || ""
      })
    const [userID, setUserID] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const [inputState, setInputState] = useState(initialRecipe)
    const [inputIngredient, setInputIngredient] = useState(initialIngredients)
    const [inputEquipment, setInputEquipment] = useState(initialEquipment)
    const [inputProcedure, setInputProcedure] = useState(initialProcedure)

    // get user id
    useEffect(() => {
        axios.get(`http://localhost:8000/user/${currentUser}`)
        .then(res => setUserID(res.data.id))
        .catch(console.error)
    }, [])
    console.log(userID)


    // handle submit
    console.log('here', inputIngredient[0].name)
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8000/recipes/',{
            title: inputState.title,
            category: inputState.category,
            user_id: token,
            image_url: inputState.image_url,
            dish_components: inputState.dish_components,
            ingredients: {name: 'hello', quantity: 3, unit_of_measure: 'banana'},
            equipment: inputEquipment,
            procedure: inputProcedure, 
        })
        .then(req => console.log('hello'))
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
      const handleAddIngredient = (event) => {
        event.preventDefault()
        setInputIngredient([...inputIngredient, { quantity: "", unit_of_measure: "" , name: "", recipe: ""}]);
      };
      const handleAddEquipment = (event) => {
        event.preventDefault()
        setInputEquipment([...inputEquipment, { quantity: "", name: "", recipe: ""}]);
      };
      const handleAddProcedure = (event) => {
        event.preventDefault()
        setInputProcedure([...inputProcedure, { step: "", recipe: ""}]);
      };

    // handle file change for image upload
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }


    const onFileUpload = () => {
        setInputState({...inputState, 'image': selectedFile.name})

    }
    console.log(inputIngredient)
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
               placeholder = "Title"
               onChange = { handleChange }/>
        <h1>Category:</h1>
        <select onChange = { handleChange }
                id = "category"
                value = {inputState[0].category}>
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
          
              
                    <div>
                    <h2>Ingredients:</h2>
                    {inputIngredient.map((x, i) => {
                        return (
                            <div>
                                        
                                <input id = "quantity"
                                        value = {x.quantity}
                                        placeholder = "Quantity"
                                        onChange = {e => handleIngredients(e, i)}/>
                                <input id = "unit_of_measure"
                                        value = {x.unit_of_measure}
                                        placeholder = "Unit of Measure"
                                        onChange = {e => handleIngredients(e, i)}/>
                                <input id = "name"
                                        value = {x.name}
                                        placeholder = "Ingredient Name"
                                        onChange = {e => handleIngredients(e, i)}/>
                            
                                <div>
                                {inputIngredient.length !== 1 && <div onClick = {() => handleRemoveIngredient(i)}>Remove</div>}
                                {inputIngredient.length - 1 === i && <button onClick = {handleAddIngredient}>Add</button>}
                                </div>
                            </div>
                                    
                            )})}
                                    
                                    
                    </div> 

           
        
                    <div>
                        <h2>Equipment:</h2>
                        {inputEquipment.map((x, i) => {
                        return (
                        <div>
                            <input id = "quantity"
                                value = {x.quantity}
                                placeholder = "Quantity"
                                onChange = {e => handleEquipment(e, i)}/>
                            <input id = "name"
                                value = {x.name}
                                placeholder = "Equipment Name"
                                onChange = {e => handleEquipment(e, i)}/>
                            <div>
                           
                          
                                {inputEquipment.length !== 1 && <div onClick = {() => handleRemoveEquipment(i)}>Remove</div>}
                                {inputEquipment.length - 1 === i && <button onClick = {handleAddEquipment}>Add</button>}
                            </div>
                        </div>
                        )})}
                        
                    </div> 

            
                
                    <div>
                        <h2>Procedure:</h2>
                        {inputProcedure.map((x, i) => {
                             return (
                                <div>
                                    <input id = "step"
                                    

                                        value = {x.step}
                                        placeholder = "Step"
                                        onChange = {e => handleProcedure(e, i)}/>
                                    <div>
                                    {inputProcedure.length !== 1 && <div onClick = {() => handleRemoveProcedure(i)}>Remove</div>}
                                    {inputProcedure.length - 1 === i && <button onClick = {handleAddProcedure}>Add</button>}
                                    </div>
                               </div>
                             )})}
                            
                    </div> 

                <button type = 'submit'>Submit</button>
           </form>
     </div>
    );
    
}

export default CreateForm;