import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { DateContext } from '../../context/dateContext'
import { getDayName, getHour } from '../../utils/dateUtils'
const NavBar = () => {
    const { user, logout } = useContext(AuthContext)

    const { date } = useContext(DateContext)

    let day = getDayName(date)
    let hour = getHour(date)
    const navigate = useNavigate()
    const closeSession = () => {
        logout()
        navigate('/')
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>

                    {
                        !user && <Navbar.Brand as="span" ><Link to="/">Landing</Link></Navbar.Brand>
                    }
                    <Nav className="me-auto">

                        {
                            !user ?
                                <>
                                    <Nav.Link as="span"><Link to="/signIn">Sign In</Link></Nav.Link>
                                    <Nav.Link as="span" ><Link to="/signUp">Sign Up</Link></Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as='span'><Link to={'/home'}>Home</Link></Nav.Link>
                                </>
                        }
                        <Nav.Link as="span" ><Link to="/products">Products</Link></Nav.Link>
                    </Nav>
                    {

                        user ? <>
                            <Navbar.Collapse className="justify-content-end" as='span'>
                                <Link to={'/profile'}>Hola {user?.username}</Link>
                                <Nav.Link as="span" style={{ color: "grey", marginLeft: 20 }} onClick={closeSession}>Logout</Nav.Link>
                            </Navbar.Collapse>

                            <Link to={"/cart"}>
                                <AiOutlineShoppingCart className='icon' style={{ color: "white" }} />
                            </Link>
                        </>
                            :
                            <>
                                <Link to={"/signIn"}>
                                    <AiOutlineShoppingCart className='icon' style={{ color: "white" }} />
                                </Link>

                            </>
                    }
                    <Nav.Item style={{ color: "white", marginLeft: 20 }}>  {hour}  {day}</Nav.Item>
                </Container>
            </Navbar >
        </>
    )
}

export default NavBar