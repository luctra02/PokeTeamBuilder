import { typeColors } from "../utils/constants";


interface TypeComponentProps {
    pokemonType: string; 
}

// Functional component to represent a colored box for a Pokemon type
function TypeComponent({ pokemonType }: TypeComponentProps) {
    const color = typeColors[pokemonType];

    return (
        // Container section with styling based on the type's color
        <section className="pokeType PokeTypeBox" style={{ backgroundColor: color }}>
            {pokemonType}
        </section>
    );
}

// Exporting the TypeComponent as the default export
export default TypeComponent;