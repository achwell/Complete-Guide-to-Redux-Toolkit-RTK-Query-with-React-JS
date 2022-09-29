import {createSlice} from "@reduxjs/toolkit"
import data from "../../data"
import Item from "../../types/Item"

export interface CartState {
    items: Item[]
    totalAmount: number
    totalCount: number
}

const initialState: CartState = {
    items: data,
    totalAmount: 0,
    totalCount: 0,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
        decrease: (state, action) => {
            state.items = state.items
                .map((item) => {
                    if (item.id === action.payload) {
                        return { ...item, amount: item.amount - 1 };
                    }
                    return item;
                })
                .filter((item) => item.amount !== 0);
        },
        getCartItems: (state) => {
            state.items = data;
        },
        getCartTotal: (state) => {
            let { totalAmount, totalCount } = state.items.reduce(
                (cartTotal, cartItem) => {
                    const { price, amount } = cartItem
                    const itemTotal = price * amount

                    cartTotal.totalAmount += itemTotal
                    cartTotal.totalCount += amount
                    return cartTotal
                },
                {totalAmount: 0, totalCount: 0}
            );
            state.totalAmount = parseInt(totalAmount.toFixed(2))
            state.totalCount = totalCount
        },
        increase: (state, action) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
        },
        remove: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        }
    }
})
export const {clearCart, decrease, getCartItems, getCartTotal, increase, remove} = cartSlice.actions

export default cartSlice.reducer
