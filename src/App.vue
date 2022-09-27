<template>
  <v-app>
    <div class="header">
      <v-img src="https://img.pokemondb.net/design/header-lg.png" @click="navigateTo('Home')" class="banner" width="1140px" height="100px"></v-img>   
    </div>    
    <div class="app-div mb-2">         
      <div class="ma-3 mb-8">
        <v-toolbar dark dense rounded floating class="app-toolbar elevation-0 d-flex">
          <v-btn text large class="no-uppercase-btn px-lg-10">
            <v-icon left size="25px" color="#a3a3a3">mdi-pokeball</v-icon>
            Pokémon data
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10">
            <v-icon left size="25px" color="#a3a3a3">mdi-cog</v-icon> 
            Game mechanics
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10">
            <v-icon left size="25px" color="#a3a3a3">mdi-controller-classic</v-icon>
            Pokémon games
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10">
            <v-icon left size="25px" color="#a3a3a3">mdi-message-processing</v-icon>
            Community/Other
          </v-btn>
          <div id="search-field">
            <v-text-field
              append-icon="mdi-magnify"
              placeholder="Search"
              color="#a3a3a3"
              class="ml-2"
              dense
              solo
            ></v-text-field>
          </div>
        </v-toolbar>
      </div>
      <v-main>      
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    pokemonList: {}
  }),
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route })
    }
  },
  mounted() {
    fetch("https://pokeapi.co/api/v2/pokedex/kanto")
      .then(res => { if (res.ok) return res.json() })
      .then(res => { this.pokemonList = res.pokemon_entries });
  }
};
</script>

<style>
  @import url('https://code.cdn.mozilla.net/fonts/fira.css');
  #search-field {
    margin-bottom: -25px;
  }
  #search-field .v-text-field .v-input__control .v-input__slot {
    min-height: auto;
    height: 30px;
    width: 224px;
    background: #737373;
  }  
  .v-application {
    font-family: "Fira Sans";
  }
  a {
    color: #2769be;
    text-decoration: none;
    transition: color .2s,background-color .2s;
  }
  a:hover{
    color: #a42121 !important;
    text-decoration: underline;
    outline: 0;
  }
  h1, h2, h3 {
    color: black; 
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 550;
  }
  h2 {
    font-size: 2rem;  
    font-weight: 600;
    line-height: 2.4rem;
    transition: color .2s;
  }
  h3 {
    font-size: 1.5rem;  
    font-weight: 600;
  }
  hr {
    height: 1px;
    margin: 2rem auto;
    background: #dbdbdb;
    border: 0;
    clear: both;
  }
  blockquote {
    padding: 0 8px;
    border-left: 3px solid #6fad57;
    color: #484848;
    font-style: italic;
    margin: 0 0 1rem 2rem;
  }
  .v-toolbar__content {
    padding: 0 2px;
  }
</style>

<style scoped>  
  #app {    
    background: transparent;
    background-image: repeating-linear-gradient(-45deg, #6a6a6a 0, #6a6a6a 2px, #727272 2px, #727272 11px);
  }
  .v-main {
    margin: 0 12px 12px 12px;
    border-radius: 4px;
    background: rgba(255,255,255);
  } 
  .header {
    height: 124px;
    background-color: #202020;
    background-image: linear-gradient(#3b3b3b, #202020);
    margin-bottom: -36px;
  }
  .banner {
    margin: 0 auto;
  }
  .banner:hover {
    cursor: pointer;
  }
  .app-div {
    max-width: 1244px !important;
    margin: 0 auto;
  }
  .app-toolbar {
    background-image: linear-gradient(#404040, #363636);
  } 
  .no-uppercase-btn {
    text-transform: unset !important;
    letter-spacing: normal;
    font-size: 1rem;
    min-width: 244px !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
</style>