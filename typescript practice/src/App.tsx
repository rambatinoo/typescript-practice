import "./App.css";
import { useState } from "react";
import { getPokemon } from "./utils/api";

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
  const [pokemonNameInput, setPokemonNameInput] = useState<string>("");
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    name: "",
    id: 0,
    abilities: [],
  });

  async function handleClick(e) {
    e.preventDefault();
    const fetchedPokemon = await getPokemon(pokemonNameInput);

    if (fetchedPokemon) {
      setPokemonName(pokemonNameInput);
      setPokemonData(fetchedPokemon);
      console.dir(fetchedPokemon);
    }
    setPokemonNameInput("");
  }

  return (
    <>
      <h1>Pokemon Information</h1>
      <form>
        <label>
          Enter a Pokemon's Name
          <input
            type="text"
            onChange={(e) => setPokemonNameInput(e.target.value)}
          />
        </label>
        <button onClick={handleClick}>GO!</button>
      </form>
      {!pokemonName ? null : (
        <>
          <h1>{pokemonName}</h1>
          <h3>Abilities:</h3>
          <ol>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}

export default App;
