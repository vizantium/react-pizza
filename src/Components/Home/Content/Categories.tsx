import React from "react";

type CategoriesProps = {
    onClickCategory: (index:number) => void,
    categoryId: number
}

export const Categories: React.FC<CategoriesProps> = React.memo(({onClickCategory, categoryId}) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((name, index) =>
                <li key={index}
                    className={categoryId == index ? 'active' : ''}
                    onClick={() => onClickCategory(index)}>{name}</li>)}
            </ul>
        </div>
    )
})
