import React from 'react';
import {Container, Navbar as NavbarBs, Nav, Button} from "react-bootstrap"
import {NavLink} from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useShopContext} from "../context/ShopContext";

export const Navbar = () => {
    const  {openCart, closeCart, cartQuantity} = useShopContext()
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink} >
                        Home
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink} >
                        Store
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink} >
                        About
                    </Nav.Link>
                </Nav>
                {cartQuantity > 0 && (
                <Button onClick={openCart} variant="outline-primary" style={{width: "3rem", height: "3rem", position: "relative"}}>
                    <AiOutlineShoppingCart />
                        <div className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
                             style={{width: "1.5rem",  height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)"}}>{cartQuantity}</div>
                </Button>
                )}
            </Container>
        </NavbarBs>
    );
};