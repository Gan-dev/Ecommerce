import { useContext } from "react"
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"
import Loading from "../components/Loading/loading"

const PrivateRoute = () => {
    const { user, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to="/signIn" />
    }

    return <Outlet />
}

export default PrivateRoute