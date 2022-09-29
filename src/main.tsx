import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ProductModel from "./models/ProductModel";
import {apiKey, apiUrl} from "./config";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const getProductsFromApi: Promise<any> = new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/products?populate=*`, {
        headers: {
            'Authorization': `${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
});

const getCategoriesFromApi: Promise<any> = new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/product-categories`, {
        headers: {
            'Authorization': `${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => resolve(data.data))
        .catch(error => reject(error));
})

const init = async () => {

    const productItems = await getProductsFromApi
        .then(data => data.map((item: any) => ProductModel({
            id: item.id,
            title: item.attributes.title,
            description: item.attributes.description,
            price: item.attributes.price,
            discountPercentage: item.attributes.discountPercentage,
            rating: item.attributes.rating,
            stock: item.attributes.stock,
            brand: item.attributes.brand,
            category: item.attributes.product_category.data.attributes.dataname,
            thumbnail: item.attributes.thumbnail.data.attributes.url,
            isInWishlist: item.attributes.isInWishlist,
            sizes: item.attributes.sizes.data.map((size: any) => {
                return {
                    name: size.attributes.name,
                    shortname: size.attributes.shortname,
                }
            }),
            colors: item.attributes.colors.data.map((color: any) => {
                return {
                    name: color.attributes.name,
                    code: color.attributes.hexacode
                }
            }),
        })));

    const categories = await getCategoriesFromApi
        .then(data => {
            return data.map((item: any) => item.attributes.name);
        });

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App products={productItems} categories={categories} currency={"€"}/>
            </BrowserRouter>
        </React.StrictMode>
    );
};

init();
