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
            <b>FireRed & LeafGreen</b> stick to the original 151 Pokémon of Red/Blue/Yellow, despite having introduced two new generations of Pokémon in the meantime, including evolutions of Kanto Pokémon. Said Pokémon (such as Crobat, Pichu) are only obtainable after the <a href="">National Dex</a> is acquired.
          </p>
          <p class="mb-0">
            Pokémon stats can be seen on the <a href="">Gen 1 Pokémon stats</a> page.
          </p>
        </div>
      </v-col>
    </v-row>
    <div class="pokemon-grid">
      <v-col cols="auto" class="text-center" v-for="(pokemon, index) in pokemonList" :key="index">
        <img :src="pokemon.sprite" class="sprite mb-n2" @click="openModalInfo(pokemon)"><br>
        <span style="color: #737373; font-size: 14px">#{{ zero(pokemon.id) }}</span><br>
        <a color="#20b0ee" class="font-weight-bold" @click="openModalInfo(pokemon)">{{ capitalize(pokemon.name) }}</a><br>
        <div class="types">
          <a :class="'type '+pokemon.types[0].type.name">{{ capitalize(pokemon.types[0].type.name) }}</a>
          <span v-if="pokemon.types.length == 2"> · </span>
          <a v-if="pokemon.types.length == 2" :class="'type '+pokemon.types[1].type.name">{{ capitalize(pokemon.types[1].type.name) }}</a>
        </div>
      </v-col>
    </div>
    <PokemonInfoModal
      :isInfo="infoModal.isInfo"
      :pokemonClicked="infoModal.pokemonClicked"
      @printCancel="printCancel()"
    />
  </v-container>
</template>

<script>
import PokemonInfoModal from "../components/PokemonInfoModal.vue";
export default {
  name: 'FireRed',
  components: {
    PokemonInfoModal,
  },
  data: () => ({
    infoModal: {
      isInfo: false,
      pokemonClicked: {}
    },
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
    },
    openModalInfo(pokemon) {
      console.log({pokemon})
      this.infoModal.pokemonClicked = pokemon;
      this.infoModal.isInfo = true;
    },
    closeModal() {
      console.log('fechar')
      this.infoModal.isInfo = false;
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
.container {
  padding: 1.5rem 2rem;
}
.types {
  font-size: 0.84rem;
}
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 0rem 0.5rem;
}
.sprite:hover {
  cursor: pointer;
}
</style>
