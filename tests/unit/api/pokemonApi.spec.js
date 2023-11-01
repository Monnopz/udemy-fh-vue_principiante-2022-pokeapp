import pokemonApi from '@/api/pokemonApi'

//Es recomendable que las pruebas comiencen con los componentes que no tienen relacion con otros componentes, es decir, componentes mas sencilos

describe('pokemonApi', () => {

    test('axios debe de estar configurado con el api de pokemon', () => {

        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')

    })

})