import { useContext, useState } from "react"
import { Button, Col, Modal, Row } from "react-bootstrap"
import ProductEdit from "../../Pages/ProductEdit/Product-edit"
import "./CardProductDetails.css"
import { AuthContext } from "../../context/auth.context"
import userService from "../../Services/User.service"
import { MessageContext } from "../../context/message.context"

const CardProductDetails = (product) => {

    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const { emitMessage } = useContext(MessageContext)
    const addToCard = () => {
        userService
            .addItems(product._id, String(user._id))
            .then(() => emitMessage("Añadido al carrito"))
            .catch(err => console.log(err))
    }

    return (

        <>
            <Row className="mt-5 align-items-center">
                <Col >
                    <img src={product.image} alt="name" style={{ width: 450 }} />
                </Col>
                <Col>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>{product.price} €</h3>
                    <p>{product.rating?.rate}</p>
                    {
                        user?._id === product.owner?._id && <>
                            <Button variant="dark" size="m" onClick={() => setShowModal(true)}>Editar</Button>
                            <Button variant="danger" size="m" onClick={() => product.deleted(product._id)}>Eliminar</Button>
                        </>

                    }
                    <br />
                    <Button variant="success" className="mt-3" onClick={addToCard}>Añadir al carrito</Button>
                    {
                        product &&
                        <div className="body-Property">
                            <h4>Created by {product.owner?.username}</h4>
                            <img src={product.owner?.avatar} alt="avatar" style={{ width: 40 }} />

                        </div>
                    }
                </Col>

            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductEdit product={product} closeModal={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>

        </>

    )
}

export default CardProductDetails