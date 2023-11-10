import { gql } from "@apollo/client";


export const CREATE_TEAM = gql`
mutation CreateTeam($teamInput: TeamInput) {
  createTeam(teamInput: $teamInput)
}
`;

export const DELETE_FROM_TEAM = gql`
mutation deletePokemon($name: String!, $teamId: ID!) {
  deletePokemonFromTeam(name: $name, teamId: $teamId)
}
`;