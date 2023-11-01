import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'

//Este import es un array creado en un fichero para tomarlo en este archivo y utilizarlo
import { mockPokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: mockPokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {

        // expect(wrapper.html()).toMatchInlineSnapshot() ; pone dentro de los parentesis aqui mismo un html inline con el que se compara
        expect(wrapper.html()).toMatchSnapshot()

    })

    test('debe de mostrar las 4 opciones correctamente', () => {

        const liTags = wrapper.findAll('li')
        expect(liTags.length).toBe(4)

        //Para sacar el texto de un elemento HTML
        expect(liTags[0].text()).toBe('bulbasaur')
        expect(liTags[1].text()).toBe('ivysaur')
        expect(liTags[2].text()).toBe('venusaur')
        expect(liTags[3].text()).toBe('charmander')

    });

    test('debe de emitir "selection" con sus respectivos parametros al hacer click', () => {
        
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click') //Estimulo; da clic al boton
        li2.trigger('click') //Estimulo; da clic al boton
        li3.trigger('click') //Estimulo; da clic al boton
        li4.trigger('click') //Estimulo; da clic al boton

        expect(wrapper.emitted('selectionPokemon').length).toBe(4) //verifca que se haya emitido el evento selectionPokemon (el length por que quiere decir que si se emitio, tendra un valor en array)
        expect(wrapper.emitted('selectionPokemon')[0][0]).toStrictEqual(1)
        // expect(wrapper.emitted('selectionPokemon')[0]).toStrictEqual([1])

        expect(wrapper.emitted('selectionPokemon').length).toBe(4) //verifca que se haya emitido el evento selectionPokemon (el length por que quiere decir que si se emitio, tendra un valor en array)
        expect(wrapper.emitted('selectionPokemon')[1][0]).toStrictEqual(2)
        // expect(wrapper.emitted('selectionPokemon')[0]).toStrictEqual([2])

        expect(wrapper.emitted('selectionPokemon').length).toBe(4) //verifca que se haya emitido el evento selectionPokemon (el length por que quiere decir que si se emitio, tendra un valor en array)
        expect(wrapper.emitted('selectionPokemon')[2][0]).toStrictEqual(3)
        // expect(wrapper.emitted('selectionPokemon')[0]).toStrictEqual([3])

        expect(wrapper.emitted('selectionPokemon').length).toBe(4) //verifca que se haya emitido el evento selectionPokemon (el length por que quiere decir que si se emitio, tendra un valor en array)
        expect(wrapper.emitted('selectionPokemon')[3][0]).toStrictEqual(4)
        // expect(wrapper.emitted('selectionPokemon')[0]).toStrictEqual([4])

    });

})