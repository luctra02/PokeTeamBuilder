import { ApolloServer } from "@apollo/server";
import { expect, assert,it, beforeAll, afterAll, describe } from "vitest";
import { typeDefs } from "../typeDefs.js";
import { resolvers } from "../resolvers.js";
import mongoose from 'mongoose';
import {GET_TYPES, GET_POKEMONS, GET_TEAM, CHECK_POKEMON_IN_TEAM} from "../../../frontend/src/graphql/queries.js"
import {CREATE_TEAM, DELETE_FROM_TEAM} from "../../../frontend/src/graphql/mutations.js"

const testServer = new ApolloServer({
    typeDefs,
    resolvers,
});
const teamID = "TEST_ID";

beforeAll(async () => {
    await mongoose.connect('mongodb://it2810-28.idi.ntnu.no:27017/PokeTeamBuilderTest');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Test get types", () => {
    it('returns correct types with the provided name', async () => {
    const response = await testServer.executeOperation({
        query: GET_TYPES,
        variables: { search: "arti" },
    });
    

    
    assert(response.body.kind === 'single');
    const result = response.body.singleResult.data

    expect(result.getTypes.types[0]).toBe("Ice")
    expect(result.getTypes.types[1]).toBe("Flying")
    });

    it('returns all types', async () => {

    const response = await testServer.executeOperation({
        query: GET_TYPES,
        variables: { search: "" },
    });
    

    
    assert(response.body.kind === 'single');
    const result = response.body.singleResult.data

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(result.getTypes.types).toMatchObject(["Grass","Poison","Fire","Water","Flying","Bug","Normal","Electric","Ground","Fairy","Fighting","Psychic","Rock","Steel","Ice","Ghost","Dragon","Dark"])
    });
});

describe("Test get pokemons", () => {
    it('returns correct pokemons with the provided name', async () => {
    const response = await testServer.executeOperation({
        query: GET_POKEMONS,
        variables: { limit:16, offset:0, search: "articuno" },
    });
    

    assert(response.body.kind === 'single');
    const result = response.body.singleResult.data
    expect(result.getPokemons.count).toEqual(1);
    expect(result.getPokemons.pokemons).toHaveLength(1);
    expect(result.getPokemons.pokemons).toMatchObject([
        {
          "baseStats": {
            "attack": 85,
            "defense": 100,
            "hp": 90,
            "specialattack": 95,
            "specialdefense": 125,
            "speed": 85
          },
          "height": 1.7,
          "id": 144,
          "image": "https://play.pokemonshowdown.com/sprites/ani/articuno.gif",
          "name": "articuno",
          "types": [
            "Ice",
            "Flying"
          ],
          "weight": 55.4
        }
      ])
    });


    it('check if filter works', async () => {
        const response = await testServer.executeOperation({
            query: GET_POKEMONS,
            variables: { limit:16, offset:0, search: "st", type: "Ground" },
        });
        
    
        assert(response.body.kind === 'single');
        const result = response.body.singleResult.data
        expect(result.getPokemons.count).toEqual(4);
        expect(result.getPokemons.pokemons).toHaveLength(4);
        expect(result.getPokemons.pokemons[0].name).toBe("steelix")
        expect(result.getPokemons.pokemons[1].name).toBe("gastrodon")
        expect(result.getPokemons.pokemons[2].name).toBe("stunfisk")
        });
    
        it('check if sort ascending on ID works', async () => {
            const response = await testServer.executeOperation({
                query: GET_POKEMONS,
                variables: { limit:16, offset:0, sort: "id", sortOrder: "asc" },
            });
            
        
            assert(response.body.kind === 'single');
            const result = response.body.singleResult.data
            expect(result.getPokemons.count).toEqual(896);
            expect(result.getPokemons.pokemons).toHaveLength(16);
            expect(result.getPokemons.pokemons[0].id).toEqual(1)
            expect(result.getPokemons.pokemons[1].id).toEqual(2)
            expect(result.getPokemons.pokemons[2].id).toEqual(3)
            });
        
        it('check if sort descending on height works', async () => {
            const response = await testServer.executeOperation({
                query: GET_POKEMONS,
                variables: { limit:16, offset:0, sort: "height", sortOrder: "desc" },
            });
            
        
            assert(response.body.kind === 'single');
            const result = response.body.singleResult.data
            expect(result.getPokemons.count).toEqual(896);
            expect(result.getPokemons.pokemons).toHaveLength(16);
            expect(result.getPokemons.pokemons[0].height).toEqual(20)
            expect(result.getPokemons.pokemons[1].height).toEqual(14.5)
            expect(result.getPokemons.pokemons[2].height).toEqual(9.2)
            });
    
});




describe("Test add pokemon to team", () => {
    it('Add Articuno to team', async () => {
    const mutate = await testServer.executeOperation({
        query: CREATE_TEAM,
        variables: { "teamInput": {
                        "pokemon": [
                        {
                            "baseStats": {
                                "attack": 85,
                                "defense": 100,
                                "hp": 90,
                                "specialattack": 95,
                                "specialdefense": 125,
                                "speed": 85
                            },
                            "height": 1.7,
                            "id": 144,
                            "image": "https://play.pokemonshowdown.com/sprites/ani/articuno.gif",
                            "name": "articuno",
                            "types": [
                                "Ice",
                                "Flying"
                            ],
                            "weight": 55.4
                        }
                        ],
                        "teamId": teamID
                    }},
        }); 
        expect(mutate.body.kind).toBe("single")
    });

    it('Check if pokemon got added to the team', async () => {
        const response = await testServer.executeOperation({
            query: GET_TEAM,
            variables: {teamId: teamID},
            }); 

        assert(response.body.kind === 'single');
        const result = response.body.singleResult.data
        expect(result.getTeam.pokemon).toHaveLength(6);
        expect(result.getTeam.pokemon[5].name).toBe("articuno")
    
        });
        
    });

    describe("Test remove pokemon from team", () => {
        it('Check if pokemon is still in the team', async () => {
            const response = await testServer.executeOperation({
                query: CHECK_POKEMON_IN_TEAM,
                variables: {teamId: teamID, name: "articuno"},
                }); 
    
            assert(response.body.kind === 'single');
            const result = response.body.singleResult.data
            expect(result.checkPokemonInTeam).toBeTruthy()
            
        
            });
        it('Check if pokemon in team', async () => {
        const mutate = await testServer.executeOperation({
            query: DELETE_FROM_TEAM,
            variables: {teamId: teamID, name: "articuno"},
            }); 
            expect(mutate.body.kind).toBe("single")
        });
    
        it('Check if pokemon got removed from team', async () => {
            const response = await testServer.executeOperation({
                query: CHECK_POKEMON_IN_TEAM,
                variables: {teamId: teamID, name: "articuno"},
                }); 
    
            assert(response.body.kind === 'single');
            const result = response.body.singleResult.data
            expect(result.checkPokemonInTeam).toBeFalsy()
            });
            
        });
    
        




