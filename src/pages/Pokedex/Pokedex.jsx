import { useState, useEffect } from 'react'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import PokedexThumb from '../../components/PokedexThumb/PokedexThumb'

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
        <Container>
            <Row xs={1} md={4} className="g-4">
                {
                    pokemon.map( (pokemon, index) =>
                        <PokedexThumb 
                            key={index}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.sprites.other.dream_world.front_default}
                            type1={pokemon.types[0].type.name}
                            type2={(pokemon.types[1]) ? pokemon.types[1].type.name : null}
                        />
                    )
                }
            </Row>
        </Container>
    );
}

export default Pokedex;
