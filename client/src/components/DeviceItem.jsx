import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png';
import filledGreenCart from '../assets/filled_green_cart.png';
import greenCart from '../assets/green_cart.png';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";
import {addToBasket} from "../http/basketAPI";
import {Context} from "../index";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const addToCart = async (e) => {
        setClicked(true);
        e.stopPropagation();
        await addToBasket(device.id);
    }
    return (
            <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
                <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={150} height={150}/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='text-black-50'>{device.brandName ? device.brandName : 'Loading...'}</div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>{device.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <div>{device.name}</div>
                    <div className="d-flex justify-content-between">
                        <div className="start" style={{color: "green"}}>${device.price / 100}</div>
                        <Image width={22}
                               height={22}
                               style={{cursor: "pointer"}}
                               src={clicked ? filledGreenCart : greenCart}
                               onClick={addToCart}
                        />
                    </div>
                </Card>
            </Col>
    );
};

export default DeviceItem;