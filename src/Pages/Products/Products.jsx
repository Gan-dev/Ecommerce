import { Button, Container, Modal } from "react-bootstrap"
import NewProductForm from "../../components/NewProductForm/NewProductForm"
import { useContext, useEffect, useState } from "react"
import productSevice from "../../Services/Products.service"
import ProductList from "../../components/ProductList/ProductList"
import { AuthContext } from "../../context/auth.context"
import Loading from "../../components/Loading/loading"
import SearchBar from "../../components/SearchBar/SearchBar"
import './Product.css'

const Products = () => {
    const [showModal, setShowModal] = useState(false)
    const [products, setProducts] = useState([])
    const [productBackup, setProductBackup] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        productSevice
            .getAllProducts()
            .then(({ data }) => {
                setProducts(data.products)
                setProductBackup(data.products)
            }
            )
            .catch((err => console.log(err)))
    }

    const filterData = query => {
        productSevice
            .searchBar(query)
            .then(({ data }) => {
                setProducts(data)
            })
    }
    console.log(productBackup)


    return (
        <>
            <Container className="mt-5">
                <h1>La lista de Productos Creados por usuarios</h1>
                <Button variant="dark" size="m" className="button-crear" onClick={() => setShowModal(true)}>Crear Nuevo Producto</Button>
                <SearchBar filterData={filterData} />
                <hr />
                {
                    user &&
                    <>

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Nuevo Producto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewProductForm closeModal={() => setShowModal(false)} updateList={loadProducts} />
                            </Modal.Body>
                        </Modal>
                    </>
                }
                {
                    products ? (
                        <ProductList products={products} />
                    ) : (
                        productBackup ? (
                            < ProductList products={productBackup} />
                        ) : <Loading />
                    )

                }

            </Container>

        </>
    )
}

export default Products