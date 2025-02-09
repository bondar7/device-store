import React, {useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchBrandById} from "../http/deviceAPI";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    const [brand, setBrand] = useState(null);
    useEffect(() => {
        fetchBrandById(device.brandId)
            .then(data => {
                if (data && device.brandId === data.id) {
                    setBrand(data.name);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }, [device.id]);
    return (
            <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
                <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={150} height={150}/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='text-black-50'>{brand ? brand : 'Loading...'}</div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>{device.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                    </div>
                    <div>{device.name}</div>
                </Card>
            </Col>
    );
};

export default DeviceItem;