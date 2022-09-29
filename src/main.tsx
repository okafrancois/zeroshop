import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ProductModel from "./models/ProductModel";
import {apiKey, apiUrl} from "./config";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const getProducts = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", apiKey);

    let data: any = null;

    await fetch(`${apiUrl}/api/products?populate=*`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    })
        .then(response => response.json())
        .then(result => data = result.data)
        .catch(error => console.log('error', error));

    return data;
}

const getCategories = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", apiKey);

    let data: any = null;

    await fetch(`${apiUrl}/api/product-categories`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => data = result.data)
        .catch(error => console.log('error', error));

    return data;
};

const init = async () => {

    const productItems = await getProducts()
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

    const categories = await getCategories()
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
