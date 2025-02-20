import React, {useContext} from 'react';
import {Col} from 'react-bootstrap';
import BasketItem from "./BasketItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const BasketList = observer(({isColumnLayout}) => {
    const {basket} = useContext(Context);
    const navigate = useNavigate();
    const items = basket?.basket?.devices || [];
    return (
        <Col
            md={8}
            className="p-4"
            style={{
                backgroundColor: '#fff',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                borderRadius: isColumnLayout ? '1rem 1rem 0 0' : '1rem 0 0 1rem'
            }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4><b>Shopping Cart</b></h4>
                <div className="text-muted">{basket.totalQuantity >= 1 ? `${basket.totalQuantity} items` : "Cart is empty"}</div>
            </div>

            <div className="border-top" style={{height: '350px', overflowY: 'auto'}}>
                {items.map(item => (
                    <BasketItem key={item.id} item={item}/>
                ))}
            </div>

            <div className="mt-4">
                <a onClick={() => navigate(SHOP_ROUTE)} href="#" style={{color: '#000'}}>&#8592; Back to shop</a>
            </div>
        </Col>
    );
});

export default BasketList;
