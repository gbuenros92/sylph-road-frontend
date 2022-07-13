import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

const PokedexList = ({ pokemon, typeColors }) => {

    const [bgColor, setBgColor] = useState('')

    const navigate = useNavigate()

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
            onClick={() => navigate(`/pokemon/${pokemon.name}`, { state: pokemon })}
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
            <Image src={pokemon.sprites.other.home.front_default} alt={pokemon.name} height="55" className="mx-3" />
            <h4>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h4>
        </ListGroup.Item>
    );
}

export default PokedexList;
