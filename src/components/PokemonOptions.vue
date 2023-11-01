<template>
  <div>
    <div class="options-container">
        <ul>
            <!-- El equipo de Vue agrupo variables, ojetos y metodos con simbolo de dolar $; en este caso $emit -->
            <!-- $emit(nombreMetodo, valoraenviar) -->
            <!-- Como buena practica de parte del equipo de Vue, al emitir usar upperCamelCase (selectionPokemon) y al escuchar el evento usar keba-cas(selection-pokemon) -->
            <!-- Para escuchar un evento simplemente es con arroba (@); @selection-pokemon="metodoDelPadreAEjecutar" -->
            <li v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit('selectionPokemon', pokemon.id)">{{pokemon.name}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PokemonOptions',
    props: {
        pokemons: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
    padding-left: 0;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>