import { Container } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"
import './Login.css'
const SigIn = () => {
    return (
        <>
            <Container>
                <div className="login">
                    <h1>Login</h1>
                    <LoginForm />

                </div>
            </Container>
        </>

    )
}
export default SigIn