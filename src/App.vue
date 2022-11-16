<template>
  <v-app>
    <div class="header">
      <v-img src="../public/header-lg.png" @click="navigateTo('Home')" class="banner" width="1140px" height="100px"></v-img>   
    </div>    
    <div class="app-div mb-2">         
      <div class="ma-3 mb-8">
        <v-toolbar dark dense rounded floating class="app-toolbar elevation-0 d-flex">
          <v-btn text large class="no-uppercase-btn px-lg-10" @click="$router.push({ path: '/pokedex/firered' })">
            <v-icon left size="25px" color="#a3a3a3">mdi-pokeball</v-icon>
            Pokémon data
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10" disabled>
            <v-icon left size="25px" color="#a3a3a3">mdi-cog</v-icon> 
            Game mechanics
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10" disabled>
            <v-icon left size="25px" color="#a3a3a3">mdi-controller-classic</v-icon>
            Pokémon games
          </v-btn>
          <v-btn text large class="no-uppercase-btn px-lg-10" disabled>
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
  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    navigateTo(route) {
      this.$router.push({ name: route })
    }
  },
};
</script>

<style>
  @import url('https://code.cdn.mozilla.net/fonts/fira.css');
  #search-field {
    margin-bottom: -25px;
  }
  .v-dialog:not(.v-dialog--fullscreen) {
    max-height: 96% !important;
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
  .theme--light.v-data-table td:not(.vertical-header) {
    color: #404040;
  }
  p {
    font-size: 1rem;
    font-family: "Fira Sans";
    color: #404040;
  }
  a:not(.type):not(.no-uppercase-btn) {
    color: #2769be !important;
    text-decoration: none;
    transition: color .2s, background-color .2s;
  }
  a:not(.type):hover {
    color: #a42121 !important;
    text-decoration: underline;
    outline: 0;
  }
  .no-uppercase-btn {
    text-transform: unset !important;
    letter-spacing: normal !important;
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
  ul, ol, blockquote {
    margin: 0 0 1rem 2rem;
  }
  blockquote {
    padding: 0 8px;
    border-left: 3px solid #6fad57;
    color: #484848;
    font-style: italic;
  }
  .panel {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
  }
  .text-small {
    font-size: .875rem !important;
  }
  .text-smaller {
    font-size: .775rem !important;
  }
  .v-toolbar__content {
    padding: 0 2px;
  }
  .type:hover {
    text-decoration: underline;
    outline: 0;
  }
  .fire {
    color: #d52100 !important;
  }
  .grass {
    color: #5cb737 !important;
  }
  .poison {
    color: #88447a !important;
  }
  .flying {
    color: #556dff !important;
  }
  .water {
    color: #0080ff !important;
  }
  .bug {
    color: #83901a !important;
  }
  .ground {
    color: #bf9926 !important;
  }
  .normal {
    color: #797964 !important;
  }
  .dragon {
    color: #4e38e9 !important;
  }
  .psychic {
    color: #ff227a !important;
  }
  .electric {
    color: #c90 !important;
  }
  .fighting {
    color: #a84d3d !important;
  }
  .rock {
    color: #a59249 !important;
  }
  .ghost {
    color: #5454b3 !important;
  }
  .fairy {
    color: #ffb8d5 !important;
  }
  .ice {
    color: #0af !important;
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
    font-size: 1rem;
    min-width: 244px !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
  
</style>