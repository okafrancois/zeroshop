import {formatApiCategory, formatApiImage} from "../utils/api-funcs";
import {apiCategoryItem, ProductFromApi, ShopCategory, ShopProduct} from "../components/types";

const ProductModel = (data: ProductFromApi): ShopProduct => (
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
        categories: data.attributes.categories.data?.map((category: apiCategoryItem): ShopCategory => formatApiCategory(category)) ?? [],
        cover: data.attributes.cover.data ? formatApiImage(data.attributes.cover.data) : null,
        images: data.attributes.images.data?.map((image: any) => formatApiImage(image)) ?? [],
        isInWishList: data.attributes.isInWishlist ? data.attributes.isInWishlist : false,
        sizes: data.attributes.sizes.data?.map((size: any) => ({name: size.attributes.name, shortname: size.attributes.shortname,})) ?? [],
        colors: data.attributes.colors.data?.map((color: any) => ({name: color.attributes.name, code: color.attributes.hexacode})) ?? [],
    }
);

export default ProductModel
