<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col class="pa-0">
        <h1 class="mt-2 mb-n1">
          FireRed & LeafGreen Pokédex
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="panel">
          <p>
            <b>FireRed & LeafGreen</b> stick to the original 151 Pokémon of Red/Blue/Yellow, despite having introduced two new generatios of Pokémon in the meantime, including evolutions of Kanto Pokémon. Said Pokémon (such as Crobat, Pichu) are only obtainable after the <a href="">National Dex</a> is acquired.
          </p>
          <p class="mb-0">
            Pokémon stats can be seen on the Gen 1 Pokémon stats page.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="justify-space-between">
      <v-col cols="auto" class="text-center" v-for="(pokemon, index) in pokemonList" :key="index">
        <img :src="pokemon.sprite" class="img-center"><br>
        <span style="color: #737373; font-size: 14px">#{{ zero(pokemon.id) }}</span><br>
        <a color="#20b0ee" class="font-weight-bold">{{ capitalize(pokemon.name) }}</a><br>
        <div class="types">
          <span class="type1">{{ pokemon.types[0].type.name }}</span>
          <span style="font-size: 10px">{{ pokemon.types.length == 2 ? '●' : '' }}</span>
          <span class="type2">{{ pokemon.types.length == 2 ? pokemon.types[1].type.name : '' }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FireRed',
  data: () => ({
    pokedex: [],
    pokemonList: [],
    pokemonObjList: [],
  }),
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    zero(value) {
      var zeroes = new Array(4).join("0");
      return (zeroes + value).slice(-3);
    },
  },
  async mounted() {
    const response = await fetch("https://pokeapi.co/api/v2/pokedex/kanto");
    const pokedexData = await response.json();
    for await (const item of pokedexData.pokemon_entries) {    
      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.entry_number}`)
      const pokemonData = await response2.json();
      let pokemon = {          
        id: item.entry_number,
        name: item.pokemon_species.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.entry_number}.png`,
        types: pokemonData.types
      }
      this.pokemonList.push(pokemon) 
      console.log(pokemon)
    }
  }
};
</script>

<style scoped>
.container {
  padding: 1.5rem 2rem;
}
.types {
  font-size: 14px;
}
.img-center {
  display: inline-block !important;
}
</style>
