import React, { useState } from "react";

interface PokemonSearchFormProps {
  onSearch: (pokemonName: string) => void;
}

const PokemonSearchForm: React.FC<PokemonSearchFormProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a Pokemon's Name
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button type="submit">GO!</button>
    </form>
  );
};

export default PokemonSearchForm;
