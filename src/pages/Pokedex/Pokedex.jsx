import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Bootstrap Components
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

import PokedexList from '../../components/PokedexList/PokedexList'

const Pokedex = () => {
    const navigate = useNavigate()

    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
    const [nextPage, setNextPage] = useState('')
    const [search, setSearch] = useState(false)
    const [searchedPokemon, setSearchedPokemon] = useState('')
    const [searchDetails, setSearchDetails] = useState([])
    const [bgColor, setBgColor] = useState('')

    const typeColors = [
        {
            type: 'normal',
            color: '#A8A77A'
        },
        {
            type: 'fire',
            color: '#EE8130'
        },
        {
            type: 'water',
            color: '#6390F0'
        },
        {
            type: 'grass',
            color: '#7AC74C'
        },
        {
            type: 'electric',
            color: '#F7D02C'
        },
        {
            type: 'ice',
            color: '#96D9D6'
        },
        {
            type: 'fighting',
            color: '#C22E28'
        },
        {
            type: 'poison',
            color: '#A33EA1'
        },
        {
            type: 'ground',
            color: '#E2BF65'
        },
        {
            type: 'flying',
            color: '#A98FF3'
        },
        {
            type: 'psychic',
            color: '#F95587'
        },
        {
            type: 'bug',
            color: '#A6B91A'
        },
        {
            type: 'rock',
            color: '#B6A136'
        },
        {
            type: 'ghost',
            color: '#735797'
        },
        {
            type: 'dragon',
            color: '#6F35FC'
        },
        {
            type: 'dark',
            color: '#705746'
        },
        {
            type: 'steel',
            color: '#B7B7CE'
        },
        {
            type: 'fairy',
            color: '#D685AD'
        }
    ]

    const getBgColor = pkmnType => {
        for (let i = 0; i < typeColors.length; i++) {
            (typeColors[i].type === pkmnType) && setBgColor(typeColors[i].color)
        }
    }

    const handleChange = e => {
        setSearchedPokemon(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)
            const data = await res.json()
            setSearchDetails(data)
        } catch (err) {
            console.log(err)
        }

        getBgColor(searchDetails.types[0].type.name)
        setSearch(true)
    }

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
        <Container className="d-flex flex-column align-items-center justify-content-center">

            <Form onSubmit={handleSubmit}>
                <Stack direction="horizontal" gap={3} className="m-4">
                    <Form.Control
                        className="me-auto"
                        placeholder="Search by Name"
                        value={searchedPokemon}
                        onChange={handleChange}
                    />
                    <Button variant="primary" type="submit">Submit</Button>
                    <div className="vr" />
                    <Button variant="outline-danger">Reset</Button>
                </Stack>
            </Form>

            {
                (search)
                    ?
                    <Card className="align-items-center pokedex-item" onClick={() => navigate(`/pokemon/${searchDetails.name}`, { state: searchDetails })}>
                        <Card.Header>
                            <Card.Title><h5>{searchDetails.name[0].toUpperCase() + searchDetails.name.substring(1)}</h5></Card.Title>
                        </Card.Header>
                        <Card.Body style={{backgroundImage: `linear-gradient(to bottom right, ${bgColor}, white`}}>
                            <Image src={searchDetails.sprites.other.home.front_default} height="200"/>
                        </Card.Body>
                        <Card.Footer>
                            <span>
                                <small>Type: {searchDetails.types[0].type.name[0].toUpperCase()+searchDetails.types[0].type.name.substring(1)}</small>
                                {
                                    (searchDetails.types[1])
                                    &&
                                    <small> / {searchDetails.types[1].type.name[0].toUpperCase()+searchDetails.types[1].type.name.substring(1)}</small>
                                }
                            </span>
                        </Card.Footer>
                    </Card>
                    :
                    <>
                        <ListGroup>
                            {
                                pokemon.map(pokemon =>
                                    <PokedexList 
                                        key={pokemon.name} 
                                        pokemon={pokemon} 
                                        typeColors={typeColors}
                                    />
                                )
                            }
                        </ListGroup>

                        <Button variant="primary" size="lg" onClick={goToNext}>Load More</Button>
                    </>
            }
        </Container>
    );
}

export default Pokedex;
