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
interface Move {
  move: {
    name: string;
    url: string;
  };
}
interface Type {
  type: { name: string };
}
interface Pokemon {
  name: string;
  id: number;
  abilities: Ability[];
  moves: Move[];
  types: Type[];
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  };
}

function App() {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    name: "",
    id: 0,
    abilities: [],
    moves: [],
    types: [],
    sprites: {
      front_default: "",
      front_shiny: "",
      back_default: "",
      back_shiny: "",
    },
  });

  async function fetchPokemon(pokemonNameInput: string) {
    const fetchedPokemon = await getPokemon(pokemonNameInput);

    if (fetchedPokemon) {
      const capitalisedName =
        pokemonNameInput.charAt(0).toUpperCase() + pokemonNameInput.slice(1);
      setPokemonName(capitalisedName);
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
        <div className="parent">
          <div className="name-and-type-container">
            <h1 className="pokemon-name">{pokemonName}</h1>
            <h2 className="pokemon-type">
              Type: {pokemonData.types[0].type.name}
            </h2>
          </div>
          <div className="pictures-container">
            <div className="normal-title">
              <h2>Normal Appearance</h2>
            </div>
            <div className="normal-front">
              <img
                src={pokemonData.sprites.front_default}
                alt={`${pokemonName} front normal`}
              />
            </div>
            <div className="normal-back">
              <img
                src={pokemonData.sprites.back_default}
                alt={`${pokemonName} back normal`}
              />
            </div>
            <div className="shiny-title">
              <h2>Shiny Appearance</h2>
            </div>
            <div className="shiny-front">
              <img
                src={pokemonData.sprites.front_shiny}
                alt={`${pokemonName} front shiny`}
              />
            </div>
            <div className="shiny-back">
              <img
                src={pokemonData.sprites.back_shiny}
                alt={`${pokemonName} back shiny`}
              />
            </div>
          </div>
          <div className="moves-and-abilities-container">
            <div className="moves">
              <h3>Moves</h3>
              <ol>
                {pokemonData.moves.slice(0, 4).map((move, index) => (
                  <li key={index}>{move.move.name}</li>
                ))}
              </ol>
            </div>
            <div className="abilities">
              <h3>Abilities</h3>
              <ol>
                {pokemonData.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="search-container">
            <PokemonSearchForm onSearch={fetchPokemon} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
