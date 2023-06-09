import { useContext, useEffect, useState } from "react"
import userService from "../../Services/User.service"
import { AuthContext } from "../../context/auth.context"
import { Button, Card, Col, Container, ListGroup, Modal, Row } from "react-bootstrap"
import CartItem from "../../components/CartItem/cartItem"
import CartPay from "../../components/CartPay/CartPay"
import { calculatedTotals, uniqueCart } from "../../utils/utilsCards"
import { MessageContext } from "../../context/message.context"


const CartPage = () => {

    const [totalPrice, setTotal] = useState(0)
    const [cartItems, setCartItem] = useState()
    const [showModal, setShowModal] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const { emitMessage } = useContext(MessageContext)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadCardItems()
    }, [])

    const loadCardItems = () => {
        userService
            .getAllCartProducts(user._id)
            .then(({ data }) => {
                const { cart } = data.cart
                setCartItem(cart)
                uniqueCart(cart, setCartItem, setTotal, calculatedTotals)

                data.cart.cart.length === 0 ? setShowCart(false) : setShowCart(true)

            })
            .catch(err => console.log(err))
    }

    const removeCartItems = (itemId) => {
        userService
            .removeProductFromCart(user._id, itemId)
            .then(({ data }) => {
                const updateCart = cartItems.filter((elm) => elm._id !== itemId)
                setCartItem(updateCart)
                setTotal(calculatedTotals(updateCart))
                loadCardItems()

            })
            .catch((err) => console.log(err))
    }

    const checkOut = () => {

        userService
            .checkOut(user._id)
            .then(() => {
                emitMessage("Compra Finalizada Correctamente")
                setCartItem()
                setTotal(0)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>Shopping Cart</h2>
                    <Card>
                        <ListGroup variant="flush" style={{ padding: 20 }}>
                            {
                                cartItems && showCart ?
                                    cartItems.map((item) => (
                                        <CartItem key={item._id} item={item} handleRemove={removeCartItems} />
                                    ))
                                    :
                                    <h1>No Hay Elementos en su compra</h1>
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h4>Total: ${totalPrice && totalPrice.toFixed(2)} </h4>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    {
                        cartItems && showCart &&
                        <Button variant="success" size="lg" onClick={() => setShowModal(true)}>
                            Checkout
                        </Button>
                    }
                </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <CartPay closeModal={() => setShowModal(false)} checkOut={checkOut} total={totalPrice} />
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default CartPage