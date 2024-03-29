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
            <b>FireRed & LeafGreen</b> stick to the original 151 Pokémon of Red/Blue/Yellow, despite having introduced two new generations of Pokémon in the meantime, including evolutions of Kanto Pokémon. Said Pokémon (such as Crobat, Pichu) are only obtainable after the <a>National Dex</a> is acquired.
          </p>
          <p class="mb-0">
            Pokémon stats can be seen on the <a>Gen 1 Pokémon stats</a> page.
          </p>
        </div>
      </v-col>
    </v-row>
    <div class="pokemon-grid">
      <v-col cols="auto" class="text-center" v-for="(pokemon, index) in pokemonList" :key="index">
        <img :src="pokemon.sprite" class="sprite mb-n2" @click="openModalInfo(pokemon)"><br>
        <span style="color: #737373; font-size: 14px">#{{ zerofy(pokemon.entry) }}</span><br>
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
    <Loader :isLoading="isLoading"></Loader>
  </v-container>
</template>

<script>
import axios from 'axios';
import Loader from "../components/Loader.vue";
import PokemonInfoModal from "../components/PokemonInfoModal.vue";
export default {
  name: 'FireRed',
  components: {
    Loader,
    PokemonInfoModal
  },
  data: () => ({
    isModal: false,
    isLoading: false,
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
    evolution_trigger: [],
  }),
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    capitalize2(string) {
      let words = string.split('-');
      return words.map(word => this.capitalize(word)).join(' ');
    },
    zerofy(value) {
      let zeroes = new Array(4).join("0");
      return (zeroes + value).slice(-3);
    },
    generation(gen) {
      if (gen == 'generation-i') return 1;
      if (gen == 'generation-ii') return 2;
      if (gen == 'generation-iii') return 3;
      if (gen == 'generation-iv') return 4;
      if (gen == 'generation-v') return 5;
      if (gen == 'generation-vi') return 6;
      if (gen == 'generation-vii') return 7;
      if (gen == 'generation-viii') return 8;
      if (gen == 'generation-ix') return 9;
      return 10;
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    async openModalInfo(pokemon) {
      this.isLoading = true;
      await this.fetchPokemon(pokemon.id);
      await this.getMultipliers();
      await this.getEvolutionChain();
      this.isLoading = false;
      this.isModal = true;
    },    
    async fetchPokemon(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      this.pokemon = await response.json();
      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemon.id}`);
      this.moreInfo = await response2.json();
      if (this.pokemon.id != 1) { 
        const idPrev = (this.pokemon.id - 1);
        const responsePrev = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPrev}`);
        this.pokemonPrev = await responsePrev.json();
      }
      if (this.pokemon.id != 151) {
        const idNext = (this.pokemon.id + 1);
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
    async getEvolutionChain() {
      this.evolutionChain = [];
      const response = await fetch(this.moreInfo.evolution_chain.url);
      const chainData = await response.json();

      const depthFirst = (getChildren) => (node) => [node, ...(getChildren (node) || []).flatMap(depthFirst (getChildren))];
      const makePokeList = (pokes) => depthFirst(node => node.evolves_to) (pokes.chain);
      const pokemons = makePokeList(chainData);

      let level = 1;
      this.evolution_trigger = [];
      for await (const [key, poke] of pokemons.entries()) {  
        const response2 = await fetch(poke.species.url.replace('-species', ''));
        const pokemonData = await response2.json();
        const response3 = await fetch(poke.species.url);
        const pokemonSpecies = await response3.json();

        let pid = null;
        if (pokemonSpecies.evolves_from_species) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSpecies.evolves_from_species.name}`);
          const pokemonSpecies2 = await response.json();
          pid = pokemonSpecies2.id;
          if (!(this.evolutionChain[key-1].pid == pid)) level++;
        }

        let type1 = this.capitalize(pokemonData.types[0].type.name);
        let type2 = pokemonData.types[1] ? this.capitalize(pokemonData.types[1].type.name) : '';
        let typesString = '';
        typesString += '<text class="types-text" x="72" y="235">';
        typesString += `<tspan class="${type1}">${type1}</tspan>`;
        if (type2) typesString += '<tspan fill="black"> · </tspan>';
        if (type2) typesString += `<tspan class="${type2}">${type2}</tspan>`;
        typesString += '</text>';

        let pokemon = {
          id: pokemonData.id,
          idF: this.zerofy(pokemonData.id),
          name: this.capitalize(pokemonData.name),
          img: pokemonData.sprites.other['official-artwork'].front_default,
          types: typesString,
          details: poke.evolution_details,
          pid: pid,
          evolves_to: poke.evolves_to,
          evolve_trigger: this.evolution_trigger.length ? this.evolution_trigger[key-1] : '',
          level,
        }
        this.evolutionChain.push(pokemon);

        if (poke.evolves_to.length) poke.evolves_to.forEach(item => {
          let text = '';
          let evolve = item.evolution_details[0];
          if (evolve.trigger.name == 'level-up') {
            if (evolve.min_level) text = `Level ${evolve.min_level}`;
            if (evolve.min_happiness) text = 'high Friendship';
            if (evolve.min_beaty) text = 'max Beauty'
            if (evolve.held_item) text = `hold ${this.capitalize2(evolve.held_item.name)}`
            if (evolve.known_move) text = `after "${this.capitalize2(evolve.known_move.name)}" learned`;
            if (evolve.location) text = `in ${this.capitalize2(evolve.location.name)}`;
            if (evolve.min_affection) { for (let i = 0; i < evolve.min_affection; i++) text += '♥'; text += ' Affection'; }
          }
          if (evolve.trigger.name == 'trade') {
            if (evolve.held_item) text = `Trade holding "${this.capitalize2(evolve.held_item.name)}"`;
            else text = `Trade`;
          }
          if (evolve.trigger.name == 'use-item') {
            text = `Use ${this.capitalize2(evolve.item.name)}`;
          }
          if (evolve.trigger.name == 'shed') {
            text = 'Level 20, empty spot, Pokéball in bag';
          }
          if (evolve.trigger.name == 'spin') {
            text = 'spin around holding Sweet';
          }
          if (evolve.trigger.name == 'tower-of-darkness') {
            text = 'in Tower of Darkness';
          }
          if (evolve.trigger.name == 'tower-of-darkness') {
            text = 'in Tower of Darkness';
          }
          if (evolve.trigger.name == 'tower-of-waters') {
            text = 'in Tower of Water';
          }
          if (evolve.trigger.name == 'three-critical-hits') {
            text = 'achieve 3 critical hits in one battle';
          }
          if (evolve.trigger.name == 'take-damage') {
            text = 'near Dusty Bowl';
          }
          if (evolve.time_of_day) text += `, ${this.capitalize(evolve.time_of_day)}`;
          if (evolve.gender == 1) text += ', Female';
          if (evolve.gender == 2) text += ', Male';
          this.evolution_trigger.push(text);
        });
      }
      console.log(this.evolutionChain);
    },
  },
  async created() {
    await axios.get(`https://api-pokedex-node.glitch.me//pokedex/1`)
      .then(res => this.pokemonList = res.data)
      .catch(err => console.log(err))
    await axios.get(`https://api-pokedex-node.glitch.me//types`)
      .then(res => this.allTypes = res.data)
      .catch(err => console.log(err))
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
