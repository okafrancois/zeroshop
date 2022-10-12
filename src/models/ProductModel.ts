type ProductModelParams = {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    categories: string[];
    thumbnail: string;
    images: any[];
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
        categories: data.categories,
        thumbnail: data.thumbnail,
        images: data.images,
        isInWishlist: data.isInWishlist,
        sizes: data.sizes,
        colors: data.colors,
    }
);

export default ProductModel
