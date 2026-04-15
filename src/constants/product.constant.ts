import { Product } from "@/types/product.type";

export const MOCK_PRODUCTS: Product[] = [
    {
        _id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Titan tự nhiên, chip A17 Pro siêu mạnh mẽ.',
        price: 34990000,
        category: 'Phone',
        image: 'https://placehold.jp/226x220.png',
        stock: 10
    },
    {
        _id: '2',
        name: 'MacBook Air M3',
        description: 'Mỏng nhẹ, thời lượng pin lên đến 18 giờ.',
        price: 27990000,
        category: 'Laptop',
        image: 'https://placehold.jp/226x220.png',
        stock: 5
    }
];