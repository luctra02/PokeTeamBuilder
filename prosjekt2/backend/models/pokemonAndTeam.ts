/* eslint no-use-before-define: 2 */  // --> ON
import { Schema, model } from "mongoose";

interface BaseStats{
    attack: number
    defense: number
    hp: number
    speed: number
    specialattack: number
    specialdefense: number
}

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    weight: number;
    height: number;
    baseStats: BaseStats;
}

interface Team{
    teamId: string;
    pokemon: Pokemon[];
}

const BaseStatsSchema = new Schema<BaseStats>({
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    hp: { type: Number, required: true },
    speed: { type: Number, required: true },
    specialattack: { type: Number, required: true },
    specialdefense: { type: Number, required: true },
});

const PokemonSchema = new Schema<Pokemon>({
    id: {type: Number, required: true, unique: true},
    name: { type: String, required: true },
    image: {type: String, required: true },
    types: {type: [String], required: true},
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    baseStats: { type: BaseStatsSchema, require: true },
});

const PokemonSchemaIdNotUnique = new Schema<Pokemon>({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    image: {type: String, required: true },
    types: {type: [String], required: true},
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    baseStats: { type: BaseStatsSchema, require: true },
});

const TeamSchema = new Schema<Team>({
  teamId: {type: String, required: true, unique: true},
  pokemon: {type: [PokemonSchemaIdNotUnique], required: false}
});

const Pokemon = model<Pokemon>("Pokemons", PokemonSchema);
const Team = model<Team>("Teams", TeamSchema);

export {Pokemon, Team};

