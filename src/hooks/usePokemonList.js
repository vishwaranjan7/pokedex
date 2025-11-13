import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));

    const response = await axios.get(pokemonListState.pokedexUrl); //this downloads 20 pokemons

    const pokemonResults = response.data.results; //we get array of pokemon from the results

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

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

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
