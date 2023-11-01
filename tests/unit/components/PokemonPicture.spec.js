import { shallowMount } from '@vue/test-utils'
import PokemonPicture from '@/components/PokemonPicture'

describe('PokemonPicture component', () => {

    test('debe de hacer match con el snapshot', () => {
        
        //Codigo para montar el componente
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })

        expect(wrapper.html()).toMatchSnapshot() //Hacer match con el snapshot

    });

    test('debe mostrar la imagen oculta y el pokemon 100', () => {
        
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [img1, img2] = wrapper.findAll('img')

        expect(img1.exists()).toBeTruthy()
        expect(img2).toBeUndefined()
        
        //img1.classes('hidden-pokemon'); classes trae un array con todas las clases
        //se puede poner: img1.classes('hidden-pokemon') o img1.classes.hidden-pokemon
        expect(img1.classes('hidden-pokemon')).toBeTruthy()

        const exp = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg'

        expect(img1.attributes('src')).toBe(exp)

    });

    test('debe de mostrar el pokemon si showPokemon:true', () => {

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })
        //Al fianl solo se construye una imagen
        const img1 = wrapper.find('img')
        //Nos aseguramos de que exista
        expect(img1.exists()).toBeTruthy()
        //QUe no tenga esta clase
        expect(img1.classes('hidden-pokemon')).toBe(false)
        //Y que tenga esta clase
        expect(img1.classes('fade-in')).toBe(true)

    });

})