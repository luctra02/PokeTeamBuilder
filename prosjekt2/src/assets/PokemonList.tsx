import type { Query } from '@favware/graphql-pokemon';

interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

interface PokemonData {
  num: number;
  sprite: string;
  types: readonly PokemonType[];
  key: string;
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

interface PokemonType {
  name: string;
}


let pokemonList: PokemonData[];

export async function fetchPokemonList(): Promise<PokemonData[]> {
  try {
    const res = await fetch('https://graphqlpokemon.favware.tech/v7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            getAllPokemon(offset: 89, take: 232) {
              num
              sprite
              types {
                name
              }
              key
              weight
              height
              baseStats {
                attack
                defense
                hp
                speed
                specialattack
                specialdefense
              }
            }
          }
        `,
      }),
    });

    const json = await res.json() as GraphQLPokemonResponse<'getAllPokemon'>;
    const pokemonData = json.data.getAllPokemon;

    const uniqueNums = new Set<number>();
    pokemonList = pokemonData
      .filter((pokemon) => {
        if (!uniqueNums.has(pokemon.num)) {
          uniqueNums.add(pokemon.num);
          return true;
        }
        return false;
      })
      .map((pokemon) => pokemon);

    console.log("FETCHER HER: ", pokemonList)
    for (var pokemon of pokemonList) {
      console.log("{num:"+ pokemon.num+ ", sprite: '"+ pokemon.sprite+ "', types: ['"+pokemon.types[0].name+"', '"+ pokemon.types[1]?.name+"'], key: '"+ pokemon.key+"', weight:", pokemon.weight+", height:"+ pokemon.height+", baseStats: ["+pokemon.baseStats.attack+",",pokemon.baseStats.defense+",",pokemon.baseStats.hp+",",pokemon.baseStats.specialattack+",",pokemon.baseStats.specialdefense+",",pokemon.baseStats.speed+"]},")
    }
    return pokemonList;
  } catch (error) {
    console.error('Error fetching or processing Pokemon data:', error);
    throw error;
  }
}

//basestats: attack, defense, hp, specialattack, specialdefense, speed
const pokemonArray = [{num:1, sprite: 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif', types: ['Grass', 'Poison'], key: 'bulbasaur', weight: 6.9, height:0.7, baseStats: [49, 49, 45, 65, 65, 45]},
{num:2, sprite: 'https://play.pokemonshowdown.com/sprites/ani/ivysaur.gif', types: ['Grass', 'Poison'], key: 'ivysaur', weight: 13, height:1, baseStats: [62, 63, 60, 80, 80, 60]},
{num:3, sprite: 'https://play.pokemonshowdown.com/sprites/ani/venusaur.gif', types: ['Grass', 'Poison'], key: 'venusaur', weight: 100, height:2, baseStats: [82, 83, 80, 100, 100, 80]},
{num:4, sprite: 'https://play.pokemonshowdown.com/sprites/ani/charmander.gif', types: ['Fire'], key: 'charmander', weight: 8.5, height:0.6, baseStats: [52, 43, 39, 60, 50, 65]},
{num:5, sprite: 'https://play.pokemonshowdown.com/sprites/ani/charmeleon.gif', types: ['Fire'], key: 'charmeleon', weight: 19, height:1.1, baseStats: [64, 58, 58, 80, 65, 80]},
{num:6, sprite: 'https://play.pokemonshowdown.com/sprites/ani/charizard.gif', types: ['Fire', 'Flying'], key: 'charizard', weight: 90.5, height:1.7, baseStats: [84, 78, 78, 109, 85, 100]},
{num:7, sprite: 'https://play.pokemonshowdown.com/sprites/ani/squirtle.gif', types: ['Water'], key: 'squirtle', weight: 9, height:0.5, baseStats: [48, 65, 44, 50, 64, 43]},
{num:8, sprite: 'https://play.pokemonshowdown.com/sprites/ani/wartortle.gif', types: ['Water'], key: 'wartortle', weight: 22.5, height:1, baseStats: [63, 80, 59, 65, 80, 58]},
{num:9, sprite: 'https://play.pokemonshowdown.com/sprites/ani/blastoise.gif', types: ['Water'], key: 'blastoise', weight: 85.5, height:1.6, baseStats: [83, 100, 79, 85, 105, 78]},
{num:10, sprite: 'https://play.pokemonshowdown.com/sprites/ani/caterpie.gif', types: ['Bug'], key: 'caterpie', weight: 2.9, height:0.3, baseStats: [30, 35, 45, 20, 20, 45]},
{num:11, sprite: 'https://play.pokemonshowdown.com/sprites/ani/metapod.gif', types: ['Bug'], key: 'metapod', weight: 9.9, height:0.7, baseStats: [20, 55, 50, 25, 25, 30]},
{num:12, sprite: 'https://play.pokemonshowdown.com/sprites/ani/butterfree.gif', types: ['Bug', 'Flying'], key: 'butterfree', weight: 32, height:1.1, baseStats: [45, 50, 60, 90, 80, 70]},
{num:13, sprite: 'https://play.pokemonshowdown.com/sprites/ani/weedle.gif', types: ['Bug', 'Poison'], key: 'weedle', weight: 3.2, height:0.3, baseStats: [35, 30, 40, 20, 20, 50]},
{num:14, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kakuna.gif', types: ['Bug', 'Poison'], key: 'kakuna', weight: 10, height:0.6, baseStats: [25, 50, 45, 25, 25, 35]},
{num:15, sprite: 'https://play.pokemonshowdown.com/sprites/ani/beedrill.gif', types: ['Bug', 'Poison'], key: 'beedrill', weight: 29.5, height:1, baseStats: [90, 40, 65, 45, 80, 75]},
{num:16, sprite: 'https://play.pokemonshowdown.com/sprites/ani/pidgey.gif', types: ['Normal', 'Flying'], key: 'pidgey', weight: 1.8, height:0.3, baseStats: [45, 40, 40, 35, 35, 56]},
{num:17, sprite: 'https://play.pokemonshowdown.com/sprites/ani/pidgeotto.gif', types: ['Normal', 'Flying'], key: 'pidgeotto', weight: 30, height:1.1, baseStats: [60, 55, 63, 50, 50, 71]},
{num:18, sprite: 'https://play.pokemonshowdown.com/sprites/ani/pidgeot.gif', types: ['Normal', 'Flying'], key: 'pidgeot', weight: 39.5, height:1.5, baseStats: [80, 75, 83, 70, 70, 101]},
{num:19, sprite: 'https://play.pokemonshowdown.com/sprites/ani/rattata.gif', types: ['Normal'], key: 'rattata', weight: 3.5, height:0.3, baseStats: [56, 35, 30, 25, 35, 72]},
{num:20, sprite: 'https://play.pokemonshowdown.com/sprites/ani/raticate.gif', types: ['Normal'], key: 'raticate', weight: 18.5, height:0.7, baseStats: [81, 60, 55, 50, 70, 97]},
{num:21, sprite: 'https://play.pokemonshowdown.com/sprites/ani/spearow.gif', types: ['Normal', 'Flying'], key: 'spearow', weight: 2, height:0.3, baseStats: [60, 30, 40, 31, 31, 70]},
{num:22, sprite: 'https://play.pokemonshowdown.com/sprites/ani/fearow.gif', types: ['Normal', 'Flying'], key: 'fearow', weight: 38, height:1.2, baseStats: [90, 65, 65, 61, 61, 100]},
{num:23, sprite: 'https://play.pokemonshowdown.com/sprites/ani/ekans.gif', types: ['Poison'], key: 'ekans', weight: 6.9, height:2, baseStats: [60, 44, 35, 40, 54, 55]},
{num:24, sprite: 'https://play.pokemonshowdown.com/sprites/ani/arbok.gif', types: ['Poison'], key: 'arbok', weight: 65, height:3.5, baseStats: [95, 69, 60, 65, 79, 80]},
{num:25, sprite: 'https://play.pokemonshowdown.com/sprites/ani/pikachu.gif', types: ['Electric'], key: 'pikachu', weight: 6, height:0.4, baseStats: [55, 40, 35, 50, 50, 90]},
{num:26, sprite: 'https://play.pokemonshowdown.com/sprites/ani/raichu.gif', types: ['Electric'], key: 'raichu', weight: 30, height:0.8, baseStats: [90, 55, 60, 90, 80, 110]},
{num:27, sprite: 'https://play.pokemonshowdown.com/sprites/ani/sandshrew.gif', types: ['Ground'], key: 'sandshrew', weight: 12, height:0.6, baseStats: [75, 85, 50, 20, 30, 40]},
{num:28, sprite: 'https://play.pokemonshowdown.com/sprites/ani/sandslash.gif', types: ['Ground'], key: 'sandslash', weight: 29.5, height:1, baseStats: [100, 110, 75, 45, 55, 65]},
{num:29, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidoranf.gif', types: ['Poison'], key: 'nidoranf', weight: 7, height:0.4, baseStats: [47, 52, 55, 40, 40, 41]},
{num:30, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidorina.gif', types: ['Poison'], key: 'nidorina', weight: 20, height:0.8, baseStats: [62, 67, 70, 55, 55, 56]},
{num:31, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidoqueen.gif', types: ['Poison', 'Ground'], key: 'nidoqueen', weight: 60, height:1.3, baseStats: [92, 87, 90, 75, 85, 76]},
{num:32, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidoranm.gif', types: ['Poison'], key: 'nidoranm', weight: 9, height:0.5, baseStats: [57, 40, 46, 40, 40, 50]},
{num:33, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidorino.gif', types: ['Poison'], key: 'nidorino', weight: 19.5, height:0.9, baseStats: [72, 57, 61, 55, 55, 65]},
{num:34, sprite: 'https://play.pokemonshowdown.com/sprites/ani/nidoking.gif', types: ['Poison', 'Ground'], key: 'nidoking', weight: 62, height:1.4, baseStats: [102, 77, 81, 85, 75, 85]},
{num:35, sprite: 'https://play.pokemonshowdown.com/sprites/ani/clefairy.gif', types: ['Fairy'], key: 'clefairy', weight: 7.5, height:0.6, baseStats: [45, 48, 70, 60, 65, 35]},
{num:36, sprite: 'https://play.pokemonshowdown.com/sprites/ani/clefable.gif', types: ['Fairy'], key: 'clefable', weight: 40, height:1.3, baseStats: [70, 73, 95, 95, 90, 60]},
{num:37, sprite: 'https://play.pokemonshowdown.com/sprites/ani/vulpix.gif', types: ['Fire'], key: 'vulpix', weight: 9.9, height:0.6, baseStats: [41, 40, 38, 50, 65, 65]},
{num:38, sprite: 'https://play.pokemonshowdown.com/sprites/ani/ninetales.gif', types: ['Fire'], key: 'ninetales', weight: 19.9, height:1.1, baseStats: [76, 75, 73, 81, 100, 100]},
{num:39, sprite: 'https://play.pokemonshowdown.com/sprites/ani/jigglypuff.gif', types: ['Normal', 'Fairy'], key: 'jigglypuff', weight: 5.5, height:0.5, baseStats: [45, 20, 115, 45, 25, 20]},
{num:40, sprite: 'https://play.pokemonshowdown.com/sprites/ani/wigglytuff.gif', types: ['Normal', 'Fairy'], key: 'wigglytuff', weight: 12, height:1, baseStats: [70, 45, 140, 85, 50, 45]},
{num:41, sprite: 'https://play.pokemonshowdown.com/sprites/ani/zubat.gif', types: ['Poison', 'Flying'], key: 'zubat', weight: 7.5, height:0.8, baseStats: [45, 35, 40, 30, 40, 55]},
{num:42, sprite: 'https://play.pokemonshowdown.com/sprites/ani/golbat.gif', types: ['Poison', 'Flying'], key: 'golbat', weight: 55, height:1.6, baseStats: [80, 70, 75, 65, 75, 90]},
{num:43, sprite: 'https://play.pokemonshowdown.com/sprites/ani/oddish.gif', types: ['Grass', 'Poison'], key: 'oddish', weight: 5.4, height:0.5, baseStats: [50, 55, 45, 75, 65, 30]},
{num:44, sprite: 'https://play.pokemonshowdown.com/sprites/ani/gloom.gif', types: ['Grass', 'Poison'], key: 'gloom', weight: 8.6, height:0.8, baseStats: [65, 70, 60, 85, 75, 40]},
{num:45, sprite: 'https://play.pokemonshowdown.com/sprites/ani/vileplume.gif', types: ['Grass', 'Poison'], key: 'vileplume', weight: 18.6, height:1.2, baseStats: [80, 85, 75, 110, 90, 50]},
{num:46, sprite: 'https://play.pokemonshowdown.com/sprites/ani/paras.gif', types: ['Bug', 'Grass'], key: 'paras', weight: 5.4, height:0.3, baseStats: [70, 55, 35, 45, 55, 25]},
{num:47, sprite: 'https://play.pokemonshowdown.com/sprites/ani/parasect.gif', types: ['Bug', 'Grass'], key: 'parasect', weight: 29.5, height:1, baseStats: [95, 80, 60, 60, 80, 30]},
{num:48, sprite: 'https://play.pokemonshowdown.com/sprites/ani/venonat.gif', types: ['Bug', 'Poison'], key: 'venonat', weight: 30, height:1, baseStats: [55, 50, 60, 40, 55, 45]},
{num:49, sprite: 'https://play.pokemonshowdown.com/sprites/ani/venomoth.gif', types: ['Bug', 'Poison'], key: 'venomoth', weight: 12.5, height:1.5, baseStats: [65, 60, 70, 90, 75, 90]},
{num:50, sprite: 'https://play.pokemonshowdown.com/sprites/ani/diglett.gif', types: ['Ground'], key: 'diglett', weight: 0.8, height:0.2, baseStats: [55, 25, 10, 35, 45, 95]},
{num:51, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dugtrio.gif', types: ['Ground'], key: 'dugtrio', weight: 33.3, height:0.7, baseStats: [100, 50, 35, 50, 70, 120]},
{num:52, sprite: 'https://play.pokemonshowdown.com/sprites/ani/meowth.gif', types: ['Normal'], key: 'meowth', weight: 4.2, height:0.4, baseStats: [45, 35, 40, 40, 40, 90]},
{num:53, sprite: 'https://play.pokemonshowdown.com/sprites/ani/persian.gif', types: ['Normal'], key: 'persian', weight: 32, height:1, baseStats: [70, 60, 65, 65, 65, 115]},
{num:54, sprite: 'https://play.pokemonshowdown.com/sprites/ani/psyduck.gif', types: ['Water'], key: 'psyduck', weight: 19.6, height:0.8, baseStats: [52, 48, 50, 65, 50, 55]},
{num:55, sprite: 'https://play.pokemonshowdown.com/sprites/ani/golduck.gif', types: ['Water'], key: 'golduck', weight: 76.6, height:1.7, baseStats: [82, 78, 80, 95, 80, 85]},
{num:56, sprite: 'https://play.pokemonshowdown.com/sprites/ani/mankey.gif', types: ['Fighting'], key: 'mankey', weight: 28, height:0.5, baseStats: [80, 35, 40, 35, 45, 70]},
{num:57, sprite: 'https://play.pokemonshowdown.com/sprites/ani/primeape.gif', types: ['Fighting'], key: 'primeape', weight: 32, height:1, baseStats: [105, 60, 65, 60, 70, 95]},
{num:58, sprite: 'https://play.pokemonshowdown.com/sprites/ani/growlithe.gif', types: ['Fire'], key: 'growlithe', weight: 19, height:0.7, baseStats: [70, 45, 55, 70, 50, 60]},
{num:59, sprite: 'https://play.pokemonshowdown.com/sprites/ani/arcanine.gif', types: ['Fire'], key: 'arcanine', weight: 155, height:1.9, baseStats: [110, 80, 90, 100, 80, 95]},
{num:60, sprite: 'https://play.pokemonshowdown.com/sprites/ani/poliwag.gif', types: ['Water'], key: 'poliwag', weight: 12.4, height:0.6, baseStats: [50, 40, 40, 40, 40, 90]},
{num:61, sprite: 'https://play.pokemonshowdown.com/sprites/ani/poliwhirl.gif', types: ['Water'], key: 'poliwhirl', weight: 20, height:1, baseStats: [65, 65, 65, 50, 50, 90]},
{num:62, sprite: 'https://play.pokemonshowdown.com/sprites/ani/poliwrath.gif', types: ['Water', 'Fighting'], key: 'poliwrath', weight: 54, height:1.3, baseStats: [95, 95, 90, 70, 90, 70]},
{num:63, sprite: 'https://play.pokemonshowdown.com/sprites/ani/abra.gif', types: ['Psychic'], key: 'abra', weight: 19.5, height:0.9, baseStats: [20, 15, 25, 105, 55, 90]},
{num:64, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kadabra.gif', types: ['Psychic'], key: 'kadabra', weight: 56.5, height:1.3, baseStats: [35, 30, 40, 120, 70, 105]},
{num:65, sprite: 'https://play.pokemonshowdown.com/sprites/ani/alakazam.gif', types: ['Psychic'], key: 'alakazam', weight: 48, height:1.5, baseStats: [50, 45, 55, 135, 95, 120]},
{num:66, sprite: 'https://play.pokemonshowdown.com/sprites/ani/machop.gif', types: ['Fighting'], key: 'machop', weight: 19.5, height:0.8, baseStats: [80, 50, 70, 35, 35, 35]},
{num:67, sprite: 'https://play.pokemonshowdown.com/sprites/ani/machoke.gif', types: ['Fighting'], key: 'machoke', weight: 70.5, height:1.5, baseStats: [100, 70, 80, 50, 60, 45]},
{num:68, sprite: 'https://play.pokemonshowdown.com/sprites/ani/machamp.gif', types: ['Fighting'], key: 'machamp', weight: 130, height:1.6, baseStats: [130, 80, 90, 65, 85, 55]},
{num:69, sprite: 'https://play.pokemonshowdown.com/sprites/ani/bellsprout.gif', types: ['Grass', 'Poison'], key: 'bellsprout', weight: 4, height:0.7, baseStats: [75, 35, 50, 70, 30, 40]},
{num:70, sprite: 'https://play.pokemonshowdown.com/sprites/ani/weepinbell.gif', types: ['Grass', 'Poison'], key: 'weepinbell', weight: 6.4, height:1, baseStats: [90, 50, 65, 85, 45, 55]},
{num:71, sprite: 'https://play.pokemonshowdown.com/sprites/ani/victreebel.gif', types: ['Grass', 'Poison'], key: 'victreebel', weight: 15.5, height:1.7, baseStats: [105, 65, 80, 100, 70, 70]},
{num:72, sprite: 'https://play.pokemonshowdown.com/sprites/ani/tentacool.gif', types: ['Water', 'Poison'], key: 'tentacool', weight: 45.5, height:0.9, baseStats: [40, 35, 40, 50, 100, 70]},
{num:73, sprite: 'https://play.pokemonshowdown.com/sprites/ani/tentacruel.gif', types: ['Water', 'Poison'], key: 'tentacruel', weight: 55, height:1.6, baseStats: [70, 65, 80, 80, 120, 100]},
{num:74, sprite: 'https://play.pokemonshowdown.com/sprites/ani/geodude.gif', types: ['Rock', 'Ground'], key: 'geodude', weight: 20, height:0.4, baseStats: [80, 100, 40, 30, 30, 20]},
{num:75, sprite: 'https://play.pokemonshowdown.com/sprites/ani/graveler.gif', types: ['Rock', 'Ground'], key: 'graveler', weight: 105, height:1, baseStats: [95, 115, 55, 45, 45, 35]},
{num:76, sprite: 'https://play.pokemonshowdown.com/sprites/ani/golem.gif', types: ['Rock', 'Ground'], key: 'golem', weight: 300, height:1.4, baseStats: [120, 130, 80, 55, 65, 45]},
{num:77, sprite: 'https://play.pokemonshowdown.com/sprites/ani/ponyta.gif', types: ['Fire'], key: 'ponyta', weight: 30, height:1, baseStats: [85, 55, 50, 65, 65, 90]},
{num:78, sprite: 'https://play.pokemonshowdown.com/sprites/ani/rapidash.gif', types: ['Fire'], key: 'rapidash', weight: 95, height:1.7, baseStats: [100, 70, 65, 80, 80, 105]},
{num:79, sprite: 'https://play.pokemonshowdown.com/sprites/ani/slowpoke.gif', types: ['Water', 'Psychic'], key: 'slowpoke', weight: 36, height:1.2, baseStats: [65, 65, 90, 40, 40, 15]},
{num:80, sprite: 'https://play.pokemonshowdown.com/sprites/ani/slowbro.gif', types: ['Water', 'Psychic'], key: 'slowbro', weight: 78.5, height:1.6, baseStats: [75, 110, 95, 100, 80, 30]},
{num:81, sprite: 'https://play.pokemonshowdown.com/sprites/ani/magnemite.gif', types: ['Electric', 'Steel'], key: 'magnemite', weight: 6, height:0.3, baseStats: [35, 70, 25, 95, 55, 45]},
{num:82, sprite: 'https://play.pokemonshowdown.com/sprites/ani/magneton.gif', types: ['Electric', 'Steel'], key: 'magneton', weight: 60, height:1, baseStats: [60, 95, 50, 120, 70, 70]},
{num:83, sprite: 'https://play.pokemonshowdown.com/sprites/ani/farfetchd.gif', types: ['Normal', 'Flying'], key: 'farfetchd', weight: 15, height:0.8, baseStats: [90, 55, 52, 58, 62, 60]},
{num:84, sprite: 'https://play.pokemonshowdown.com/sprites/ani/doduo.gif', types: ['Normal', 'Flying'], key: 'doduo', weight: 39.2, height:1.4, baseStats: [85, 45, 35, 35, 35, 75]},
{num:85, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dodrio.gif', types: ['Normal', 'Flying'], key: 'dodrio', weight: 85.2, height:1.8, baseStats: [110, 70, 60, 60, 60, 110]},
{num:86, sprite: 'https://play.pokemonshowdown.com/sprites/ani/seel.gif', types: ['Water'], key: 'seel', weight: 90, height:1.1, baseStats: [45, 55, 65, 45, 70, 45]},
{num:87, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dewgong.gif', types: ['Water', 'Ice'], key: 'dewgong', weight: 120, height:1.7, baseStats: [70, 80, 90, 70, 95, 70]},
{num:88, sprite: 'https://play.pokemonshowdown.com/sprites/ani/grimer.gif', types: ['Poison'], key: 'grimer', weight: 30, height:0.9, baseStats: [80, 50, 80, 40, 50, 25]},
{num:89, sprite: 'https://play.pokemonshowdown.com/sprites/ani/muk.gif', types: ['Poison'], key: 'muk', weight: 30, height:1.2, baseStats: [105, 75, 105, 65, 100, 50]},
{num:90, sprite: 'https://play.pokemonshowdown.com/sprites/ani/shellder.gif', types: ['Water'], key: 'shellder', weight: 4, height:0.3, baseStats: [65, 100, 30, 45, 25, 40]},
{num:91, sprite: 'https://play.pokemonshowdown.com/sprites/ani/cloyster.gif', types: ['Water', 'Ice'], key: 'cloyster', weight: 132.5, height:1.5, baseStats: [95, 180, 50, 85, 45, 70]},
{num:92, sprite: 'https://play.pokemonshowdown.com/sprites/ani/gastly.gif', types: ['Ghost', 'Poison'], key: 'gastly', weight: 0.1, height:1.3, baseStats: [35, 30, 30, 100, 35, 80]},
{num:93, sprite: 'https://play.pokemonshowdown.com/sprites/ani/haunter.gif', types: ['Ghost', 'Poison'], key: 'haunter', weight: 0.1, height:1.6, baseStats: [50, 45, 45, 115, 55, 95]},
{num:94, sprite: 'https://play.pokemonshowdown.com/sprites/ani/gengar.gif', types: ['Ghost', 'Poison'], key: 'gengar', weight: 40.5, height:1.5, baseStats: [65, 60, 60, 130, 75, 110]},
{num:95, sprite: 'https://play.pokemonshowdown.com/sprites/ani/onix.gif', types: ['Rock', 'Ground'], key: 'onix', weight: 210, height:8.8, baseStats: [45, 160, 35, 30, 45, 70]},
{num:96, sprite: 'https://play.pokemonshowdown.com/sprites/ani/drowzee.gif', types: ['Psychic'], key: 'drowzee', weight: 32.4, height:1, baseStats: [48, 45, 60, 43, 90, 42]},
{num:97, sprite: 'https://play.pokemonshowdown.com/sprites/ani/hypno.gif', types: ['Psychic'], key: 'hypno', weight: 75.6, height:1.6, baseStats: [73, 70, 85, 73, 115, 67]},
{num:98, sprite: 'https://play.pokemonshowdown.com/sprites/ani/krabby.gif', types: ['Water'], key: 'krabby', weight: 6.5, height:0.4, baseStats: [105, 90, 30, 25, 25, 50]},
{num:99, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kingler.gif', types: ['Water'], key: 'kingler', weight: 60, height:1.3, baseStats: [130, 115, 55, 50, 50, 75]},
{num:100, sprite: 'https://play.pokemonshowdown.com/sprites/ani/voltorb.gif', types: ['Electric'], key: 'voltorb', weight: 10.4, height:0.5, baseStats: [30, 50, 40, 55, 55, 100]},
{num:101, sprite: 'https://play.pokemonshowdown.com/sprites/ani/electrode.gif', types: ['Electric'], key: 'electrode', weight: 66.6, height:1.2, baseStats: [50, 70, 60, 80, 80, 150]},
{num:102, sprite: 'https://play.pokemonshowdown.com/sprites/ani/exeggcute.gif', types: ['Grass', 'Psychic'], key: 'exeggcute', weight: 2.5, height:0.4, baseStats: [40, 80, 60, 60, 45, 40]},
{num:103, sprite: 'https://play.pokemonshowdown.com/sprites/ani/exeggutor.gif', types: ['Grass', 'Psychic'], key: 'exeggutor', weight: 120, height:2, baseStats: [95, 85, 95, 125, 75, 55]},
{num:104, sprite: 'https://play.pokemonshowdown.com/sprites/ani/cubone.gif', types: ['Ground'], key: 'cubone', weight: 6.5, height:0.4, baseStats: [50, 95, 50, 40, 50, 35]},
{num:105, sprite: 'https://play.pokemonshowdown.com/sprites/ani/marowak.gif', types: ['Ground'], key: 'marowak', weight: 45, height:1, baseStats: [80, 110, 60, 50, 80, 45]},
{num:106, sprite: 'https://play.pokemonshowdown.com/sprites/ani/hitmonlee.gif', types: ['Fighting'], key: 'hitmonlee', weight: 49.8, height:1.5, baseStats: [120, 53, 50, 35, 110, 87]},
{num:107, sprite: 'https://play.pokemonshowdown.com/sprites/ani/hitmonchan.gif', types: ['Fighting'], key: 'hitmonchan', weight: 50.2, height:1.4, baseStats: [105, 79, 50, 35, 110, 76]},
{num:108, sprite: 'https://play.pokemonshowdown.com/sprites/ani/lickitung.gif', types: ['Normal'], key: 'lickitung', weight: 65.5, height:1.2, baseStats: [55, 75, 90, 60, 75, 30]},
{num:109, sprite: 'https://play.pokemonshowdown.com/sprites/ani/koffing.gif', types: ['Poison'], key: 'koffing', weight: 1, height:0.6, baseStats: [65, 95, 40, 60, 45, 35]},
{num:110, sprite: 'https://play.pokemonshowdown.com/sprites/ani/weezing.gif', types: ['Poison'], key: 'weezing', weight: 9.5, height:1.2, baseStats: [90, 120, 65, 85, 70, 60]},
{num:111, sprite: 'https://play.pokemonshowdown.com/sprites/ani/rhyhorn.gif', types: ['Ground', 'Rock'], key: 'rhyhorn', weight: 115, height:1, baseStats: [85, 95, 80, 30, 30, 25]},
{num:112, sprite: 'https://play.pokemonshowdown.com/sprites/ani/rhydon.gif', types: ['Ground', 'Rock'], key: 'rhydon', weight: 120, height:1.9, baseStats: [130, 120, 105, 45, 45, 40]},
{num:113, sprite: 'https://play.pokemonshowdown.com/sprites/ani/chansey.gif', types: ['Normal'], key: 'chansey', weight: 34.6, height:1.1, baseStats: [5, 5, 250, 35, 105, 50]},
{num:114, sprite: 'https://play.pokemonshowdown.com/sprites/ani/tangela.gif', types: ['Grass'], key: 'tangela', weight: 35, height:1, baseStats: [55, 115, 65, 100, 40, 60]},
{num:115, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kangaskhan.gif', types: ['Normal'], key: 'kangaskhan', weight: 80, height:2.2, baseStats: [95, 80, 105, 40, 80, 90]},
{num:116, sprite: 'https://play.pokemonshowdown.com/sprites/ani/horsea.gif', types: ['Water'], key: 'horsea', weight: 8, height:0.4, baseStats: [40, 70, 30, 70, 25, 60]},
{num:117, sprite: 'https://play.pokemonshowdown.com/sprites/ani/seadra.gif', types: ['Water'], key: 'seadra', weight: 25, height:1.2, baseStats: [65, 95, 55, 95, 45, 85]},
{num:118, sprite: 'https://play.pokemonshowdown.com/sprites/ani/goldeen.gif', types: ['Water'], key: 'goldeen', weight: 15, height:0.6, baseStats: [67, 60, 45, 35, 50, 63]},
{num:119, sprite: 'https://play.pokemonshowdown.com/sprites/ani/seaking.gif', types: ['Water'], key: 'seaking', weight: 39, height:1.3, baseStats: [92, 65, 80, 65, 80, 68]},
{num:120, sprite: 'https://play.pokemonshowdown.com/sprites/ani/staryu.gif', types: ['Water'], key: 'staryu', weight: 34.5, height:0.8, baseStats: [45, 55, 30, 70, 55, 85]},
{num:121, sprite: 'https://play.pokemonshowdown.com/sprites/ani/starmie.gif', types: ['Water', 'Psychic'], key: 'starmie', weight: 80, height:1.1, baseStats: [75, 85, 60, 100, 85, 115]},
{num:122, sprite: 'https://play.pokemonshowdown.com/sprites/ani/mrmime.gif', types: ['Psychic', 'Fairy'], key: 'mrmime', weight: 54.5, height:1.3, baseStats: [45, 65, 40, 100, 120, 90]},
{num:123, sprite: 'https://play.pokemonshowdown.com/sprites/ani/scyther.gif', types: ['Bug', 'Flying'], key: 'scyther', weight: 56, height:1.5, baseStats: [110, 80, 70, 55, 80, 105]},
{num:124, sprite: 'https://play.pokemonshowdown.com/sprites/ani/jynx.gif', types: ['Ice', 'Psychic'], key: 'jynx', weight: 40.6, height:1.4, baseStats: [50, 35, 65, 115, 95, 95]},
{num:125, sprite: 'https://play.pokemonshowdown.com/sprites/ani/electabuzz.gif', types: ['Electric'], key: 'electabuzz', weight: 30, height:1.1, baseStats: [83, 57, 65, 95, 85, 105]},
{num:126, sprite: 'https://play.pokemonshowdown.com/sprites/ani/magmar.gif', types: ['Fire'], key: 'magmar', weight: 44.5, height:1.3, baseStats: [95, 57, 65, 100, 85, 93]},
{num:127, sprite: 'https://play.pokemonshowdown.com/sprites/ani/pinsir.gif', types: ['Bug'], key: 'pinsir', weight: 55, height:1.5, baseStats: [125, 100, 65, 55, 70, 85]},
{num:128, sprite: 'https://play.pokemonshowdown.com/sprites/ani/tauros.gif', types: ['Normal'], key: 'tauros', weight: 88.4, height:1.4, baseStats: [100, 95, 75, 40, 70, 110]},
{num:129, sprite: 'https://play.pokemonshowdown.com/sprites/ani/magikarp.gif', types: ['Water'], key: 'magikarp', weight: 10, height:0.9, baseStats: [10, 55, 20, 15, 20, 80]},
{num:130, sprite: 'https://play.pokemonshowdown.com/sprites/ani/gyarados.gif', types: ['Water', 'Flying'], key: 'gyarados', weight: 235, height:6.5, baseStats: [125, 79, 95, 60, 100, 81]},
{num:131, sprite: 'https://play.pokemonshowdown.com/sprites/ani/lapras.gif', types: ['Water', 'Ice'], key: 'lapras', weight: 220, height:2.5, baseStats: [85, 80, 130, 85, 95, 60]},
{num:132, sprite: 'https://play.pokemonshowdown.com/sprites/ani/ditto.gif', types: ['Normal'], key: 'ditto', weight: 4, height:0.3, baseStats: [48, 48, 48, 48, 48, 48]},
{num:133, sprite: 'https://play.pokemonshowdown.com/sprites/ani/eevee.gif', types: ['Normal'], key: 'eevee', weight: 6.5, height:0.3, baseStats: [55, 50, 55, 45, 65, 55]},
{num:134, sprite: 'https://play.pokemonshowdown.com/sprites/ani/vaporeon.gif', types: ['Water'], key: 'vaporeon', weight: 29, height:1, baseStats: [65, 60, 130, 110, 95, 65]},
{num:135, sprite: 'https://play.pokemonshowdown.com/sprites/ani/jolteon.gif', types: ['Electric'], key: 'jolteon', weight: 24.5, height:0.8, baseStats: [65, 60, 65, 110, 95, 130]},
{num:136, sprite: 'https://play.pokemonshowdown.com/sprites/ani/flareon.gif', types: ['Fire'], key: 'flareon', weight: 25, height:0.9, baseStats: [130, 60, 65, 95, 110, 65]},
{num:137, sprite: 'https://play.pokemonshowdown.com/sprites/ani/porygon.gif', types: ['Normal'], key: 'porygon', weight: 36.5, height:0.8, baseStats: [60, 70, 65, 85, 75, 40]},
{num:138, sprite: 'https://play.pokemonshowdown.com/sprites/ani/omanyte.gif', types: ['Rock', 'Water'], key: 'omanyte', weight: 7.5, height:0.4, baseStats: [40, 100, 35, 90, 55, 35]},
{num:139, sprite: 'https://play.pokemonshowdown.com/sprites/ani/omastar.gif', types: ['Rock', 'Water'], key: 'omastar', weight: 35, height:1, baseStats: [60, 125, 70, 115, 70, 55]},
{num:140, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kabuto.gif', types: ['Rock', 'Water'], key: 'kabuto', weight: 11.5, height:0.5, baseStats: [80, 90, 30, 55, 45, 55]},
{num:141, sprite: 'https://play.pokemonshowdown.com/sprites/ani/kabutops.gif', types: ['Rock', 'Water'], key: 'kabutops', weight: 40.5, height:1.3, baseStats: [115, 105, 60, 65, 70, 80]},
{num:142, sprite: 'https://play.pokemonshowdown.com/sprites/ani/aerodactyl.gif', types: ['Rock', 'Flying'], key: 'aerodactyl', weight: 59, height:1.8, baseStats: [105, 65, 80, 60, 75, 130]},
{num:143, sprite: 'https://play.pokemonshowdown.com/sprites/ani/snorlax.gif', types: ['Normal'], key: 'snorlax', weight: 460, height:2.1, baseStats: [110, 65, 160, 65, 110, 30]},
{num:144, sprite: 'https://play.pokemonshowdown.com/sprites/ani/articuno.gif', types: ['Ice', 'Flying'], key: 'articuno', weight: 55.4, height:1.7, baseStats: [85, 100, 90, 95, 125, 85]},
{num:145, sprite: 'https://play.pokemonshowdown.com/sprites/ani/zapdos.gif', types: ['Electric', 'Flying'], key: 'zapdos', weight: 52.6, height:1.6, baseStats: [90, 85, 90, 125, 90, 100]},
{num:146, sprite: 'https://play.pokemonshowdown.com/sprites/ani/moltres.gif', types: ['Fire', 'Flying'], key: 'moltres', weight: 60, height:2, baseStats: [100, 90, 90, 125, 85, 90]},
{num:147, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dratini.gif', types: ['Dragon'], key: 'dratini', weight: 3.3, height:1.8, baseStats: [64, 45, 41, 50, 50, 50]},
{num:148, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dragonair.gif', types: ['Dragon'], key: 'dragonair', weight: 16.5, height:4, baseStats: [84, 65, 61, 70, 70, 70]},
{num:149, sprite: 'https://play.pokemonshowdown.com/sprites/ani/dragonite.gif', types: ['Dragon', 'Flying'], key: 'dragonite', weight: 210, height:2.2, baseStats: [134, 95, 91, 100, 100, 80]},
{num:150, sprite: 'https://play.pokemonshowdown.com/sprites/ani/mewtwo.gif', types: ['Psychic'], key: 'mewtwo', weight: 122, height:2, baseStats: [110, 90, 106, 154, 90, 130]},
{num:151, sprite: 'https://play.pokemonshowdown.com/sprites/ani/mew.gif', types: ['Psychic'], key: 'mew', weight: 4, height:0.4, baseStats: [100, 100, 100, 100, 100, 100]},]

export default pokemonArray