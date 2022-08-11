import React, {ReactNode, useState} from 'react';
import {createContext, useContext} from "react";
import {ShoppingCart} from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";
type ShopingCartProvider = {
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number,

}

type ShopingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity:  number
    cartItems: CartItem[]
}

const ShopingCartContext = createContext({} as ShopingCartContext)

export const useShopContext = () => {
    return useContext(ShopingCartContext)
};

export const ShopingCartProvider = ({children}: ShopingCartProvider) => {
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppingCart",[])


    const cartQuantity = cartItems.reduce((quantity, item) =>
        item.quantity + quantity,
        0
    )

    const openCart = () => {
        setCartIsOpen(true)
    }

    const closeCart = () => {
        setCartIsOpen(false)
    }

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(items => items.id !== id)
        })
    }
    return <ShopingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
        {children}
        <ShoppingCart cartIsOpen={cartIsOpen} />
    </ShopingCartContext.Provider>
}