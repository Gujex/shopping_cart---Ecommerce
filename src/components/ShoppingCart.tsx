import React from 'react';
import {Offcanvas, Stack} from "react-bootstrap";
import {useShopContext} from "../context/ShopContext";
import CartItem from "./CartItem";
import {formatCurrency} from "../utils/formatCurrency";
import storeItems from "../data/items.json"
type ShoppingCart = {
    cartIsOpen: boolean
}
export const ShoppingCart = ({cartIsOpen}:ShoppingCart) => {

    const {closeCart,cartItems } = useShopContext()
    return (
        <Offcanvas show={cartIsOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3} className="d-flex align-items-center">
                    {cartItems.map(item => (
                            <CartItem key={item.id} {...item}/>
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

