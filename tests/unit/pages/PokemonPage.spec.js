import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import { mockPokemons } from '../mocks/pokemons.mock'

describe('PokemonPage Component', () => {{

    let wrapper

    beforeEach(() => {
        // mixPokemonArrSpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray') //Se ejecuts aqui antes de hacer el mount. Si se usa aqui hay que hacer el clean de los mocks (jetSpy.clearAllMocks)
        wrapper = shallowMount(PokemonPage)
    })

    // test('debe de hacer match con el snapshot', () => { Esta prueba no ayuda mucho debido a que este componente puede o no tener pokemon
    //     expect(wrapper.html()).toMatchSnapshot()
    // });

    // const mixPokemonArr= jest.spyOn(PokemonPage.methods,'mixPokemonArr') // para espiar el método dentro del componente original

    // const mixPokemonArr= jest.spyOn(wrapper.vm,'mixPokemonArr') // para espiar el método del objeto virtual

    test('debe de llamar el mixPokemonArray al montar ', () => {

        const mixPokemonArrSpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray') //O se puede crear aqui y montar otro wrapper
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArrSpy).toHaveBeenCalled()

    });

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        //El snapshot comun espera y carga informacion una vez (expect(wrapper.html()).toMatchSnapshot())
        //El shallowMount monta de manera sutil y no renderiza internamente porque dispara ciertos porcesos del ciclo de vida de los componentes probados
        //Un stub es un stand in y simula su comportamiento
        //El mount si monta los componentes y los renderiza, aunque este tipo de prueba es mas pesada
        const wrapper = shallowMount(PokemonPage, { //Tambien se puede montar la data
            data() {
                return {
                    pokemonArr: mockPokemons,
                    pokemon: mockPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {

        //PokemonPicture deben de existir
        //PokemonOptions deben de existir
        //PokemonPicture attribute pokemonId === 1
        //PokemonOptions attribute pokemons toBe true
        
        // //Mi solucion
        // const wrapper = shallowMount(PokemonPage, { //Se monta la data de PokemonPge para que el html sea cargado ya con los componentes que deben aparecer
        //     data() {
        //         return {
        //             pokemonArr: mockPokemons,
        //             pokemon: mockPokemons[0],
        //             showPokemon: false,
        //             showAnswer: false,
        //             message: ''
        //         }
        //     }
        // })

        // const pokemonPictureComponent = wrapper.find('pokemon-picture-stub') //Encuentra el componente
        // const pokemonOptionsComponent = wrapper.find('pokemon-options-stub') //Encuentra el componente

        // expect(pokemonPictureComponent.exists()).toBeTruthy() //Realiza las pruebas de si existe el componente
        // expect(pokemonOptionsComponent.exists()).toBeTruthy() //Realiza las pruebas de si existe el componente

        // expect(pokemonPictureComponent.attributes('pokemonid')).toBe("1") //Verifica que el pokemonid sea 1
        // expect(pokemonOptionsComponent.attributes('pokemons')).not.toBe('') //Verifica que el array de pokemons si esté (que no este vacio)

        

        //Solucion Fernando

        const wrapper = shallowMount(PokemonPage, { //Se monta la data de PokemonPge para que el html sea cargado ya con los componentes que deben aparecer
            data() {
                return {
                    pokemonArr: mockPokemons,
                    pokemon: mockPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
        expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy()

        expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe("1")
        expect(wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy()

        //Otra forma de hacerlo
        // const wrapper = shallowMount(PokemonPage, {
        //     data() {
        //         return {
        //             pokemonArr: mockPokemons,
        //             pokemon: mockPokemons[0],
        //             showPokemon: false,
        //             showAnswer: false,
        //             message: ""
        //         }
        //     }
        // })
        // const pokemonPictureComponent = wrapper.findComponent(PokemonPicture)
        // const pokemonOptionsComponent = wrapper.findComponent(PokemonOptions)
        // const { pokemonId } = pokemonPictureComponent.props()
        // const { pokemons: arrPokemon } = pokemonOptionsComponent.props()
 
        // expect(pokemonPictureComponent.exists()).toBeTruthy()
        // expect(pokemonOptionsComponent.exists()).toBeTruthy()
        // expect(pokemonId).toBe(1)
        // expect(arrPokemon).toStrictEqual(mockPokemons)

    });

    test('pruebas con checkAnswer', async () => {

        //wrapper.find(); encontrar algo en el componente; pero utilizar otros metodos del componente
        //wrapper.vm.showPokemon; utilizar una prop del componente montado
        
        const wrapper = shallowMount(PokemonPage, { //Se monta la data de PokemonPge para que el html sea cargado ya con los componentes que deben aparecer
            data() {
                return {
                    pokemonArr: mockPokemons,
                    pokemon: mockPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(1) //Un await para cuando hay modificaciones en las propiedades reactivas

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, es ${mockPokemons[0].name}`)

        await wrapper.vm.checkAnswer(10)

        expect(wrapper.vm.message).toBe(`Oops, era ${mockPokemons[0].name}`)

    });

}})