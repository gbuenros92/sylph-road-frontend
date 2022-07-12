import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

const PokedexList = ({ pokemon }) => {

    const [bgColor, setBgColor] = useState('')

    const navigate = useNavigate()

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

    useEffect(() => {
        getBgColor(pokemon.types[0].type.name)
    }, [])

    return (
        <ListGroup.Item
            className="m-2 d-flex align-items-center border-end-0 pokedex-item"
            style={{ backgroundImage: `linear-gradient(to right, white, ${bgColor}` }}
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
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
    );
}

export default PokedexList;
