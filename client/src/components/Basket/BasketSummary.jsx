import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const BasketSummary = observer(({isColumnLayout}) => {
    const {basket} = useContext(Context);
    return (
        <Col
            md={4}
            className="p-4"
            style={{
                backgroundColor: '#ddd',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                borderRadius: isColumnLayout ? '0 0 1rem 1rem' : '0 1rem 1rem 0'
            }}
        >
            <h5><b>Summary</b></h5>
            <hr/>
            <Row className="mb-3">
                <Col>ITEMS {basket.totalQuantity}</Col>
                <Col className="text-right">${basket.total}</Col>
            </Row>

            <form>
                <p>SHIPPING</p>
                <select className="form-control mb-4" style={{backgroundColor: '#f7f7f7'}}>
                    <option className="text-muted">Standard-Delivery- €5.00</option>
                </select>

                <p>PROMO CODE</p>
                <input
                    id="code"
                    className="form-control mb-4"
                    placeholder="Enter your code"
                    style={{padding: '1.5vh 1vh', backgroundColor: '#f7f7f7'}}
                />
            </form>

            <hr/>

            <Row className="mt-3 pt-3">
                <Col>TOTAL PRICE</Col>
                <Col className="text-right">${basket.total}</Col>
            </Row>

            <Button className="btn btn-dark w-100 mt-4" style={{fontSize: '0.7rem', padding: '1vh'}}>CHECKOUT</Button>
        </Col>
    );
});

export default BasketSummary;