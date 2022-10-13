import {formatApiCategory, formatApiImage} from "../utils/api-funcs";
import {ProductModelParams} from "../components/types";

const ProductModel = (data: ProductModelParams): Object => (
    {
        id: data.id,
        title: data.attributes.title,
        slug: data.attributes.slug,
        description: data.attributes.description,
        price: data.attributes.price,
        discountPercentage: data.attributes.discountPercentage ?? 0,
        rating: data.attributes.rating ?? null,
        stock: data.attributes.stock ?? 0,
        brand: data.attributes.brand,
        categories: data.attributes.categories.data?.map((category: any) => formatApiCategory(category)) ?? ['all'],
        cover: {
            id: data.attributes.cover.data.id,
            altText: data.attributes.cover.data.attributes.alternativeText,
            formats: data.attributes.cover.data.attributes.formats,
        },
        images: data.attributes.images.data?.map((image: any) => formatApiImage(image)) ?? [],
        isInWishlist: data.attributes.isInWishlist,
        sizes: data.attributes.sizes.data.map((size: any) => {
            return {
                name: size.attributes.name,
                shortname: size.attributes.shortname,
            }
        }),
        colors: data.attributes.colors.data.map((color: any) => {
            return {
                name: color.attributes.name,
                code: color.attributes.hexacode
            }
        }),
    }
);

export default ProductModel
