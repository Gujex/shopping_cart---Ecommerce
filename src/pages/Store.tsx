import React from 'react';
import StoreItems from "../data/items.json"
import {StoreItem} from "../components/StoreItem"
import {Row, Col} from "react-bootstrap"
export const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {StoreItems.map(item => (
                    <Col key={item.id}><StoreItem {...item} /></Col>
                ))}
            </Row>
        </>
    );
};