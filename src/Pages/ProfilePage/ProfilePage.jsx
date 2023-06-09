import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Button, Container, Modal } from "react-bootstrap"
import { getDayName, getMonth } from "../../utils/dateUtils"
import { DateContext } from "../../context/dateContext"
import './ProfilePage.css'
import productSevice from "../../Services/Products.service"
import ProductList from "../../components/ProductList/ProductList"
import EditUserForm from "../../components/EditUserForm/EditUserForm"
import userService from "../../Services/User.service"


const ProfilePage = () => {

    const { date } = useContext(DateContext)
    const [showModal, setShowModal] = useState(false)
    const [ownerProduct, setOwnerProduct] = useState()
    const { user } = useContext(AuthContext)
    const birth = new Date(user.birth)


    let day = getDayName(date)
    let month = getMonth(date)
    let dayMonth = date.getMonth()
    let year = date.getFullYear()


    let birthDay = birth.getDay()
    let birthMonth = birth.getMonth()
    let yer = birth.getFullYear()

    useEffect(() => {
        productSevice
            .getAllProductOwner(user._id)
            .then(({ data }) => setOwnerProduct(data))
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            <Container className="mt-5">
                <p className="text-end">  {day} {dayMonth} {month} of {year}</p>
                <h1>Bienvenido a tu perfil {user.username}</h1>
                <hr />
                <div className="mb-3 mt-3 container profile-body">
                    <img src={user.avatar} alt={user.name} />
                    <div>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Birth: {birthDay + 1}-{birthMonth + 1}-{yer}</p>
                        <Button variant="dark" size="m" onClick={() => setShowModal(true)}>Editar Perfil</Button>
                    </div>

                </div>
                <br />
                <h2>Mis Productos</h2>
                <hr />
                {
                    ownerProduct && ownerProduct.length != 0 ? <ProductList products={ownerProduct} /> : <h1>No hay productos que mostrar</h1>

                }
                <hr />
                <h2>Mis Pedidos</h2>
                <p>PROXIMAMENTE.....</p>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditUserForm closeModal={() => setShowModal(false)} dataUser />
                    </Modal.Body>
                </Modal>
            </Container>

        </>
    )
}

export default ProfilePage