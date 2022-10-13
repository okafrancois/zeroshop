type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    slug: string,
    categories: {
        name: string,
        slug: string,
    }[],
    cover: {
        id: number,
        altText: string,
        formats: {
            thumbnail: {
                [key: string|number]: any,
            },
            [key: string|number]: any
        }
    },
    images: {
        [key: string|number]: any
    }[],
    isInWishList: boolean,
    sizes: { name: string, shortname: string}[],
    colors: { name: string, code: string}[],
}

// app component props data type
type AppPropsType = {
    products: any[];
    categories: object[];
    currency: string;
}

// product card component props type
type CardProps = {
    product: Product,
    currency: string,
    onLikeClick: (id: number) => void;
    hidden: boolean;
}

// shop cart type
type CartType = {
    items: Product[];
    productsCount: number;
    totalPrice: number;
}

type ProductModelParams = {
    id: number,
    attributes: {
        title: string;
        slug: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        categories: any;
        cover: any;
        images: any;
        isInWishlist: boolean;
        sizes: any;
        colors: any;
    }
}

type RichImage = {
    id: number,
    altText: string,
    formats: {
        [key: string|number]: any,
    }
}


type ApiImageItem = {
    id: number,
    attributes: {
        alternativeText: string,
        formats: {
            thumbnail: {
                url: string,
                [key: string|number]: any,
            }
            [key: string|number]: any,
        },
        [key: string|number]: any,
    },
}

// type of product category used in the app
type ShopCategory = {
    name: string,
    slug: string,
}

// type of shop categories data returned from api
type apiCategoryItem = {
    name: string,
    slug: string,
    [key: string|number]: any,
}

// type of product colors data returned from api
type apiColorItem = {
    id: number,
    attributes: {
        name: string,
        hexacode: string,
        [key: string|number]: any,
    }
}


export type {
    AppPropsType,
    CardProps,
    CartType,
    Product,
    ProductModelParams,
    RichImage,
    ApiImageItem,
    ShopCategory,
    apiCategoryItem,
    apiColorItem,
}
