import "./App.css";
import { useState } from "react";
import { getPokemon } from "./utils/api";
import PokemonSearchForm from "./components/pokemonSearchForm";

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Pokemon {
  name: string;
  id: number;
  abilities: Ability[];
}

function App() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    name: "",
    id: 0,
    abilities: [],
  });

  async function fetchPokemon(pokemonNameInput: string) {
    const fetchedPokemon = await getPokemon(pokemonNameInput);

    if (fetchedPokemon) {
      setPokemonName(pokemonNameInput);
      setPokemonData(fetchedPokemon);
      console.dir(fetchedPokemon); // TODO: remember to remove this when finished with it
    }
  }

  return (
    <>
      {!pokemonName ? (
        <>
          <h1>Pokemon Information</h1>
          <PokemonSearchForm onSearch={fetchPokemon} />
        </>
      ) : (
        <>
          <h1>{pokemonName}</h1>
          <h3>Abilities:</h3>
          <ol>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ol>
          <PokemonSearchForm onSearch={fetchPokemon} />
        </>
      )}
    </>
  );
}

export default App;
