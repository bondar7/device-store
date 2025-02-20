import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import LocationCard from "./LocationCard";
import Cart from "./Cart";
import DeliveryCard from "./DeliveryCard";
import PaymentCard from "./PaymentCard";
import RecipientCard from "./RecipientCard";
import ConfirmationCard from "./ConfirmationCard";
import ProfileCard from "./ProfileCard";

const CheckoutPage = () => {
    return (
        <Container className="mb-4">
            <div className="fs-2 fw-medium">
                Order placement
            </div>
            <Row className="p-2">
                <Col md={8} className="d-flex flex-column gap-3">
                    <ProfileCard/>
                    <LocationCard/>
                    <Cart/>
                    <DeliveryCard/>
                    <PaymentCard/>
                    {/*<RecipientCard/>*/}
                </Col>
                <Col md={4} style={{ position: "sticky", top: "20px", height: "fit-content", zIndex: 10 }}>
                    <ConfirmationCard/>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;