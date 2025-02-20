import React, {useContext, useState} from 'react';
import {Card, Form, Button} from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import valid from "card-validator";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const PaymentCard = () => {
    return (
        <div>
            <h4 className="px-2 mb-3 fw-medium">Payment</h4>
            <div>
                <PayAfterCard/>
                <PayNowCard/>
            </div>
        </div>
    );
};

const PayAfterCard = observer(() => {
    const {checkout} = useContext(Context);
    const methodName = "Payment upon receipt of goods";
    const isSelected = checkout.paymentMethod === methodName;
    const border = !isSelected ? "none" : "1px solid rgba(0, 0, 0, 0.125)";
    return (
        <Card className="p-3" style={{border}}>
            <div>
                <Form.Check
                    type="radio"
                    value={methodName}
                    label={methodName}
                    checked={isSelected}
                    onChange={() => checkout.setPaymentMethod(methodName)}
                />
                {isSelected &&
                    <Card className="mt-2" style={{border: "1px solid orange", background: "rgb(248,239,240)"}}>
                        <Card.Body>
                            <div>The money transfer fee for payment upon receipt ($0.3 + 1.5% of the amount, but no more than $3) - <span className="fw-bold">$3</span>.</div>
                            <div className="fw-bold">Pay now with no fees</div>
                        </Card.Body>
                    </Card>
                }
            </div>
        </Card>
    );
});
const PayNowCard = observer(() => {
    const {checkout} = useContext(Context);
    const methodName = "Pay now"
    const option1 = "Online by card"
    const isSelected = checkout.paymentMethod === methodName;
    const border = !isSelected ? "none" : "1px solid rgba(0, 0, 0, 0.125)";

    const handleInputChange = (e) => {
        checkout.setCardDetails({ ...checkout.cardDetails, [e.target.name]: e.target.value });
    };

    const handleFocus = (e) => {
        checkout.setCardDetails({ ...checkout.cardDetails, focus: e.target.name });
    };

    const validateCard = () => {
        const numberValidation = valid.number(checkout.cardDetails.number);
        return numberValidation.isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCard()) {
            alert("Perfect!");
        } else {
            alert("Invalid Card Number");
        }
    };

    return (
        <Card className="p-3" style={{border}}>
            <div>
                <Form.Check
                    type="radio"
                    value={methodName}
                    label={methodName}
                    checked={isSelected}
                    onChange={() => checkout.setPaymentMethod(methodName)}
                />
                {isSelected &&
                    <div>
                        <Form.Check
                            type="radio"
                            value={option1}
                            label={option1}
                            checked={true}
                            className="mx-4 mt-1 mb-2"
                        />
                        <Form onSubmit={handleSubmit}>
                            <Cards
                                number={checkout.cardDetails.number}
                                name={checkout.cardDetails.name}
                                expiry={checkout.cardDetails.expiry}
                                cvc={checkout.cardDetails.cvc}
                                focused={checkout.cardDetails.focus}
                            />
                            <div className='d-flex flex-column align-items-center'>
                                <div className="d-flex gap-3 mt-3">
                                    <Form.Group>
                                        <Form.Label
                                            className="text-muted p-0 m-0"
                                            style={{fontSize: 12}}
                                        >Card Number</Form.Label>
                                        <Form.Control
                                            style={{maxWidth: 200}}
                                            type="text"
                                            name="number"
                                            value={checkout.cardDetails.number}
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            maxLength="16"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className="text-muted p-0 m-0"
                                            style={{fontSize: 12}}
                                        >Cardholder Name</Form.Label>
                                        <Form.Control
                                            style={{maxWidth: 200}}
                                            type="text"
                                            name="name"
                                            value={checkout.cardDetails.name}
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            placeholder="John Doe"
                                        />
                                    </Form.Group>
                                </div>
                                <div className="d-flex gap-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className="text-muted p-0 m-0"
                                            style={{fontSize: 12}}
                                        >Expiry Date</Form.Label>
                                        <Form.Control
                                            style={{maxWidth: 200}}
                                            type="text"
                                            name="expiry"
                                            value={checkout.cardDetails.expiry}
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            maxLength="4"
                                            placeholder="MMYY"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label
                                            className="text-muted p-0 m-0"
                                            style={{fontSize: 12}}
                                        >CVC</Form.Label>
                                        <Form.Control
                                            style={{maxWidth: 200}}
                                            type="text"
                                            name="cvc"
                                            value={checkout.cardDetails.cvc}
                                            onChange={handleInputChange}
                                            onFocus={handleFocus}
                                            maxLength="3"
                                            placeholder="123"
                                        />
                                    </Form.Group>
                                </div>
                                <Button variant="primary" type="submit">
                                    Check Card
                                </Button>
                            </div>
                        </Form>
                    </div>
                }
            </div>

        </Card>
    );
});

export default PaymentCard;