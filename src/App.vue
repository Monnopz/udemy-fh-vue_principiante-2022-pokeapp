<template>
  <!-- La clase fade-in viene del archivo global animations.css, importado en el main.js -->
  <!-- <img class="fade-in" alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <PokemonPage></PokemonPage>
</template>

<script>
import PokemonPage from '@/pages/PokemonPage.vue'

export default {
  name: 'App',
  components: {
    PokemonPage
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
