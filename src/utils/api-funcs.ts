import {
    apiCategoryItem,
    ApiImageItem,
    ProductFromApi,
    RichImage,
    ShopCategory
} from "../components/types";

type ProductsDataFromApi = ProductFromApi[]

const getProductsFromApi: Promise<ProductsDataFromApi> = new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products?populate=*`, {
        headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`,
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
});

const getCategoriesFromApi: Promise<apiCategoryItem> = new Promise((resolve, reject) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
        headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY}`
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
})



const formatApiCategory = (item: apiCategoryItem): ShopCategory => {
    return {
        name: item.attributes.name,
        slug: item.attributes.slug,
    }
}

const formatApiImage = (item: ApiImageItem): RichImage => {
    return {
        id: item.id,
        altText: item.attributes.alternativeText,
        formats: item.attributes.formats,
    }
}

export { getProductsFromApi, getCategoriesFromApi, formatApiCategory, formatApiImage }
