import {cartItem} from "../redux/cart-slice";

export const calcTotalPrice = (items: cartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}
