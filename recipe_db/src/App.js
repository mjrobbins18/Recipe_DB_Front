import './App.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './components/Main/DataContext';
import Landing from './components/Main/Landing';


function App() {
return (
  <DataContext.Provider>
  <div>
      <Landing/>
  </div>
  </DataContext.Provider>
)
}
export default App;
