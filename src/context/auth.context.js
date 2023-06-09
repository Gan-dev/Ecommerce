import { createContext, useEffect, useState } from "react"
import authService from "./../Services/Auth.service"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const storeToken = token => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const logout = () => {
        setIsLoading(false)
        setUser(null)
        removeToken()

    }

    const authenticateUser = () => {

        const token = localStorage.getItem("authToken")

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        } else {
            logout()
        }
    }



    return (
        <AuthContext.Provider value={{ user, authenticateUser, storeToken, logout, isLoading, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }
