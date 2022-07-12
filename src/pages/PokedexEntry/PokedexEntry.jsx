import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PokedexEntry = () => {
    const navigate = useNavigate()
    // const location = useLocation()
    // const pokemon = location.state
    const { name } = useParams()

    const [pokemon, setPokemon] = useState([])
    const [bio, setBio] = useState('')

    const getBio = async pkmn => {
        try {
            const res = await axios.get(pkmn.species.url)
            const data = res.data

            const text = data.flavor_text_entries.find(entries => entries.language.name === "en")
            setBio(text.flavor_text)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                
                setPokemon(res.data)
            } catch (err) {
                console.log(err)
            }
        })()
        getBio(pokemon)
    }, [name])

    return (
        <Container>
            <Card border="secondary" className="mt-5 w-100">

                <Card.Header className="d-flex justify-content-center">
                    <Card.Title><h1>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1></Card.Title>
                </Card.Header>

                <Card.Body className="d-flex flex-column">

                    <Container>
                        <Image src={pokemon.sprites.other.dream_world.front_default}/>
                        <h6>{bio}</h6>
                    </Container>

                    <Container>
                        <Row>
                            <Col>
                                <Container className="info-types d-flex justify-content-center align-items-baseline">
                                    <h4>Type:</h4>
                                    &nbsp;
                                    <span>
                                        <small>{pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1)}</small>
                                        {
                                            (pokemon.types[1])
                                            &&
                                            <small> / {pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.substring(1)}</small>
                                        }
                                    </span>
                                </Container>
                            </Col>

                            <Col>
                                <Container className="info-abilities d-flex justify-content-center align-items-baseline">
                                    <h4>Abilities:</h4>
                                    &nbsp;
                                    <span>
                                        <small>{pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.substring(1)}</small>
                                        {
                                            (pokemon.abilities[1])
                                            &&
                                            <small> / {pokemon.abilities[1].ability.name[0].toUpperCase() + pokemon.abilities[1].ability.name.substring(1)}</small>
                                        }
                                    </span>
                                </Container>
                            </Col>
                        </Row>
                    </Container>


                    <Container className="info-stats">
                        <h4>Base Stats</h4>

                        <div className="stats-bars">
                            <ListGroup className="w-50">
                                <ListGroup.Item>
                                    <h6>{pokemon.stats[0].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[0].base_stat) / 255) * 100} label={pokemon.stats[0].base_stat} variant="info" />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>{pokemon.stats[1].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[1].base_stat) / 255) * 100} label={pokemon.stats[1].base_stat} variant="info" />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>{pokemon.stats[2].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[2].base_stat) / 255) * 100} label={pokemon.stats[2].base_stat} variant="info" />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>{pokemon.stats[3].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[3].base_stat) / 255) * 100} label={pokemon.stats[3].base_stat} variant="info" />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>{pokemon.stats[4].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[4].base_stat) / 255) * 100} label={pokemon.stats[4].base_stat} variant="info" />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h6>{pokemon.stats[5].stat.name.toUpperCase()}</h6>
                                    <ProgressBar now={((pokemon.stats[5].base_stat) / 255) * 100} label={pokemon.stats[5].base_stat} variant="info" />
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Container>

                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate('/pokemon')}>Back to Pok&eacute;dex</Button>
                    <ButtonGroup>
                        <Button variant="success">Previous Entry</Button>
                        <Button variant="success">Next Entry</Button>
                    </ButtonGroup>
                    <Button variant="primary">Add to Party</Button>
                </Card.Footer>

            </Card>
        </Container>
    );
}

export default PokedexEntry;
