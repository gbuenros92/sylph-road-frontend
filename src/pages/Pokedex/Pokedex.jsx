import { useState, useEffect } from 'react'
import axios from 'axios'

// Bootstrap Components
import Button from 'react-bootstrap/Button'

const Pokedex = () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon'
    const [pokemon, setPokemon] = useState([])
    const [next, setNext] = useState(`${baseURL}?limit=20`)

    useEffect(() => {
        (async () => {

            try {
                const res = await axios.get(next)
                const data = res.data

                setNext(data.next)

                const setPokemonData = result => {
                    result.forEach(async pokemon => {
                        try {
                            const res = await axios.get(`${baseURL}/${pokemon.name}`)
                            const data = res.data

                            setPokemon(currentPokemon => [...currentPokemon, data])
                        } catch (err) {
                            console.log(err)
                        }
                    })
                }
                setPokemonData(data.results)

            } catch (err) {
                console.log(err)
            }

        })()
    }, [])

    return (
        <div>
            <ul>
                {
                    pokemon.map(pokemon => <li>{pokemon.name}</li>)
                }
            </ul>
            <Button variant="primary">Load More</Button>
        </div>
    );
}

export default Pokedex;
