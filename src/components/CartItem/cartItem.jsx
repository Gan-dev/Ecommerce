import { Button, Col, ListGroup, Row } from "react-bootstrap";

const CartItem = ({ item, handleRemove }) => {
    return (
        <ListGroup.Item>
            <Row className="align-items-center">
                <Col><img src={item.image} alt={item.name} /></Col>
                <Col> {item.name}</Col>
                <Col>${item.price.toFixed(2)}</Col>
                <Col>{item.count}</Col>
                <Col>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item._id)}>
                        Remove
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default CartItem