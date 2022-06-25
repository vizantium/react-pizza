import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export type FetchPizzasType = {
    search: string,
    sortNames: string[],
    sortId: number,
    currentPage: string,
    categoryId: number
}


export const axiosPizzas = createAsyncThunk('pizza/axiosPizzasStatus', async ({
                                                                                  search,
                                                                                  sortNames,
                                                                                  sortId,
                                                                                  currentPage,
                                                                                  categoryId
                                                                              }: FetchPizzasType) => {
    const {data} = await axios.get<PizzaType[]>(`https://62961f1875c34f1f3b29b28c.mockapi.io/items?page=${currentPage || 1}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortNames[sortId]}&order=desc${search}`)
    return data as PizzaType[]
})

type PizzaType = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    size: number[],
    type: string[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

type pizzasSliceType = {
    items: PizzaType[],
    status: Status
}

const initialState: pizzasSliceType = {
    items: [],
    status: Status.LOADING
}

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState: initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(axiosPizzas.pending, (state: pizzasSliceType) => {
            state.status = Status.LOADING
            state.items = []
        });
        builder.addCase(axiosPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        });
        builder.addCase(axiosPizzas.rejected, (state) => {
            state.items = []
            state.status = Status.ERROR
        })
    }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer


