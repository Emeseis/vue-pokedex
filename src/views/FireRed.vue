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
        <span style="color: #737373; font-size: 14px">#{{ zerofy(pokemon.id) }}</span><br>
        <a color="#20b0ee" class="font-weight-bold" @click="openModalInfo(pokemon)">{{ capitalize(pokemon.name) }}</a><br>
        <div class="types">
          <a :class="'type '+pokemon.types[0].type.name">{{ capitalize(pokemon.types[0].type.name) }}</a>
          <span v-if="pokemon.types.length == 2"> · </span>
          <a v-if="pokemon.types.length == 2" :class="'type '+pokemon.types[1].type.name">{{ capitalize(pokemon.types[1].type.name) }}</a>
        </div>
      </v-col>
    </div>
    <PokemonInfoModal
      v-model="isModal"
      :pokemon="pokemon"
      :moreInfo="moreInfo"
      :pokemonPrev="pokemonPrev"
      :pokemonNext="pokemonNext"
      :typeDefenses="typeDefenses"
      :evolutionChain="evolutionChain"
      @changePokemon="openModalInfo"
    />
  </v-container>
</template>

<script>
import axios from 'axios';
import PokemonInfoModal from "../components/PokemonInfoModal.vue";
export default {
  name: 'FireRed',
  components: {
    PokemonInfoModal,
  },
  data: () => ({
    isModal: false,
    pokedex: [],
    pokemonList: [],
    pokemonObjList: [],
    pokemon: {},
    moreInfo: {},
    pokemonPrev: {},
    pokemonNext: {},
    typeDefenses: {},
    evolutionChain: [],
    allTypes: {},
  }),
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    zerofy(value) {
      let zeroes = new Array(4).join("0");
      return (zeroes + value).slice(-3);
    },
    navigateTo(route) {
      this.$router.push({ name: route })
    },
    async openModalInfo(pokemon) {
      await this.fetchPokemon(pokemon.id)
      await this.getMultipliers();
      await this.getEvolutionChain();
      this.isModal = true;
    },    
    async fetchPokemon(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      this.pokemon = await response.json();
      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`);
      this.moreInfo = await response2.json();
      // console.log(this.pokemon, this.moreInfo);
      if (id != 1) { 
        const idPrev = (id - 1);
        const responsePrev = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPrev}`) 
        this.pokemonPrev = await responsePrev.json();
      }
      if (id != 151) {
        const idNext = (id + 1);
        const responseNext = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNext}`);
        this.pokemonNext = await responseNext.json();
      }
    },
    async getMultipliers() { 
      const types = this.pokemon.types.map(type => type.type.name); 
      let multipliers = { defense: {}, attack: {} };

      for await (const type of types) {
        let damage_relations = this.allTypes[type];
        let no_damage_from = damage_relations.defense.zero;
        let half_damage_from = damage_relations.defense.half;
        let double_damage_from = damage_relations.defense.double;

        no_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 0;
          else multipliers.defense[type] = 0;
        });
        half_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 0.5;
          else multipliers.defense[type] = 0.5;
        });
        double_damage_from.forEach((type) => {
          if (Object.prototype.hasOwnProperty.call(multipliers.defense, type)) multipliers.defense[type] = multipliers.defense[type] * 2;
          else multipliers.defense[type] = 2;
        });
      }
      this.typeDefenses = multipliers.defense;
    },
    async getTypes() {
      axios.get(`http://localhost:3000/types`)
        .then(res => this.allTypes = res.data)
        .catch(err => console.log(err))
    },
    async getEvolutionChain() {
      this.evolutionChain = [];
      const response = await fetch(this.moreInfo.evolution_chain.url);
      const chainData = await response.json();

      const depthFirst = (getChildren) => (node) => [node, ...(getChildren (node) || []).flatMap(depthFirst (getChildren))];
      const makePokeList = (pokes) => depthFirst(node => node.evolves_to) (pokes.chain);
      const pokemons = makePokeList(chainData);

      for await (const poke of pokemons) {    
        const response2 = await fetch(poke.species.url.replace('-species', ''))
        const pokemonData = await response2.json();
        let pokemon = {
          id: pokemonData.id,
          name: pokemonData.name,
          sprite: pokemonData.sprites.other['official-artwork'].front_default,
          types: pokemonData.types,
          details: poke.evolution_details,
          evolves: poke.evolves_to
        }
        this.evolutionChain.push(pokemon);
      }
      console.log(this.evolutionChain);
    },
  },
  async mounted() {
    this.getTypes();
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
