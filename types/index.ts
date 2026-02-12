export interface ProductTypes{
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    link: string;
}

export interface CategoriesTypes {
    id: string,
    image: string;
    title: string;
    category: string
}