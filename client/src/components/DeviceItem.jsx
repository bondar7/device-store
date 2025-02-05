import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png';
import {useNavigate} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
            <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}>
                <Card style={{width: 150, cursor: 'pointer'}} border='light'>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={150} height={150}/>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='text-black-50'>Apple</div>
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