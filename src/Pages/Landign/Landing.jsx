import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Landing = () => {

    return (
        <>
            <Container className="mt-5">

                <h1>Bienvendo al E-commerce</h1>
                <br></br>

                <Button as="span" variant="dark"><Link to="/signIn">SignIn</Link></Button>
            </Container>

        </>
    )
}
export default Landing