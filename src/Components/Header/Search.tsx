import s from './Search.module.scss'
import React, {ChangeEvent, useState} from "react";
import debounce from 'lodash.debounce'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filter-slice";

export const Search = () => {
    const [value, setThisValue] = useState('')
    const dispatch = useDispatch()
    const useRef = React.useRef<HTMLInputElement>(null)


    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setThisValue('')
        useRef.current?.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 1000),
        []
    )

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setThisValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={s.root}>
            <img className={s.icon} src={'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-256.png'}/>
            <input
                ref={useRef}
                value={value}
                className={s.input}
                placeholder={'Поиск пиццы...'}
                onChange={onChangeInput}
            />
            {value && <img onClick={onClickClear} className={s.clearIcon} src={'https://cdn1.iconfinder.com/data/icons/material-core/14/close-256.png'}/>}
        </div>
    )
}
