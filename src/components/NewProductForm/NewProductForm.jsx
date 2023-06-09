import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import uploadServices from "../../Services/Upload.service"
import productSevice from "../../Services/Products.service"
import FormError from "../FormError/FormError"
import { MessageContext } from "../../context/message.context"


const NewProductForm = ({ closeModal, updateList }) => {
    const { user } = useContext(AuthContext)

    const [isLoading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])
    const { emitMessage } = useContext(MessageContext)
    const [productsData, setProducts] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        image: '',
        owner: user._id,
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setProducts({ ...productsData, [name]: value })
    }
    console.log(emitMessage)

    const handleSubmit = e => {
        e.preventDefault()
        if (!isLoading) {
            productSevice
                .create(productsData)
                .then(() => {
                    emitMessage("Creada Correctamente")
                    updateList()
                    closeModal()
                })
                .catch(err => setErrors(err.response.data.errorMessages))
        }
    }
    console.log(errors)


    const handleFileUpload = e => {
        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProducts({ ...setProducts, image: res.data.cloudinary_url })
                setLoading(false)
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { name, description, category, price } = productsData

    return (
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
                {
                    !isLoading && <Button variant="dark" type="submit">Crear Producto</Button>
                }
            </div>
            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
        </Form>
    )
}

export default NewProductForm