import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import star from '../assets/big_star.png';
import {useParams} from "react-router-dom";
import {fetchDeviceById} from "../http/deviceAPI";

const DevicePage = () => {
    const {id} = useParams();
    const [device, setDevice] = useState({info: []});
    useEffect(() => {
        fetchDeviceById(id).then(data => {
            setDevice(data)
            console.log(data)
        });
    }, []);
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center justify-content-center'>
                        <h2 className='text-center'>{device.name}</h2>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 54}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column justify-content-around align-items-center'
                        style={{width: 300, height: 300, fontSize: 32, border: '2px solid light-grey'}}
                    >
                        <h3>From {device.price}</h3>
                        <Button variant='outline-dark'>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <h2 className='mt-3'>Description: </h2>
            <Row className='d-flex flex-column m-3'>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent"}}>
                        {info.title}: {info.description}
                    </Row>)}
            </Row>
        </Container>
    );
};

export default DevicePage;