import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PokemonData {
  id: number;
  name:string;
  image: string;
  types: string[];
  weight: number;
  height: number;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    specialattack: number;
    specialdefense: number;
  };
}

const GET_TEAM = gql`
  query GetTeam($teamId: ID) {
    getTeam(teamId: $teamId) {
      pokemon {
        id
        image
        name
        types
        height
        weight
        baseStats {
          attack
          defense
          hp
          specialattack
          specialdefense
          speed
        }
      }
    }
  }`;




function FetchTeam() {
    const navigate = useNavigate();
    const id = localStorage.getItem('teamId');
    const { loading, data } = useQuery(GET_TEAM, {
        variables: { teamId: id }
    });

    if (!loading) {
        const teamList: PokemonData[] = data?.getTeam ? data.getTeam.pokemon : [];
        const teamDataString = JSON.stringify(teamList);
        sessionStorage.setItem('team', teamDataString);
    }
    const team = sessionStorage.getItem('team')
    useEffect(() => {
        navigate('/team')
    }, [team, navigate]);
    
    return (<></>)
}

export { FetchTeam };