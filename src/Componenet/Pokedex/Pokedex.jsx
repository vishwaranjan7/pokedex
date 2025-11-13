import Search from "../Search/Search.jsx";
import "../Pokedex/Pokedex.css";
import PokemonList from '../Pokemon lists/PokemonList.jsx'
import { useState } from "react";
import PokemonDetails from "../pokemonDetails/PokemonDetails.jsx";
function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    < div className="pokedex-wraper">
      <Search  updateSearchTerm={setSearchTerm}/>
      
     {(!searchTerm) ? <PokemonList/>:<PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
    </div>
  );
}

export default Pokedex;
