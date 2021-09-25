import './App.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './components/Main/DataContext';
import Landing from './components/Main/Landing';


function App() {

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
return (
  <DataContext.Provider value = {{currentUser, inputState, setInputState}}>
  <div>
      <Landing/>
  </div>
  </DataContext.Provider>
)
}
export default App;
