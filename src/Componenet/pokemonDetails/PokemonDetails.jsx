// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../pokemonDetails/pokemonDetails.css";
// import usePokemonList from "../../hooks/usePokemonList";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-detail-image" src={pokemon.image} />
      <div className="pokemon-detail-name">
        <span>{pokemon.name}</span>{" "}
      </div>
      <div className="pokemon-detail-name">
        height:<span>{pokemon.height}</span>
      </div>
      <div className="pokemon-detail-name">
        {" "}
        weight:<span>{pokemon.weight}</span>{" "}
      </div>
      <div className="pokemon-detail-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
      </div>

      {pokemon.types && pokemon.similerTypePokeomn && (
        <div>
          More {pokemon.types[0]} type pokemon
          <ul>
            {pokemon.similerTypePokeomn.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
