import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../../Services/Auth.service"
import { Button, Form } from "react-bootstrap"
import uploadServices from "../../Services/Upload.service"


const SigInForm = () => {

    const [signUpData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        birth: '',
        avatar: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signUpData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService
            .signup(signUpData)
            .then(({ data }) => navigate('/'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signUpData, avatar: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { username, email, password, birth } = signUpData


    return (

        <Form onSubmit={handleSubmit}>


            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="birth">
                <Form.Label>Birth</Form.Label>
                <Form.Control type="date" value={birth} onChange={handleInputChange} name="birth" />
            </Form.Group>


            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>


            <div className="d-grid">
                <Button variant="dark" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SigInForm