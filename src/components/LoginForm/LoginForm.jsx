import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authService from "../../Services/Auth.service"
import { AuthContext } from "../../context/auth.context"


const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    //para redireccionar
    const navigate = useNavigate()
    const { authenticateUser, storeToken } = useContext(AuthContext)
    //se pilla a tiempo real las varibles
    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }
    //comprobacion a tiempo real si existe el usuario
    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/products')
            })
            .catch(err => console.log(err))

    }

    const { password, email } = loginData


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div>
                <Button variant="dark" type="submit">Acceder</Button>
            </div>
        </Form>


    )
}

export default LoginForm