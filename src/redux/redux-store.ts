import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./filter-slice";
import cartSlice from "./cart-slice";
import pizzasSlice from "./pizzas-slice";
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        filterSlice: filterSlice,
        cartSlice: cartSlice,
        pizzasSlice: pizzasSlice
    }
})
type FuncType = typeof store.getState
export type StateType = ReturnType<FuncType>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
