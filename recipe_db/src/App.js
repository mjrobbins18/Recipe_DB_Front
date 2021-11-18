import './App.css';
import { useState } from 'react';
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
const [currentUser] = useState(() => {
  const savedUser = localStorage.getItem('username')
  return savedUser || ""  
})
  const [inputState, setInputState] = useState(initialRecipe)
  const [recipeTitle, setRecipeTitle] = useState({title: ""})
  const [showTitleModal, setShowTitleModal] = useState(true)
  const [showInstructionModal, setShowInstructionModal] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [recipeInfo, setRecipeInfo] = useState([])
  const [loading, setLoading] = useState(false)
  const [background, setBackground] = useState(`none`)
  const [backgroundSize, setBackgroundSize] = useState()
  
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
                                  setRecipeInfo,
                                  loading,
                                  setLoading,
                                  background,
                                  setBackground,
                                  backgroundSize,
                                  setBackgroundSize,}}>
  <div>
      <Landing/>
  </div>
  </DataContext.Provider>
)
}
export default App;
