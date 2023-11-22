import {typeColors} from "../utils/constants";
interface TypeComponentProps {
  pokemonType: string;
}

function TypeComponent({ pokemonType }: TypeComponentProps) {
  const color = typeColors[pokemonType];
  return (
    <section className="pokeType PokeTypeBox" style={{ backgroundColor: color }}>
      {pokemonType}
    </section>
  );
}

export default TypeComponent;
