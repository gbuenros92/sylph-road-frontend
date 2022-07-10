import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const PokedexThumb = ({ id, name, image, type1, type2 }) => {
    return (
        <Col>
            <Card border="dark" style={{ width: '20rem' }} className="text-center" style={{backgroundColor: "#00005c"}}>
                <Card.Header>
                    {
                        (id < 10) && <h6>#00{id}</h6>
                    }
                    {
                        (id >= 10 && id < 100) && <h6>#0{id}</h6>
                    }
                    {
                        (id > 100) && <h6>{id}</h6>
                    }
                </Card.Header>
                <Card.Img variant="top" src={image} alt={name} height="150"/>
                <Card.Body className="p-0">
                    <Card.Title>{name[0].toUpperCase() + name.substring(1)}</Card.Title>
                    <Card.Text>
                        <small>{type1[0].toUpperCase() + type1.substring(1)} </small>
                        {
                            (type2)
                            &&
                            <small>/ {type2[0].toUpperCase() + type2.substring(1)}</small>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default PokedexThumb;
