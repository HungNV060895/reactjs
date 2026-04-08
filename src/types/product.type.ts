export interface Product {
    _id: string; // Thường backend dùng _id hoặc id
    name: string;
    description: string;
    price: number;
    category: string;
    image: string; // URL ảnh sản phẩm
    stock: number; // Số lượng tồn kho
    brand?: string;
    rating?: {
        rate: number;
        count: number;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
}