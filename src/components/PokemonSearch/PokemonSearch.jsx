import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'

const PokemonSearch = () => {
    return (
        <Container>
            <Row>
                <Stack direction="horizontal" gap={2}>
                    <Button variant="outline-info">Kanto</Button>
                    <Button variant="outline-info">Johto</Button>
                    <Button variant="outline-info">Hoenn</Button>
                    <Button variant="outline-info">Sinnoh</Button>
                    <Button variant="outline-info">Unova</Button>
                    <Button variant="outline-info">Kalos</Button>
                    <Button variant="outline-info">Alola</Button>
                    <Button variant="outline-info">Galar</Button>
                </Stack>
            </Row>
        </Container>
    );
}

export default PokemonSearch;
