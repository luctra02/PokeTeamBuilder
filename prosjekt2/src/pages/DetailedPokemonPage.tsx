import DetailsCardComponent from "../components/DetailsCardComponent";
import { useLocation } from "react-router-dom";

function DetailedPokemonPage() {
    const location = useLocation();
    const pokemon = location.state?.pokemon;

  return (
    <>
      <DetailsCardComponent pokemon={pokemon}/>
    </>
  );
}

export default DetailedPokemonPage;