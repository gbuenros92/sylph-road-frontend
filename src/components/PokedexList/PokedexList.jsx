import { useState, useEffect } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const PokedexList = ({ pokemon }) => {

    const [bgColor, setBgColor] = useState('')
    const [bio, setBio] = useState('')
    const [show, setShow] = useState(false)

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

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const getBio = async pkmn => {
        try {
            const res = await fetch(pkmn.species.url)
            const data = await res.json()

            setBio(data.flavor_text_entries[0].flavor_text)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBgColor(pokemon.types[0].type.name)
        getBio(pokemon)
    }, [])

    return (
        <>
            <ListGroup.Item
                className="m-2 d-flex align-items-center border-end-0 pokedex-item"
                style={{ backgroundImage: `linear-gradient(to right, white, ${bgColor}` }}
                onClick={handleShow}
            >
                {
                    (pokemon.id < 10) && <h6>#00{pokemon.id}</h6>
                }
                {
                    (pokemon.id >= 10 && pokemon.id < 100) && <h6>#0{pokemon.id}</h6>
                }
                {
                    (pokemon.id > 100) && <h6>{pokemon.id}</h6>
                }
                <Image src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} height="55" className="mx-3" />
                <h4>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h4>
            </ListGroup.Item>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>{pokemon.name[0].toUpperCase()+pokemon.name.substring(1)}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="dex-entry-container">
                        <div className="dex-image" style={{backgroundImage: `linear-gradient(to bottom right, white, ${bgColor})`}}>
                            <Image src={pokemon.sprites.other.dream_world.front_default} height="150" />
                        </div>
                        <div className="dex-bio">
                            <h6>Type: </h6>
                            <span>
                                <small>{pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1)}</small>
                                {
                                    (pokemon.types[1])
                                    &&
                                    <small> / {pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.substring(1)}</small>
                                }
                            </span>
                            <p>{bio}</p>
                        </div>
                        <div className="evolutions">
                            <h6>Evolutions</h6>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Add to Party
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default PokedexList;
