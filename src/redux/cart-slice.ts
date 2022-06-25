import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCartFromLocalStorage} from "../utils/getCartFromLocalStorage";
import {calcTotalPrice} from "../utils/calcTotalPrice";

export type cartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number,
    type: string,
    count: number
}

export type CartSliceState = {
    totalPrice: number,
    items: cartItem[]
}

const { items, totalPrice} = getCartFromLocalStorage()


const initialState: CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem(state, action: PayloadAction<cartItem>) {
            const findItem = state.items.find (obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice (state.items)
        },
        minusItem(state, action: PayloadAction<{id : string, price: number}>){
            const findItem = state.items.find (obj => obj.id === action.payload.id)
            if(findItem) {
                findItem.count--
            }
            state.totalPrice = state.totalPrice - Number(action.payload.price)
        },
        removeItem(state, action: PayloadAction<{id : string, price: number, count: number}>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id)
            state.totalPrice = state.totalPrice - Number(action.payload.price) * action.payload.count
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0
        },
    }
})

export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer