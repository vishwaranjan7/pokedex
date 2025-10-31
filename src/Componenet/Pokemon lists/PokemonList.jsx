import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    setLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));

    const respons = await axios.get(pokemonListState.pokedexUrl); //this downloads 20 pokemons

    const pokemonResults = respons.data.results; //we get array of pokemon from the results
    console.log(respons.data);

    setPokemonListState((state) => ({
      ...state,
      nextUrl: respons.data.next,
      prevUrl: respons.data.previous,
    }));

    //iterating over the array of pokemon, and using their url , to create an array  of promisses
    //that will download those 20 pokemons
    const pokemonResultPromiss = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    //passing that promises array to axion.all
    const pokemonData = await axios.all(pokemonResultPromiss); //array of 20 pokemon detailed data

    // console.log(pokemonData);
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

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading...."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.prevUrl,
            })
          }
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() =>
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.nextUrl,
            })
          }
        >
          Next{" "}
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
