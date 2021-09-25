import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import axiosInstance from '../../AxiosAPI';
import { DataContext } from '../Main/DataContext';

function NextStep(props) {
    
    // Initial State
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
    const [inputIngredient, setInputIngredient] = useState(initialIngredients)
    const [inputEquipment, setInputEquipment] = useState(initialEquipment)
    const [inputProcedure, setInputProcedure] = useState(initialProcedure)

    // Context
    const {inputState, setInputState, initialRecipe} = useContext(DataContext)
    
    // History
    const history = useHistory()

    // HandleSubmit
    const handleSubmit = (event) => {
        event.preventDefault()
        inputIngredient.map(list => {
            return(
                axiosInstance.post('/ingredient/create',
                {name: list.name,
                 quantity: list.quantity,
                 unit_of_measure: list.unit_of_measure,
                 recipe: inputState.title})
                 .then(res => console.log(res))
                 .catch(console.error)
            )
                })
        inputEquipment.map(list => {
            return(
                axiosInstance.post('/equipment/create',
                {name: list.name,
                 quantity: list.quantity,
                 recipe: inputState.title})
                 .then(res => console.log(res))
                 .catch(console.error)
            )
                })  
        inputProcedure.map(list => {
            return(
                axiosInstance.post('/procedure/create',
                {step: list.step,
                 recipe: inputState.title})
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
    // Handle Change
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

    return(
        <div>
            <form onSubmit = { handleSubmit }>
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
    )
       
}

export default NextStep;