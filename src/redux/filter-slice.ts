import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type filterSliceType = {
    categoryId: number,
    pageCount: number,
    searchValue: string,
    sortId: number
}

const initialState: filterSliceType = {
    categoryId: 0,
    pageCount: 1,
    searchValue: '',
    sortId: 0
}

 const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action: PayloadAction<number>) {
            state.sortId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setFilters(state, action: PayloadAction<filterSliceType & {currentPage: number}>) {
            state.pageCount = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortId = Number(action.payload.sortId)
        }
    }
    })

export const { setCategoryId } = filterSlice.actions
export const { setSort } = filterSlice.actions
export const { setPage } = filterSlice.actions
export const { setFilters } = filterSlice.actions
export const { setSearchValue } = filterSlice.actions


export default filterSlice.reducer