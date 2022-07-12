import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Bootstrap Components
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

import PokedexList from '../../components/PokedexList/PokedexList'
import PokemonSearch from '../../components/PokemonSearch/PokemonSearch'

const Pokedex = () => {
    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [nextPage, setNextPage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {

            try {
                const res = await fetch(currentPage)
                const data = await res.json()
                
                setNextPage(data.next)

                const results = data.results

                results.forEach(async pkmnData => {
                    try {
                        const res = await fetch(pkmnData.url)
                        const data = await res.json()
                        

                        setPokemon(current => [...current, data])
                    } catch (err) {
                        console.log(err)
                    }
                })
            } catch (err) {
                console.log(err)
            }

        })()
    }, [currentPage])

    const goToNext = () => {
        setCurrentPage(nextPage)
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            <PokemonSearch />

                <ListGroup>
                    {
                        pokemon.map(pokemon =>
                            <PokedexList key={pokemon.name} pokemon={pokemon}/>
                        )
                    }
                </ListGroup>

            <Button variant="primary" size="lg" onClick={goToNext}>Load More</Button>
        </Container>
    );
}

export default Pokedex;
