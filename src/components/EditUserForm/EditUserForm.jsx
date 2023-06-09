import { useContext, useEffect, useState } from "react"
import userService from "../../Services/User.service"
import { AuthContext } from "../../context/auth.context"
import { Button, Form } from "react-bootstrap"
import { MessageContext } from "../../context/message.context"


const EditUserForm = ({ closeModal }) => {

    const { user, setUser } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const [userData, setUserData] = useState({
        username: '',
        email: '',
    })

    useEffect(() => {
        loadUser()
    }, [])

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .updateUser(user._id, userData)
            .then(() => {
                emitMessage("Datos Actualizados")
                setUser(userData)
                closeModal()

            })
            .catch(err => console.log(err))

    }
    const loadUser = () => {
        userService
            .userInfo(user._id)
            .then(({ data }) => {
                setUserData(data)
            })
            .catch(err => console.log(err))
    }

    const { username, email } = userData

    return (
        <Form onSubmit={handleSubmit}>


            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Save</Button>
            </div>

        </Form>
    )
}

export default EditUserForm