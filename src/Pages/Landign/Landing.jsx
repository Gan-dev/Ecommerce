import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Ecommerce from '../../assets/img/E-commers.jpg'

const Landing = () => {

    return (
        <>
            <Container className="mt-5">

                <Row className="align-items-center justify-content-center">
                    <Col>
                        <img src={Ecommerce} alt="icomerce" style={{ width: 500 }} />
                    </Col>
                    <Col>
                        <h1>Bienvendo al E-commerce</h1>
                        <br></br>

                        <Button as="span" variant="dark" className="justfiy-content-center"><Link to="/signIn">SignIn</Link></Button>
                    </Col>
                </Row>

            </Container>

        </>
    )
}
export default Landing