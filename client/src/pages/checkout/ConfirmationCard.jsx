import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const ConfirmationCard = observer(() => {
    const {basket, checkout} = useContext(Context);
    const totalQuantity = basket.totalQuantity;
    const total = basket.total;
    const onConfirm = () => {
        console.log("ORDER DATA:")
        console.log(checkout)
    }
    return (
        <Card style={{background: "rgb(244,244,244)"}}>
            <Card.Body>
                <h3 className="fw-bold mb-3">Summary</h3>
                <div className="border-bottom d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>{totalQuantity} items</div>
                        <div>${total}</div>
                    </div>
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <div>Delivery fee</div>
                        <div className="fw-bold">${checkout.deliveryFee}</div>
                    </div>
                </div>
                <div className="mt-3 border-bottom">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>Total</div>
                        <div className="fs-3">${total + checkout.deliveryFee}</div>
                    </div>
                </div>

                <div>
                    <Button onClick={onConfirm} className="mt-3 p-2 w-100" variant="success">Confirm order</Button>
                </div>
            </Card.Body>
        </Card>
    );
});

export default ConfirmationCard;