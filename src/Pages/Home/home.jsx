import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Container } from "react-bootstrap"

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <Container className="mt-5">
                <h1>Bienvendo al E-commerce {user.username}</h1>
                <img src={user.avatar} alt={user.username} />
                <br></br>
            </Container>
        </>
    )
}

export default Home