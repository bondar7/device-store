import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Form, Row} from "react-bootstrap";
import CustomInput from "../../components/CustomInput";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DeliveryCard = () => {
    return (
        <div>
           <h4 className="px-2 mb-3 fw-medium">Delivery</h4>
            <div>
                <SelfPickupCard/>
                <CourierCard/>
            </div>
        </div>
    );
};

const SelfPickupCard = observer(() => {
    const {checkout} = useContext(Context);
    const deliveryName = "Self-pickup from our stores";
    const isSelected = checkout.delivery === deliveryName;
    const border = !isSelected ? "none" : "1px solid rgba(0, 0, 0, 0.125)";
    const stores = [
        "3050 Davidson Ct, Burlington, ON L7M 4M9, Canada",
        "2336 23rd St, Columbus, NE 68601, USA",
        "1063 Hope St, Stamford, CT 06907, USA",
        "80 Boul du Plateau, Gatineau, QC J9A 3G6, Canada",
        "2305 Meadowvale Blvd, Mississauga, ON L5N 5P9, Canada",
        "Av. José de Gálvez 900, San Pedro Tlaquepaque, Jal., Mexico",
        "Calle 45 347, Centro, 97000 Mérida, Yuc., Mexico",
        "30-08 47th Ave, Long Island City, NY 11101, USA",
        "21 High St, Sheffield S1 2GA, United Kingdom",
        "47 Rue de la Chapelle, 75018 Paris, France",
        "Kurfürstendamm 234, 10719 Berlin, Germany",
        "Viale Certosa, 20156 Milano MI, Italy",
        "Calle de Serrano, 28006 Madrid, Spain",
        "120 Spencer St, Melbourne VIC 3000, Australia",
        "38 Jalan Tun Perak, 50050 Kuala Lumpur, Malaysia"
    ];
    const deliveryFee = 0;
    useEffect(() => {
        if (isSelected) checkout.setDeliveryFee(deliveryFee);
    }, [isSelected]);

    return (
    <Card className="p-3"  style={{ border, cursor: "pointer" }}>
        <div className="mx-1 d-flex justify-content-between align-items-center">
            <Form.Check
                type="radio"
                label={deliveryName}
                value={deliveryName}
                checked={isSelected}
                onChange={(e) => checkout.setDelivery(e.target.value)}
            />
            <div className="fw-bold" style={{color: "green"}}>
                Free
            </div>
        </div>
        {isSelected &&
            <Form.Select
                style={{maxHeight: 200}}
                className="mx-4 mt-2 w-75"
                value={checkout.selectedStore || "Select store"}
                onChange={(e) => checkout.setSelectedStore(e.target.value)}
            >
                {stores.map(address => <option key={address} value={address}>{address}</option>)}
            </Form.Select>
        }
    </Card>
    );
});
const CourierCard = observer(() => {
    const {checkout} = useContext(Context);
    const deliveryName = "Courier delivery";
    const isSelected = checkout.delivery === deliveryName;
    const border = !isSelected ? "none" : "1px solid rgba(0, 0, 0, 0.125)";
    const deliveryFee = 10;
    useEffect(() => {
        if (isSelected) checkout.setDeliveryFee(deliveryFee);
    }, [isSelected]);
    return (
        <Card className="p-3"  style={{ border, cursor: "pointer" }}>
            <div className="mx-1 d-flex justify-content-between align-items-center">
                <Form.Check
                    type="radio"
                    label={deliveryName}
                    value={deliveryName}
                    checked={isSelected}
                    onChange={(e) => checkout.setDelivery(e.target.value)}
                />
                <div className="fw-bold">
                    ${deliveryFee}
                </div>
            </div>
            {isSelected &&
                <div>
                    <Row className="d-flex mt-2">
                        <Col md={6}>
                            <CustomInput label="Street" onlyDigits={false} value={checkout.courierStreet} setValue={(val) => checkout.setCourierStreet(val)}/>
                        </Col>
                        <Col md={3}>
                            <CustomInput label="House" onlyDigits={true} value={checkout.house} setValue={(val) => checkout.setHouse(val)}/>
                        </Col>
                        <Col md={3}>
                            <CustomInput label="Apartment" onlyDigits={true} value={checkout.apartment} setValue={(val) => checkout.setApartment(val)}/>
                        </Col>
                    </Row>
                    <div className="mt-2">
                        <Form.Check
                            className="d-flex align-items-center gap-2"
                            label="Lift to your floor"
                            checked={checkout.toLift}
                            onChange={() => checkout.setToLift(!checkout.toLift)}
                        />
                    </div>
                    {checkout.toLift &&
                        <Row>
                            <Col md={6}>
                                <CustomInput label="Floor" onlyDigits={true} value={checkout.floor} setValue={(val) => checkout.setFloor(val)}/>
                            </Col>
                            <Col md={6}>
                                <div>
                                    <p className="text-muted m-0 p-0" style={{fontSize: 12}}>Lift</p>
                                    <Form.Select
                                        value={checkout.isLift === null ? "Lift availability" : checkout.isLift ? "Yes" : "No"}
                                        onChange={(e) => checkout.setIsLift(e.target.value === "Yes")}
                                    >
                                        <option disabled value="Lift availability">Lift availability</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </div>
                            </Col>
                        </Row>
                    }
                    <div className="mt-3" style={{textDecoration: "underline"}}>We will call you to set details.</div>
                </div>
            }
        </Card>
    );
});

export default DeliveryCard;