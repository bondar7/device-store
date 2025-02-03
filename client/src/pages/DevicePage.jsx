import React from 'react';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import star from '../assets/big_star.png';

const DevicePage = () => {
    const description = [
        {id: 1, title: 'CPU', description: 'Bionic 13'},
        {id: 2, title: 'RAM', description: '6gb'},
        {id: 3, title: 'Display', description: 'Retina 4K'},
        {id: 4, title: 'Camera', description: '16mp'},
        {id: 5, title: 'Cores', description: '12'},
        {id: 6, title: 'Battery', description: '3300mah'},
    ]
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={null}/>
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center justify-content-center'>
                        <h2 className='text-center'>Device Name</h2>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 54}}
                        >
                            4.5
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column justify-content-around align-items-center'
                        style={{width: 300, height: 300, fontSize: 32, border: '2px solid light-grey'}}
                    >
                        <h3>From 1000$</h3>
                        <Button variant='outline-dark'>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <h2 className='mt-3'>Description: </h2>
            <Row className='d-flex flex-column m-3'>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent"}}>
                        {info.title}: {info.description}
                    </Row>)}
            </Row>
        </Container>
    );
};

export default DevicePage;