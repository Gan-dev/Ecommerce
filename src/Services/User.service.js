import axios from 'axios'

class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/user`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }
    addItems(productId, userId) {
        return this.api.post(`/addToCart/${productId}`, { userId })
    }
    getAllCartProducts(userId) {
        return this.api.post('/getAllCartProducts', { userId })
    }
    removeProductFromCart(userId, itemId) {
        return this.api.put(`/${userId}/cart/remove/${itemId}`)
    }
    checkOut(userId) {
        return this.api.put(`/checkOut/${userId}`)
    }

    updateOne(productData, id) {
        return this.api.put(`/edit/${id}`, productData)
    }

    userInfo(userId) {
        return this.api.get(`/edit/${userId}`)
    }
    updateUser(userId, userData) {
        return this.api.put(`/edit/${userId}`, userData)
    }
}
const userService = new UserService()

export default userService