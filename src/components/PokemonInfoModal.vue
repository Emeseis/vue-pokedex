<template>
  <v-dialog v-model="visible" scrollable width="1220px" content-class="" v-if="Object.keys(pokemon).length > 0">    
    <v-card class="card pa-0">
      <v-card-text class="pt-6">      
        <v-row class="text-center">
          <v-col class="pb-2">
            <h1 class="">
              {{ capitalize(pokemonClicked.name) }}
            </h1>
          </v-col>
        </v-row>
        <v-row class="mx-1">
          <div v-if="pokemonClicked.id != 1">
            <v-icon>mdi-menu-left</v-icon>
            <a href="">#{{ zero(this.pokemonPrev.id) }} {{ capitalize(this.pokemonPrev.name) }}</a>
          </div>
          <v-spacer></v-spacer>
          <div v-if="pokemonClicked.id != 151">
            <a href="">#{{ zero(this.pokemonNext.id) }} {{ capitalize(this.pokemonNext.name) }}</a>
            <v-icon>mdi-menu-right</v-icon>
          </div>
        </v-row>
        <v-row>
          <v-col>
            <div class="panel-blue d-flex justify-space-around">
              <a>Contents</a>
              <a>Info</a>
              <a>Base stats</a>
              <a>Evolution chart</a>
              <a>Pokédex entries</a>
              <a>Moves learned</a>
              <a>Sprites</a>
              <a>Locations</a>
              <a>Language</a>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-img class="img-artwork" style="text-align: center" height="400" width="400" :src="pokemon.sprites.other['official-artwork'].front_default"></v-img>
          </v-col>
          <v-col cols="7">
            <h3 class="ml-4">Pokédex data</h3>
            <v-col cols="8" class="pa-0 mt-2">
              <v-data-table dense hide-default-footer class="">
                <template v-slot:body>
                  <tbody>
                    <tr>
                      <td width="30%">National N°</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Species</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Height</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Abilities</td>
                      <td>{{}}</td>
                    </tr>
                    <tr>
                      <td>Local N°</td>
                      <td>{{}}</td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'InfoModal',
  props: ['value','pokemonClicked'],
  data: () => ({
    pokemon: '',
    pokemonPrev: '',
    pokemonNext: '',
  }),
  computed: {
    visible: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) this.fetchPokemon();
    }
  },
  methods: {
    capitalize(string) {
      if (!string) return;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    zero(value) {
      if (!value) return;
      var zeroes = new Array(4).join("0");
      return (zeroes + value).slice(-3);
    },
    navigateTo(route) {
      this.$router.push({ name: route })
    },
    async fetchPokemon() {
      const id = this.pokemonClicked.id;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      this.pokemon = await response.json();
      if (id != 1) { 
        const idPrev = (this.pokemonClicked.id - 1);
        const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPrev}`) 
        this.pokemonPrev = await response1.json();
      }
      if (id != 151) {
        const idNext = (this.pokemonClicked.id + 1);
        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNext}`);
        this.pokemonNext = await response2.json();
      }      
    },
  },
};
</script>

<style scoped>
  .card {
    padding: 1.5rem 2rem;
  }
  .img-artwork {
    margin: 0 auto;
  }
  .table {
    border: solid 1px blue;
  }
  .panel-blue {
    background-color: #c7eaff;
    padding: 1rem;
    border-radius: 4px;
  }
</style>
