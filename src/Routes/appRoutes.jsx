import { Route, Routes, useNavigate } from 'react-router-dom'
import Landing from '../Pages/Landign/Landing'
import SigIn from '../Pages/Login/Login'
import SignUp from '../Pages/signup/SignUp'
import Products from '../Pages/Products/Products'
import ProductDetails from '../Pages/ProductsDetails/ProductsDetails'
import PrivateRoute from './privateRoute'
import Home from '../Pages/Home/home'
import ProductEdit from '../Pages/ProductEdit/Product-edit'
import CartPage from '../Pages/CartPage/CartPage'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import EditUserForm from '../components/EditUserForm/EditUserForm'

const AppRoutes = () => {
    //proteger Rutas tmb si estas loggeado
    const navigate = useNavigate()
    return (
        <Routes>


            <Route path='/' element={<Landing />} />
            <Route path='/signIn' element={<SigIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/products' element={<Products />} />
            <Route path='/details/:product_id' element={<ProductDetails />} />
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path='/edit/:product_id' element={<ProductEdit handleFormSubmission={() => navigate('/signIn')} />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/edit/profile' element={<EditUserForm />} />
            </Route>

            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}
export default AppRoutes