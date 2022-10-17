<template>
  <v-btn x-small dark depressed class="type-icon" :color="color(type)">{{ type }}</v-btn>
</template>

<script>
export default {
  props: ['type'],
  methods: {
    color(type) {
      if (type == 'Normal') return '#aa9';
      if (type == 'Fire') return '#f42';
      if (type == 'Water') return '#39f';
      if (type == 'Electric') return '#fc3';
      if (type == 'Grass') return '#7c5';
      if (type == 'Ice') return '#6cf';
      if (type == 'Fighting') return '#b54';
      if (type == 'Poison') return '#a59';
      if (type == 'Ground') return '#db5';
      if (type == 'Flying') return '#89f';
      if (type == 'Psychic') return '#f59';
      if (type == 'Bug') return '#ab2';
      if (type == 'Rock') return '#ba6';
      if (type == 'Ghost') return '#66b';
      if (type == 'Dragon') return '#76e';
      if (type == 'Dark') return '#754';
      if (type == 'Steel') return '#aab';
      if (type == 'Fairy') return '#e9e';
      return 'black'
    }
  }
}
</script>

<style scoped>  
  .type-icon {
    width: 57.5px;
    margin: 2px;
    min-height: 26px;
    border: 1px solid rgba(0,0,0,.2) !important;
    font-weight: 400 !important;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
</style>