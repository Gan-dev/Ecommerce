import { Col, Row } from "react-bootstrap"
import ProductCard from "../ProductCard/ProductCard"

const ProductList = ({ products }) => {

    return (
        <div>

            <h2>Lista de productos para enseñar</h2>
            <Row>
                {
                    products.map(elm => {
                        return (
                            <Col md={{ span: 4 }} key={elm._id}>
                                <ProductCard {...elm} />
                            </Col>
                        )
                    })
                }
            </Row>

        </div>
    )
}

export default ProductList