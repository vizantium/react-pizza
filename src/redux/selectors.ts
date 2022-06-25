import {StateType} from "./redux-store";

export const selectCart = (state: StateType) => state.cartSlice

export const selectCartItem = (id: string) => (state: StateType) => state.cartSlice.items.find(obj => obj.id === id)

export const selectPizzaData = (state: StateType) => state.pizzasSlice

export const selectFilter = (state: StateType) => state.filterSlice
