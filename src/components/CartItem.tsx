import React from 'react';
import {useShopContext} from "../context/ShopContext";
import storeItems from "../data/items.json"
import {Button, Stack} from "react-bootstrap";
import {formatCurrency} from "../utils/formatCurrency";
import {StoreItem} from "./StoreItem";

type cartItemProps = {
    id: number
    quantity: number
}
const CartItem = ({id, quantity}: cartItemProps) => {
    const {removeFromCart} = useShopContext()
    const item = storeItems.find(item => item.id === id)
    if (item == null) {
        return null
    }
    return (
        <Stack direction="horizontal" gap={2}>
            <img src={item.imgUrl} style={{width: "125px", height: "75px", objectFit: "cover"}}/>
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{fontSize: ".65rem"}}>
              x{quantity}
            </span>
                    )}
                </div>
                <div className="text-muted" style={{fontSize: "0.75rem"}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)
            }>&times;</Button>
        </Stack>

    );
};

export default CartItem;