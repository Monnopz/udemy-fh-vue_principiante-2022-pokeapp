//La carpeta helpers sirve para guardar codigo que se ejecutara constantemente a lo largo de la aplicacion

import pokemonApi from "@/api/pokemonApi"

export const getPokemons = () => {

    const pokemonsArr = Array.from(Array(650))

    //(_, index); guin bajo indica que no se necesita ese valor 
    return pokemonsArr.map((_, index) => index + 1)

}

const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))

    return pokemons

}

//[a,b,c,d] = []; esta dejando por defecto un array si no llega nada, pero ademas esta destructurando el array que llega
export const getPokemonNames = async ([a,b,c,d] = []) => {
    //Para instalar axios se ejecuta el comando npm i axios
    // const resp = await pokemonApi.get('/1')
    // console.log(resp)

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    //Promise.all ejecuta un lote de promesas
    const [p1, p2, p3, p4] = await Promise.all(promiseArr) //Esto retorna un array de respuestas, por eso se desestructura

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]

}

export default getPokemonOptions