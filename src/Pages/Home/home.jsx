import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Button, Col, Container, Row } from "react-bootstrap"
import './Home.css'
import ecommerce from '../../assets/img/E-commers.jpg'
import { Link } from "react-router-dom"

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <Container className="mt-5">
                <Row className="home-body">
                    <Col>
                        <img src={ecommerce} alt="ecommerce" style={{ width: 550 }} />
                    </Col>
                    <Col>
                        <h1>Bienvenido {user.username} <img src={user.avatar} alt={user.username} style={{ width: 50 }} /></h1>

                        <Button variant="success" as="span" ><Link to={"/products"}>Ver Productos</Link></Button>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home