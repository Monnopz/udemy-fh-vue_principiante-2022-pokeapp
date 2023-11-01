import axios from 'axios'

const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

//Es bien comun en Vue que las exportaciones se hagan por default
export default pokemonApi