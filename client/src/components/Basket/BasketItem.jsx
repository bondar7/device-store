import React, {useContext, useState} from 'react';
import {Col, Form} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deleteFromBasket, updateItemQuantity} from "../../http/basketAPI";
import {Context} from "../../index";

const BasketItem = observer(({item}) => {
    const {basket} = useContext(Context);
    const [quantity, setQuantity] = useState(item.quantity);
    const increment = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        await updateQuantity(newQuantity);
    }
    const decrement = async () => {
        const newQuantity = quantity === 1 ? 1 : quantity - 1;
        setQuantity(newQuantity);
        await updateQuantity(newQuantity);
    }
    const changeQuantity = async (e) => {
        const value = e.target.value;
        // Allow empty input (user deleting)
        if (value === "") {
            setQuantity("");
            return;
        }
        // Only allow digits
        if (/^\d+$/.test(value)) {
            setQuantity(Number(value));
            await updateQuantity(Number(value));
        }
    }
    const updateQuantity = async (newQuantity) => {
        basket.setQuantity(item.device.id, newQuantity);
        try {
            await updateItemQuantity(newQuantity, item.id);
        } catch (e) {
            console.log(e);
        }
    }
    const onDelete = async () => {
        try {
            basket.deleteDevice(item.id);
            await deleteFromBasket(item.device.id);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="d-flex align-items-center border-top border-bottom py-3">
            <Col xs={2}>
                <img
                    src={process.env.REACT_APP_API_URL + item?.device?.img}
                    alt="image" style={{width: '3.5rem', borderRadius: '0.5rem'}}/>
            </Col>
            <Col>
                <div className="text-muted">{item?.device?.brandName}</div>
                <div>{item?.device?.name}</div>
            </Col>
            <Col className="text-center">
                <div className="d-flex align-items-center">
                    <a style={{cursor: "pointer", fontWeight: "bold", fontSize: "22px"}} onClick={decrement}>-</a>

                    <Form.Control
                        type="text"
                        className="mx-2 text-center"
                        value={quantity}
                        onChange={changeQuantity}
                        min="1"
                        style={{width: "50px"}}
                    />

                    <a style={{cursor: "pointer", fontWeight: "bold", fontSize: "22px"}} onClick={increment}>+</a>
                </div>
            </Col>
            <Col className="text-right d-flex justify-content-around">
                <div>${item?.device?.price}</div>
                <span onClick={onDelete} style={{cursor: 'pointer', color: '#999'}}>&#10005;</span>
            </Col>
        </div>
    );
});

export default BasketItem;