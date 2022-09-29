type ProductModelParams = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    isInWishlist: boolean;
    sizes: { name: string; shortname: string}[];
    colors: { name: string; code: string}[];
}

const ProductModel = (data: ProductModelParams): {} => (
    {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        isInWishlist: data.isInWishlist,
        sizes: data.sizes,
        colors: data.colors,
    }
);

export default ProductModel
