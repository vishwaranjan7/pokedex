import Search from "../Search/Search.jsx";
import "../Pokedex/Pokedex.css";
import PokemonList from '../Pokemon lists/PokemonList.jsx'
function Pokedex() {
  return (
    < div className="pokedex-wraper">
      <Search />
      <PokemonList/>
    </div>
  );
}

export default Pokedex;
