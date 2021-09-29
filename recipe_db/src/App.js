import './App.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './components/Main/DataContext';
import Landing from './components/Main/Landing';


function App() {
// Initial State
  const initialRecipe = 
    {
        title: "",
        category: "",
        image: "",
        image_url: "",
        dish_components: "",
        recipe_yield: "",
    }

//State 
const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem('username')
  return savedUser || ""
})
  const [inputState, setInputState] = useState(initialRecipe)
  const [recipeTitle, setRecipeTitle] = useState({title: ""})
  const [showTitleModal, setShowTitleModal] = useState(true)
  const [showInstructionModal, setShowInstructionModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [recipeInfo, setRecipeInfo] = useState([])


  
return (
  <DataContext.Provider value = {{currentUser, 
                                  initialRecipe, 
                                  inputState, 
                                  setInputState, 
                                  recipeTitle, 
                                  setRecipeTitle, 
                                  showTitleModal, 
                                  setShowTitleModal, 
                                  showInstructionModal, 
                                  setShowInstructionModal,
                                  searchResults,
                                  setSearchResults,
                                  recipeInfo,
                                  setRecipeInfo}}>
  <div>
      <Landing/>
  </div>
  </DataContext.Provider>
)
}
export default App;
