<template>
  <v-dialog>

  </v-dialog>
</template>

<script>
export default {
  name: 'InfoModal',
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
    navigateTo(route) {
      this.$router.push({ name: route })
    }
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
    }
  }
};
</script>

<style scoped>
</style>
