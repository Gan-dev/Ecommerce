import axios from 'axios'

class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_URL}/product`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }
    create(productData) {
        return this.api.post('/create', productData)
    }
    getAllProducts() {
        return this.api.get('/getAll')
    }
    getOneProduct(id) {
        return this.api.get(`/getOneProduct/${id}`)
    }

    updateOne(productData, id) {
        return this.api.put(`/edit/${id}`, productData)
    }
    deleteOne(productId) {
        return this.api.put(`/deleted/${productId}`)
    }
    searchBar(query) {
        return this.api.get(`/search?search=${query}`)
    }
    getAllProductOwner(userId) {
        return this.api.get(`/getOwner/${userId}`)
    }
}
const productSevice = new ProductService()

export default productSevice