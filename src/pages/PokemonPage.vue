<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"></PokemonPicture>
    <!-- El equipo de Vue agrupo variables, ojetos y metodos con simbolo de dolar $; en este caso $emit -->
    <!-- $emit(nombreMetodo, valoraenviar) -->
    <!-- Como buena practica de parte del equipo de Vue, al emitir usar upperCamelCase (selectionPokemon) y al escuchar el evento usar keba-cas(selection-pokemon) -->
    <!-- Esto de cambio de upperCamelCase a kebacase es posible gracias a que Vue lo hace desde un inicio al querer usar nuestros componentes propios con el nombre que les dimos o con keba case -->
    <!-- Para escuchar un evento simplemente es con arroba (@); @selection-pokemon="metodoDelPadreAEjecutar" -->
    <PokemonOptions @selection-pokemon="checkAnswer(1, $event)" :pokemons="pokemonArr"></PokemonOptions>
    <!-- El usar el template, aqui en Vue esta agrupado para manejar la condicion, pero al renderizar el DOM, este agrupador no aparecerá -->
    <template v-if="showAnswer" class="fade-in">
        <h2>{{ message }}</h2>
        <button @click="newGame()">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
//Este tipo de imports son la manera tradicional y cuando el componente o la aplicacion es construida automaticamente forman parte del bundle
// @/ significa que empezará desde la carpeta src
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

import getPokemonOptions from '@/helpers/getPokemonOptions'

//los hooks del ciclo de vida de un componente de Vue son metodos que se llaman cuando se crea, se actualiza o se destruye dicho componente
export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()

            //Math.floor redondea y quita todos los decimales
            //Math.random() * 4 es para que haga del 1 al 4
            const rndInt = Math.floor(Math.random() * 4)

            this.pokemon = this.pokemonArr[rndInt]
        },

        checkAnswer(pokemonId) {
            // Se puede mandar por referencia a llamar el metodo o si no se puede poner con parentesis
            // Para mandar mas atributos, se mandan los atributos y al final lo que emite el evento
            // Por ejemplo, (a, b, c, $event)
            //Aunque en Js se pueden mandar valores en funciones por referencia
            this.showPokemon = true;
            this.showAnswer = true;
            if(pokemonId === this.pokemon.id) {
                this.message = `Correcto, es ${this.pokemon.name}`
                
            }
            else{
                this.message = `Oops, era ${this.pokemon.name}`
            }
        },
        newGame(){
            this.showPokemon = false
            this.showAnswer = false
            this.pokemonArr = []
            this.pokemon = null
            this.message = ''
            this.mixPokemonArray()
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
}
</script>