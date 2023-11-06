import {typeColors} from "../utils/typesAndColors";
interface TypeComponentProps {
  pokemonType: string;
}

function TypeComponent({ pokemonType }: TypeComponentProps) {
  const color = typeColors[pokemonType];
  return (
    <div>
      <div className="pokeType PokeTypeBox" style={{ backgroundColor: color }}>
        {pokemonType}
      </div>
    </div>
  );
}

export default TypeComponent;
