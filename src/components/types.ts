type ShopProduct = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    slug: string,
    categories: ShopCategory[] | [],
    cover: RichImage | null,
    images: RichImage[] | [],
    isInWishList: boolean,
    sizes: { name: string, shortname: string}[] | [],
    colors: { name: string, code: string}[] | [],
}

// app component props data type
type AppPropsType = {
    products: ShopProduct[];
    categories: ShopCategory[];
    currency: string;
}

// product card component props type
type CardProps = {
    product: ShopProduct,
    currency: string,
    onLikeClick: (id: number) => void;
    hidden: boolean;
}

// shop cart type
type CartType = {
    items: ShopProduct[];
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

type ProductFromApi = {
    id: number;
    attributes: {
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        isInWishlist: boolean;
        slug: string;
        cover: {
            data: ApiImageItem | null;
        };
        images: {
            data: ApiImageItem[] | null;
        };
        colors: {
            data: apiColorItem[] | null
        };
        categories: {
            data: apiCategoryItem[] | null;
        };
        sizes: {
            data: apiSizeItem[] | null;
        }
    }
}

type apiSizeItem = {
    id: number;
    attributes: {
        name: string;
        shortname: string;
        [key: string|number]: any;
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
    ShopProduct,
    ProductModelParams,
    RichImage,
    ApiImageItem,
    ShopCategory,
    apiCategoryItem,
    apiColorItem,
    ProductFromApi,
    apiSizeItem,
}
