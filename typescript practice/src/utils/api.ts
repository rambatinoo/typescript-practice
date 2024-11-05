import axios from "axios";

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

interface Pokemon {
  name: string;
  id: number;
  abilities: Ability[];
  moves: Move[];
}

export async function getPokemon(name: string): Promise<Pokemon | null> {
  try {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
