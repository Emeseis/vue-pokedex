<template>
  <v-dialog v-model="isInfo" scrollable width="1220px" content-class="">    
    <v-card class="card">
      <v-row class="text-center">
        <v-col class="pa-0">
          <h1 class="mt-2 mb-n1">
            teste
          </h1>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <a href="">Prev</a>
        <v-spacer></v-spacer>
        <a href="">Next</a>
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
        <v-col cols="6">
          <p>Description: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus praesentium quos animi natus magni! Ipsa explicabo magni odit fugiat cumque eum consequuntur dolores non minima voluptas. Ad, nemo? Eaque, reiciendis.</p>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'InfoModal',
  props: ['isInfo', 'pokemonClicked'],
  data: function () {
    return {
    }
  },
  watch: {
  },
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
  },
};
</script>

<style scoped>
  .card {
    padding: 1.5rem 2rem;
  }
  .panel-blue {
    background-color: #aedfff;
    padding: 1rem;
    border-radius: 4px;
  }
</style>
