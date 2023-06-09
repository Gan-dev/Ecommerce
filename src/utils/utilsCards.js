function calculatedTotals(items) {
    let total = items.reduce((acc, a) => acc + a.price * a.count, 0)
    return total
}

function uniqueCart(cartItems, setCartItem, setTotal, calculatedTotals) {
    let count = {}
    let uniqueCarts = []

    cartItems.forEach(el => {
        if (count[el._id]) {
            count[el._id].count += 1
        } else {
            count[el._id] = { ...el, count: 1 }
        }
    })

    for (let key in count) {
        uniqueCarts.push(count[key])
    }
    setCartItem(uniqueCarts)
    setTotal(calculatedTotals(uniqueCarts))

}



export { calculatedTotals, uniqueCart }