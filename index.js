
// fetch product data from file json to get data from API
document.addEventListener('DOMContentLoaded', async () => {
    await fetch('./data.json').then(res => res.json()).then(res => {
        // save data in local storage
        localStorage.setItem('products', JSON.stringify(res))
        displayProducts(res)
        document.getElementById("category").innerHTML += [... new Set(res.map(product => product.category))]
            .map(category => `<option value="${category}">${category}</option>`).join(" ")
        document.getElementById("brand").innerHTML += [... new Set(res.map(product => product.brand))]
            .map(brand => `<option value="${brand}">${brand}</option>`).join(" ")
        // search by name  
        document.getElementById('search').addEventListener('keyup', applyFilter)
        // filter by category
        document.getElementById("category").addEventListener('change', applyFilter)
        // filter by brand
        document.getElementById("brand").addEventListener('change', applyFilter)
    })
})

//  display products  
const displayProducts = (products = []) => {
    const productsContainer = document.getElementById('products')
    productsContainer.innerHTML = ''
    if (products.length === 0) {
        productsContainer.innerHTML = `<h2>No Products Found</h2>`
    }
    products.forEach(product => {
        const divEle = document.createElement('div')
        divEle.innerHTML += `
        <h2>${product.name}</h2>
        <p>price : ${product.price} EGP</p>
        `
        productsContainer.appendChild(divEle)
    })
}


// clear filter 
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('search').value = ''
    document.getElementById('category').value = ''
    document.getElementById('brand').value = ''
    applyFilter()
})

// filter products by search, category and brand
const applyFilter = () => {
    const category = document.getElementById('category').value
    const brand = document.getElementById('brand').value
    const searchTerm = document.getElementById('search').value
    const products = JSON.parse(localStorage.getItem('products'))
    let filterData = [...products]
    searchTerm !== '' && (filterData = filterData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())))
    category !== '' && (filterData = filterData.filter(product => product.category === category))
    brand !== '' && (filterData = filterData.filter(product => product.brand === brand))
    displayProducts(filterData)
}

