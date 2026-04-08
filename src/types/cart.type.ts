import { Product } from "./product.type";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number; // Tổng số lượng sản phẩm trong giỏ (để hiện Badge)
    totalPrice: number;    // Tổng tiền thanh toán
}

// Type cho các hành động trong giỏ hàng (thường dùng với Redux hoặc Context)
export type CartActionType = 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'CLEAR_CART';
