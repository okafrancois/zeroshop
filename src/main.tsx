import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ProductModel from "./models/ProductModel";
import {getCategoriesFromApi, getProductsFromApi} from "./utils/api-funcs";
import {ProductModelParams} from "./components/types";

const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const init = async () => {

    const productItems = await getProductsFromApi
        .then(data => data.map((item: ProductModelParams) => ProductModel(item)))

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
