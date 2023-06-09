import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import "./CartPay.css"
import Logo from './../../assets/img/visa.png'
import Chip from './../../assets/img/chip-card.png'


const CartPay = ({ total, closeModal, checkOut }) => {

    const [cardData, setCardData] = useState({
        number: '1234 1234 1234 1234',
        name: 'Nombre Apellidos',
        expiration: '03/24',
        cvs: '123'
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setCardData({ ...cardData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        checkOut()
        closeModal()

    }

    const { number, name, expiration } = cardData

    return (
        <>
            <section className="cards">
                <div className="front">
                    <div className="bank-logo" id="bank-logo">
                        <img src={Logo} alt="" />
                    </div>
                    <img src={Chip} className="chip" alt="" />
                    <div className="data">
                        <div className="group" id="number">
                            <p className="label">Number card</p>
                            <p className="number">{number}</p>
                        </div>
                        <div className="flexbox">
                            <div className="group" id="name">
                                <p className="label">Name card</p>
                                <p className="name">{name}</p>
                            </div>

                            <div className="group" id="expiration">
                                <p className="label">MM/YY</p>
                                <p className="expiration">{expiration}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <Card className="credit-card-form mt-3">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Cardholder Name" onChange={handleInputChange} name="name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Card Number" onChange={handleInputChange} name="number" pattern="^(?:4[0-9]{12}(?:[0-9]{3})?)$" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="MM/YY" onChange={handleInputChange} name="expiration" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="123" onChange={handleInputChange} name="cvs" pattern="^\d{3}$" />
                        </Form.Group>
                        <h4>Total: {total.toFixed(2)} €</h4>
                        <Button className="mt-3" variant="success" type="submit">
                            CheckOut
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
}
export default CartPay