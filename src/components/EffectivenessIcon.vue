<template>
  <v-btn 
    x-small 
    dark 
    depressed
    :color="color(typeDefense)"
    :class="typeDefense == 1 || typeDefense == undefined ? 'invisible type-icon2' : 'type-icon2'"
  >
    {{ number(typeDefense) }}
  </v-btn>
</template>

<script>
export default {
  props: ['typeDefense'],
  methods: {
    number(value) {      
      if(value == .25) return '¼'
      if(value == .50) return '½'
      if(value == 0) return '0'
      if(value == 2.0) return '2'
      if(value == 4.0) return '4'
    },
    color(value) {
      if(value == .25) return '#7c0000'
      if(value == .50) return '#d50000'
      if(value == 0) return '#2e3436'
      if(value == 2.0) return '#4e9a06'
      if(value == 4.0) return '#73d216'
    }
  }
}
</script>

<style scoped>  
  .type-icon2 {
    width: 36px;
    margin: 1px;
    min-height: 36px;
    border: 1px solid rgba(0,0,0,.2) !important;
    font-size: 15px;
    text-shadow: 1px 1px 2px rgb(0 0 0 / 70%);
  }
  .invisible {
    visibility: hidden;
  }
</style>