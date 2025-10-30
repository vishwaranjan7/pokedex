import { Routes,Route } from "react-router-dom";
import Pokedex from "../Componenet/Pokedex/Pokedex";
// import PokemonDetails from '../Componenet/PokemonDetails/PokemonDetails;
import PokemonDetails from "../Componenet/pokemonDetails/PokemonDetails";

function CustomRoutes(){
    
    return (
        <Routes>
        <Route path="/" element={<Pokedex />}></Route>
        <Route path="/pokemon/:id" element={<PokemonDetails />}></Route>
        </Routes>
    )
}

export default CustomRoutes;