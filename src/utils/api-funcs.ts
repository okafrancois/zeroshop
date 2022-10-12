const getProductsFromApi: Promise<any> = new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products?populate=*`, {
        headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`,
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
});

const getCategoriesFromApi: Promise<any> = new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
        headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
})

export { getProductsFromApi, getCategoriesFromApi };
