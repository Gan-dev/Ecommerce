import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import productSevice from "../../Services/Products.service"
import { Button, Container } from "react-bootstrap"

import "./ProductDetails.css"
import CardProductDetails from "../../components/CardProductDetails/CardProductDetails"

const ProductDetails = () => {

    const { product_id } = useParams()

    const [product, setProduct] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        loadProduct()
    }, [product_id])

    const loadProduct = () => {
        productSevice
            .getOneProduct(product_id)
            .then(({ data }) => setProduct(data.product))
            .catch(err => console.log(err))
    }

    const deleteProduct = (product_id) => {
        productSevice
            .deleteOne(product_id)
            .then(() => {
                navigate('/products')
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Container>

                <CardProductDetails {...product} deleted={deleteProduct} />

                <Button variant="dark" className="mt-3"><Link to={"/products"}>Volver</Link></Button>
                <hr />
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula purus, sagittis et felis a, auctor dictum arcu. Nulla sodales mauris quam, sed scelerisque mauris rhoncus non. Etiam pulvinar lorem a magna rhoncus, ut mattis nibh luctus. Sed id leo urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis a pellentesque mi, et semper ipsum. Sed fermentum mi vel volutpat aliquam. Ut non eros quam. Nullam ac sapien quis dolor finibus convallis. Proin eleifend eros nec urna molestie, et fermentum nulla cursus. Donec quis luctus elit, et auctor libero.
                    Praesent cursus in turpis molestie ultrices. Nunc id viverra nibh, ac consectetur orci. Maecenas et lorem congue, porttitor nisl quis, dignissim est. Fusce ac ipsum feugiat, porta ex vitae, porttitor lectus. In iaculis dui purus, eleifend iaculis lectus mollis eget. Phasellus id neque varius, lobortis nunc sed, varius libero. Nam sollicitudin enim a dui tincidunt, id maximus elit auctor.
                </p>
                <hr />
                <h2>Reviews</h2>
                <p>orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ligula purus, sagittis et felis a, auctor dictum arcu. Nulla sodales mauris quam, sed scelerisque mauris rhoncus non. Etiam pulvinar lorem a magna rhoncus, ut mattis nibh luctus. </p>
            </Container>
        </>
    )
}

export default ProductDetails