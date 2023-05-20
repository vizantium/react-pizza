import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: string | number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function pizzaData(){
            try {
                const {data} = await  axios.get(`https://62961f1875c34f1f3b29b28c.mockapi.io/items/${id}`)
            setPizza(data)
            } catch (error) {
                alert('Error')
                navigate('/')
            }
        }
        pizzaData()
    },[])

    if (!pizza) {
        return <div>'Loading...'</div>
    }

    return (
        <div className={'container'}>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₸</h4>
        </div>
    )
}

export default FullPizza
