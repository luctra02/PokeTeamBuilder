import { Schema, model } from "mongoose";

interface Pokemon {
    id: Number;
    name: String;
    image: String;
    types: String[];
    weight: Number;
    height: Number;
    baseStats: BaseStats;
  }

  interface BaseStats{
    attack: Number
    defense: Number
    hp: Number
    speed: Number
    specialattack: Number
    specialdefense: Number
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

const Pokemon = model<Pokemon>("Pokemons", PokemonSchema);

export default Pokemon;

