export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating?: number;
    poster: string;
    src: string;
};

export type CartProduct = Product & { amount: number };
