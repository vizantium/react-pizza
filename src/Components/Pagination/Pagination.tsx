import ReactPaginate from "react-paginate";
import React from "react";
import s from './Pagination.module.scss'

type PaginationPropsType = {
    value: number,
    onChangePage: (number: number) => void
}

export const Pagination: React.FC<PaginationPropsType> = ({value, onChangePage}) => {
    return <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={event => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value - 1}
    />
}


