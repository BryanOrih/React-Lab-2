import logo from './pokeball-transparent-png-2.png';
import './App.css';
import React, {useEffect, useState} from 'react'

function App() {
  const [Users, setUsers] = useState([])
  useEffect(()=>{
    const getUsers = async () => {
      let promises = []
      for (let i = 1; i <= 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const jsonData = await response.json();
        promises.push(jsonData)
      }
      setUsers(promises)
      
    };
    return () => {
      console.log("Is this first render?");
      getUsers()
    };
  }, [])

  const User = ({name, type, image}) =>{
    return(
      <li>
          <img className="card-image" src={image}/>
          <h2 className="card-title"> {name}</h2>
          <p className="card-subtitle">Type: {type}</p>
      </li>
    )
    
  }


  return (
    <div className="PokemonDiv">
      <div className='Header'>
        <img src={logo} className='App-logo'/>
        <h1>All First Gen Pokemon</h1>
        <img src={logo} className='App-logo'/>
      </div>
      <div className='pokemonContainer'>
        {Users.map((pokemon, index) => (
          <User  key={index} name={pokemon.name} type={pokemon.types.map((type) => type.type.name).join(', ')} image={pokemon.sprites.front_default}/>
        ))}
      </div>
    </div>
  );
}

export default App;
