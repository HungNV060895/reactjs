import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

// Hàm helper tính toán tổng tiền và số lượng
const calculateTotals = (items) => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    return { totalQuantity, totalPrice };
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product._id === action.payload._id
            );

            let newItems;
            if (existingItemIndex > -1) {
                newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1
                };
            } else {
                newItems = [...state.items, { product: action.payload, quantity: 1 }];
            }

            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'REMOVE_ITEM': {
            const newItems = state.items.filter((item) => item.product._id !== action.payload);
            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'UPDATE_QUANTITY': {
            const newItems = state.items.map((item) =>
                item.product._id === action.payload.productId
                    ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                    : item
            );
            return { ...state, items: newItems, ...calculateTotals(newItems) };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    // Khôi phục giỏ hàng từ localStorage nếu có
    const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : initial;
    });

    // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const removeFromCart = (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
    const updateQuantity = (productId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};