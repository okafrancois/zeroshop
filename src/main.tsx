import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ProductModel from "./models/ProductModel";
import {getCategoriesFromApi, getProductsFromApi} from "./utils/api-funcs";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const init = async () => {

    const productItems = await getProductsFromApi
        .then(data => {
            console.log(data);
            return data
        })
        .then(data => data.map((item: any) => ProductModel({
            id: item.id,
            title: item.attributes.title,
            slug: item.attributes.slug,
            description: item.attributes.description,
            price: item.attributes.price,
            discountPercentage: item.attributes?.discountPercentage ?? 0,
            rating: item.attributes?.rating ?? null,
            stock: item.attributes?.stock ?? 0,
            brand: item.attributes.brand,
            categories: item.attributes.categories.data.map((item: any) => (
                {
                    name: item.attributes.name,
                    slug: item.attributes.slug,
                }
            )) ?? ['all'],
            thumbnail: item.attributes?.thumbnail.data.attributes.url,
            images: item.attributes.images.data,
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
        })))

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
