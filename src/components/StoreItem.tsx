import React from 'react';
import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utils/formatCurrency";
import {useShopContext} from "../context/ShopContext";
type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {
    const {getItemQuantity,increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShopContext()
    let quantity = getItemQuantity(id)
    return (<Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height="200px" style={{objectFit: "cover"}}>

        </Card.Img>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2"> {name}</span>
                <span className="ms-2 text-muted"> {formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button onClick={() => increaseCartQuantity(id)}> + Add To Cart</Button>
                ) : <div className="d-flex align-items-center flex-column " style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{gap: ".5rem"}}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                            <span className="fs-3">{quantity}</span> In Cart
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                    </div>
                    <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">Remove</Button>
                </div>}
            </div>
        </Card.Body>
    </Card>)
}
