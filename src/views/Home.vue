<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col class="pa-0">
        <h1 class="mt-2 mb-n1">
          Pokémon Database - News & Updates
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="panel">
          <p>
            <b>Welcome to The Pokémon Database!</b> We believe in making Pokémon information as clear and easy to digest as possible.
          </p>
          <p class="mb-0">
            On this page below you'll find the recent Pokémon news and updates to this site. Delve deeper using the menu above to find detailed <a>Pokédex entries</a>, <a>attack stats</a>, <a>evolution chains</a> and our <a>thriving community</a> of awesome Pokéfans who'll answer your questions. And much more besides!
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-1">
      <v-col cols="8">
        <div class="news" v-for="(news, index) in newsList" :key="index">
          <h2>
            {{ news.title }}
          </h2>
          <p class="news-subtitle">
            Pokémon — {{ formatDate('07/09/22') }}
          </p>
          <div class="news-content mb-4"></div>
          <p><a :href="news.link" target="_blank" class="a-foward">Continue reading »</a></p>
          <hr>
        </div>
        <v-btn @click="prevPage()">
          page--
        </v-btn>
        <v-btn @click="nextPage()">
          page++
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn block x-large depressed dark height="64" href="https://twitter.com/pokemondb" target="_blank" color="#20b0ee" class="no-uppercase-btn">
          <v-icon> mdi-twitter </v-icon>
          <v-spacer></v-spacer>
          <span>Follow @pokemondb on Twitter</span>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-btn>
        <h3 class="mt-4 mb-2">
          Popular Quick-Links
        </h3>
        <div class="mb-4">
          <v-row>
            <v-col cols="6">
              <a class="text-small">National Pokédex</a><br>
              <a class="text-small">Sword & Shield Pokédex</a><br>
              <a class="text-small">BD & SP Pokédex</a><br>
              <a class="text-small">Legends: Arceus Pokédex</a><br>
            </v-col>
            <v-col cols="6">
              <a class="text-small">Type chart</a><br>
              <a class="text-small">Pokémon stats</a><br>
              <a class="text-small">Shiny Pokémon</a><br>
              <a class="text-small">Pokémon GO Pokédex</a><br>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
            </v-col>
            <v-col cols="6">
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
              <span>#006</span> <a class="text-small">Charizard</a><br>
            </v-col>
          </v-row>
        </div>
        <v-col class="mb-4">
          <v-row>
            <v-btn x-small dark depressed class="type" color="#aa9">Normal</v-btn>
            <v-btn x-small dark depressed class="type" color="#f42">Fire</v-btn>
            <v-btn x-small dark depressed class="type" color="#39f">Water</v-btn>
            <v-btn x-small dark depressed class="type" color="#fc3">Electric</v-btn>
            <v-btn x-small dark depressed class="type" color="#7c5">Grass</v-btn>
            <v-btn x-small dark depressed class="type" color="#6cf">Ice</v-btn>
          </v-row>
          <v-row>
            <v-btn x-small dark depressed class="type" color="#b54">Fighting</v-btn>
            <v-btn x-small dark depressed class="type" color="#a59">Poison</v-btn>
            <v-btn x-small dark depressed class="type" color="#db5">Ground</v-btn>
            <v-btn x-small dark depressed class="type" color="#89f">Flying</v-btn>
            <v-btn x-small dark depressed class="type" color="#f59">Psychic</v-btn>
            <v-btn x-small dark depressed class="type" color="#ab2">Bug</v-btn>
          </v-row>
          <v-row>
            <v-btn x-small dark depressed class="type" color="#ba6">Rock</v-btn>
            <v-btn x-small dark depressed class="type" color="#66b">Ghost</v-btn>
            <v-btn x-small dark depressed class="type" color="#76e">Dragon</v-btn>
            <v-btn x-small dark depressed class="type" color="#754">Dark</v-btn>
            <v-btn x-small dark depressed class="type" color="#aab">Steel</v-btn>
            <v-btn x-small dark depressed class="type" color="#e9e">Fairy</v-btn>
          </v-row>
        </v-col>
        <v-btn block x-large depressed dark height="64" href="https://api.allorigins.win/raw?url=https://pokemondb.net/news/feed" target="_blank" color="#ff7f0f" class="no-uppercase-btn">
          <v-icon> mdi-signal-variant </v-icon>
          <v-spacer></v-spacer>
          <span>RSS news feed</span>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Home',
  data: () => ({ 
    newsListAll: [],
    newsList: [],
    page: 1
  }),
  methods: {    
    formatDate(arara) {
      return moment(arara).format('DD MMMM, YYYY')
    },
    nextPage() {
      if (this.newsList.length < 10) return;
      let start = this.page * 10;
      let end = start + 10;
      this.page++;
      this.loadInfo(start, end);
    },
    prevPage() {
      if (this.page <= 1) return;
      this.page--;
      let start = (this.page-1) * 10;
      let end = start + 10;
      this.loadInfo(start, end);
    },
    loadInfo(start, end) {
      window.scrollTo(0,0);  
      this.newsList = [];
      this.newsList = this.newsListAll.slice(start, end);        
      setTimeout(() => { 
        for (let i = 0; i < this.newsList.length; i++) {
          document.getElementsByClassName("news-content")[i].innerHTML = this.newsList[i].desc;
        }
        let videos = document.getElementsByClassName("video-iframe");                  
        for (let i = 0; i < videos.length; i++) { 
          videos[i].src = 'https://www.youtube.com/embed/' + videos[i].src.replace("http://localhost:8080/","")
          videos[i].style.height = "427px"
          videos[i].style.width = "759px"
        } 
        let divs = document.querySelectorAll(".figure");
        for (let i = 0; i < divs.length; i++) {
          divs[i].style.textAlign = "center";
        } 
        let images = document.querySelectorAll("p > img");
        for (let i = 0; i < images.length; i++) {
          images[i].style.float = "right"
          images[i].style.margin = "1rem"
        } 
        let images2 = document.querySelectorAll(".figure > img");
        for (let i = 0; i < images2.length; i++) {
          images2[i].style.display = "inline-block"
        } 
      });
    }
  },
  computed: {
  },
  mounted() {
    fetch("https://api.allorigins.win/raw?url=https://pokemondb.net/news/feed")
      .then(res => res.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        items.forEach(item => {
          this.newsListAll.push({ 
            title: item.querySelector("title").textContent,
            date: item.querySelector("pubDate").innerHTML,
            desc: item.querySelector("description").textContent,
            link: item.querySelector("link").innerHTML
          })          
        })
      })
      .then(() => this.loadInfo(0, 10))
  }
}
</script>

<style scoped>
  .container {
    padding: 1.5rem 2rem;
  }
  .news-subtitle {
    color: #737373
  }
  .a-foward {
    font-weight: bold;
  }
  .panel {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
  }
  .type {
    width: 57.5px;
    margin: 2px;
    min-height: 26px;
    border: 1px solid rgba(0,0,0,.2) !important;
    font-weight: 400 !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
  .no-uppercase-btn {
    margin-right: -1px !important;
    text-transform: unset !important;
    letter-spacing: normal !important;
    font-weight: 400 !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
  .no-uppercase-btn:hover{
    color: #fff !important;
    text-decoration: none;
  }
  .text-small {
    font-size: .875rem;
  }
</style>
