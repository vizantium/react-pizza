import React, {useCallback, useEffect, useRef} from "react";
import Preloader from "../Preloader/Skeleton";
import {Categories} from "./Content/Categories";
import {Sort} from "./Content/Sort";
import {PizzaBlock} from "./Content/PizzaBlock";
import {Pagination} from "../Pagination/Pagination";
import {useSelector} from "react-redux";
import {setCategoryId, setFilters, setPage} from "../../redux/filter-slice";
import {useNavigate} from 'react-router-dom'
import qs from 'qs'
import {axiosPizzas} from "../../redux/pizzas-slice";
import {selectFilter, selectPizzaData} from "../../redux/selectors";
import {useAppDispatch} from "../../redux/redux-store";
import {render} from "@testing-library/react";

type filterType = {
    categoryId: number,
    pageCount: number,
    searchValue: string,
    sortId: number,
    currentPage: number
}

export const Home:React.FC = () => {
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {categoryId, sortId, searchValue} = useSelector(selectFilter)
    const currentPage = useSelector((state: any) => state.filterSlice.pageCount)
    const {status, items} = useSelector(selectPizzaData)
    const dispatch = useAppDispatch()

    const sortNames = ['rating', 'price', 'title']

    async function axiosGet() {

        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            axiosPizzas({
                search,
                sortNames,
                sortId,
                currentPage,
                categoryId
            })
        );

        window.scrollTo(0, 0)
    }

    const onClickCategory = useCallback((index:number) => {
        dispatch(setCategoryId(index))
    }, [])


    const setCurrentPage = (number: number) => {
        dispatch(setPage(number))
    }
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortId,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortId, currentPage])
    useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as filterType
            dispatch(setFilters({...params}))
            isSearch.current = true
        }

    }, [])
    useEffect(() => {
        if (!isSearch.current) {
            axiosGet()
        }
        isSearch.current = false
    }, [categoryId, sortId, searchValue, currentPage])


    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}  />)

    return <div className="container">
        <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={onClickCategory}/>
            <Sort sortId={sortId}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {status === 'error' ? <div className="content__error-info"><h2>Произошла ошибка 😕</h2><p>Не удалось получить питсы.</p></div>
                : (status === 'loading'? [...new Array(6)].map((_, index) => <Preloader key={index}/>) :
                pizzas)}

        </div>
        <Pagination value={currentPage} onChangePage={setCurrentPage}/>
    </div>
}


