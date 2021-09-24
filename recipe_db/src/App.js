import './App.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './components/Main/DataContext';
import Landing from './components/Main/Landing';


function App() {
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('username')
    return savedUser || ""
  })

return (
  <DataContext.Provider value = {{currentUser}}>
  <div>
      <Landing/>
  </div>
  </DataContext.Provider>
)
}
export default App;
