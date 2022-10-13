import {apiCategoryItem, apiColorItem, ApiImageItem, RichImage, ShopCategory} from "../components/types";

type ProductsFromApi = {
    id: number,
    attributes: {
        title: string,
        description: string,
        price: number,
        discountPercentage: number,
        rating: number,
        stock: number,
        brand: string,
        isInWishlist: boolean,
        slug: string,
        cover: {
            data: ApiImageItem | null,
        }
        images: {
            data: ApiImageItem[] | null,
        }
        categories: {
            data: apiCategoryItem[] | null,
        }
        colors: {
            data: apiColorItem[] | null,
        }
    }
}[]

const getProductsFromApi: Promise<ProductsFromApi> = new Promise((resolve, reject) => {
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
