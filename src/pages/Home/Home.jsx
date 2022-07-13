import Feed from "../../components/Feed/Feed";
import PostBox from "../../components/PostBox/PostBox";

import Container from 'react-bootstrap/Container'

const Home = () => {
    return (
        <Container className="d-flex flex-column align-items-center">
            <PostBox />
            <Feed />
        </Container>
    );
}

export default Home;
