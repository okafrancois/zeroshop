import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ProductModel from "./models/ProductModel";
import {getCategoriesFromApi, getProductsFromApi} from "./utils/api-funcs";
import {apiCategoryItem, ProductFromApi, ShopCategory, ShopProduct} from "./components/types";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const init = async () => {

    const productItems: ShopProduct[] = await getProductsFromApi
        .then(data => data.map((item: ProductFromApi) => ProductModel(item)))

    const categories: ShopCategory[] = await getCategoriesFromApi
        .then(data => {
            return data.map((item: apiCategoryItem) => {
                return {
                    name: item.attributes.name,
                    slug: item.attributes.slug,
                }
            });
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
