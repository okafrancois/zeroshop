type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: any[],
    isInWishList: boolean,
    sizes: { name: string, shortname: string, }[],
    colors: { name: string, code: string}[],
}

// app component props data type
type AppPropsType = {
    products: Product[];
    categories: object[];
    currency: string;
}

// product card component props type
type CardProps = {
    id: number,
    title: string;
    price: number;
    currency: string;
    likeState: boolean;
    imageUrl: string;
    onLikeClick: (id: number) => void;
    hidden: boolean;
}

// shop cart type
type CartType = {
    items: Product[];
    productsCount: number;
    totalPrice: number;
}


export type { AppPropsType, CardProps, CartType, Product }
