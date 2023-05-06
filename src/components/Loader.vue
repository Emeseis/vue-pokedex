<template>
  <v-dialog v-model="loading" height="200" width="200" persistent>
    <v-card height="200" width="200" class="d-flex justify-center align-center">
      <v-progress-circular
        indeterminate 
        color="red" 
        :size="100" 
        :width="10"
      ></v-progress-circular>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['isLoading'],
  computed: {
    loading() {
      return this.isLoading;
    }
  }
}
</script>

<style>
</style>