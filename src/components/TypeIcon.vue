<template>
  <v-btn x-small dark depressed class="type-icon" :color="color(type)">{{type}}</v-btn>
</template>

<script>
export default {
  props: ['type'],  
  data: () => ({ 
    
  }),
  methods: {
    color(type) {
      if (type == 'Normal') return '#aa9';
      else if (type == 'Fire') return '#f42';
      else if (type == 'Water') return '#39f';
      else if (type == 'Electric') return '#fc3';
      else if (type == 'Grass') return '#7c5';
      else if (type == 'Ice') return '#6cf';
      else if (type == 'Fighting') return '#b54';
      else if (type == 'Poison') return '#a59';
      else if (type == 'Ground') return '#db5';
      else if (type == 'Flying') return '#89f';
      else if (type == 'Psychic') return '#f59';
      else if (type == 'Bug') return '#ab2';
      else if (type == 'Rock') return '#ba6';
      else if (type == 'Ghost') return '#66b';
      else if (type == 'Dragon') return '#76e';
      else if (type == 'Dark') return '#754';
      else if (type == 'Steel') return '#aab';
      else if (type == 'Fairy') return '#e9e';
      else return 'black'
    }
  }
}
</script>

<style>  
  .type-icon {
    width: 57.5px;
    margin: 2px;
    min-height: 26px;
    border: 1px solid rgba(0,0,0,.2) !important;
    font-weight: 400 !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
</style>