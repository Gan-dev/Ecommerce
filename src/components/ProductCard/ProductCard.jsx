import { useContext } from "react"
import { Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import userService from "../../Services/User.service"
import './ProductCard.css'
import { MessageContext } from "../../context/message.context"

const ProductCard = ({ _id, name, image, price, owner }) => {

    const { user } = useContext(AuthContext)
    const { emitMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const addToCard = () => {
        userService
            .addItems(_id, String(user._id))
            .then(() => emitMessage("añadido Correctamente al carrito"))
            .catch(err => console.log(err))
    }

    return (
        <Card className="mb-3 productCard">
            <Card.Img variant="top" src={image} />
            <Card.Body>

                <Card.Title>{name}</Card.Title>
                <div className="d-grid">
                    <h3>${price}</h3>
                    <Link to={`/details/${_id}`} >Ver Mas</Link>
                </div>
                {
                    user ?
                        <>
                            {
                                user._id != owner?._id &&
                                <Button variant="success" className="mt-3" onClick={addToCard}>Añadir al carrito</Button>
                            }
                        </>
                        :
                        <Button variant="success" className="mt-3" onClick={() => navigate('/signIn')}>Añadir al carrito</Button>

                }
            </Card.Body>
        </Card>
    )
}

export default ProductCard