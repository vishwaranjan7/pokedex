import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../pokemonDetails/pokemonDetails.css'
function PokemonDetails() {
    const {id}= useParams();
    console.log(id);
    const [pokemon, setPokemon]=useState({});
    
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data);

        console.log(response);
        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)
        })
    }

    
    useEffect(()=>{
        downloadPokemon();
    },[]);

    return (
        <div className="pokemon-details-wrapper">

            <img className="pokemon-detail-image" src={pokemon.image} />
            <div className="pokemon-detail-name"><span>{pokemon.name}</span> </div>
            <div className="pokemon-detail-name">height:<span>{pokemon.height}</span></div>
             <div className="pokemon-detail-name"> weight:<span>{pokemon.weight}</span> </div>
             <div className="pokemon-detail-types">
                {pokemon.types && pokemon.types.map((t)=><div key={t}> {t} </div> )}
             </div>
           
        </div>
    )
}

export default PokemonDetails;
