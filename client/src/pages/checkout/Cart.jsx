import React, {useContext} from 'react';
import {Context} from "../../index";
import {Card, Col} from "react-bootstrap";
import BasketItem from "../../components/Basket/BasketItem";
import {observer} from "mobx-react-lite";

const Cart = observer(() => {
    const {basket} = useContext(Context);
    const items = basket.basket.devices || [];
    return (
        <div>
            <div className="mb-2 px-2 d-flex justify-content-between align-items-center">
                <h4 className="fw-medium">Order</h4>
                <div>
                    Total: <span className="fw-bold">${basket.total}</span>
                </div>
            </div>
            <Card
                style={{
                    backgroundColor: '#fff',
                    borderRadius: "0.5rem"
                }}
            >
                <Card.Body>
                    <div style={{overflowY: 'auto', maxHeight: 400}}>
                        {items.map(item => (
                            <BasketItem key={item.id} item={item}/>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
});

export default Cart;