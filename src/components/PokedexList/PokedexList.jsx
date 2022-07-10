import { useState, useEffect } from 'react'

import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

const PokedexList = ({ id, name, image, type }) => {

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
        for(let i = 0; i < typeColors.length; i++) {
            (typeColors[i].type === pkmnType) && setBgColor(typeColors[i].color)
        }
    }

    useEffect(() => {
        getBgColor(type)
    }, [])

    return (
        <ListGroup.Item 
            className="m-2 d-flex align-items-center border-end-0 pokedex-item" 
            style={{ backgroundImage: `linear-gradient(to right, ${bgColor}, white` }}
        >
            {
                (id < 10) && <h6>#00{id}</h6>
            }
            {
                (id >= 10 && id < 100) && <h6>#0{id}</h6>
            }
            {
                (id > 100) && <h6>{id}</h6>
            }
            <Image src={image} alt={name} height="55" className="mx-3"/>
            <h4>{name[0].toUpperCase()+name.substring(1)}</h4>
        </ListGroup.Item>
    );
}

export default PokedexList;