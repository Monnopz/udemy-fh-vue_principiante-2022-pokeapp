<template>
  <div>
    <div class="pokemon-container">
        <img v-if="!showPokemon" class="hidden-pokemon" :src="imgSrc" alt="pokemon">
        <img v-else class="fade-in" :src="imgSrc" alt="pokemon">
    </div>
  </div>
</template>

<script>
export default {

    name: 'PokemonPicture',
    props: {
        pokemonId: {
            type: Number, 
            required: true
        },
        showPokemon: {
            type: Boolean,
            required: true,
            default: false
        }
    },

    computed: {
        imgSrc() {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
        }
    }

}
</script>

// scoped es solo para que se aplique a este componente
<style scoped>

/* Pokemon Picture */
.pokemon-container {
    height: 200px;
}
img {
    height: 200px;
    position: absolute;
    /* right: 32%; */
    left: 0;
    right: 0;
    margin: auto;
    /* Con esto se evita el drag n drop */
    user-select: none; 
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}
</style>