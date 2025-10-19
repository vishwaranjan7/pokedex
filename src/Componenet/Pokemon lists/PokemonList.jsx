import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemon() {
    setLoading(true)
    const respons = await axios.get(pokedexUrl); //this downloads 20 pokemons

    const pokemonResults = respons.data.results; //we get array of pokemon from the results
    console.log(respons.data);

    setNextUrl(respons.data.next);
    setPrevUrl(respons.data.previous);

    //iterating over the array of pokemon, and using their url , to create an array  of promisses
    //that will download those 20 pokemons
    const pokemonResultPromiss = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    //passing that promises array to axion.all
    const pokemonData = await axios.all(pokemonResultPromiss); //array of 20 pokemon detailed data

    console.log(pokemonData);
    // now iterate on tha data of each pokemon and exteact id,name, image, type
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    console.log(pokeListResult);

    setPokemonList(pokeListResult);

    setLoading(false);
  }

  useEffect( () => {
    downloadPokemon();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading...."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
        <button disabled={nextUrl==null} onClick={()=>setPokedexUrl(nextUrl)}>Next </button>
      </div>
    </div>
  );
}

export default PokemonList;
