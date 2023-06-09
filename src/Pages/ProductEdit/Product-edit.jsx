import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useParams } from "react-router-dom"
import productSevice from "../../Services/Products.service"
import uploadServices from "../../Services/Upload.service"
import { AuthContext } from "../../context/auth.context"

const ProductEdit = ({ product, handleFormSubmission }) => {
    const { product_id } = useParams()

    const { user } = useContext(AuthContext)

    const [productsData, setProducts] = useState({
        name: `${product?.name}`,
        description: `${product?.description}`,
        category: `${product?.category}`,
        price: `${product?.price}`,
        image: `${product?.image}`,
        owner: user._id,
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setProducts({ ...productsData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        productSevice
            .updateOne(productsData, product_id)
            .then(() => {
                product.loadProduct()
                handleFormSubmission()
            })
            .catch(err => console.log(err))


    }
    const handleFileUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProducts({ ...setProducts, image: res.data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { name, description, category, price } = productsData

    return (
        <>
            {
                productsData &&
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre del producto</Form.Label>
                        <Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={category} onChange={handleInputChange} name="category" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={handleInputChange} name="price" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                    </Form.Group>


                    <div className="d-grid">
                        <Button variant="dark" type="submit">Editar Producto</Button>
                    </div>

                </Form>

            }

        </>
    )

}

export default ProductEdit