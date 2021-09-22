import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([])
  const url = 'http://localhost:8000/recipes/?format=json'

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(res => setData(res[0]))
    .catch(console.error)
  }, [])
  console.log(data)
  if(!data.ingredients) {
    return(
      <h1>Loading</h1>
    )
  }else{
    return (
      <div className="App">
        <h1>{data.title}</h1>
        <h2>Author: {data.author}</h2>
        <img src = {data.image} alt = {data.title}/>
        <h2>Ingredients</h2>
        <ul>
          {data.ingredients.map(item => {
          return (
            <li>
              {item.quantity} {item.unit_of_measure} {item.name}
            </li>
          )
  })}
  </ul>
  <h2>Equipment</h2>
        <ul>
          {data.equipment.map(item => {
          return (
            <li>
              {item.quantity} {item.name}
            </li>
          )
  })}
        </ul>
        <h2>Procedure</h2>
        <ol>
          {data.procedure.map(item => {
          return (
            <li>
              {item.step}
            </li>
          )
  })}
        </ol>
      </div>
    );
  }
  
}

export default App;
