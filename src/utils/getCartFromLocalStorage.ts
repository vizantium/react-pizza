import {calcTotalPrice} from "./calcTotalPrice";
import {cartItem} from "../redux/cart-slice";


export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as cartItem[],
        totalPrice
    }
}

