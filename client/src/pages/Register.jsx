import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const Register = () => {
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Sign Up</h2>
                <Form className='d-flex flex-column mt-2'>
                    <Form.Control
                        placeholder='Email'
                        className='mt-3'
                    />
                    <Form.Control
                        placeholder='Password'
                        className='mt-3'
                    />
                    <Row className='mt-3 d-flex flex-row justify-content-between align-items-center'>
                        <Col className='col-auto'>
                            <div>
                                Already have an account? <NavLink to={LOGIN_ROUTE}>Login now!</NavLink>
                            </div>
                        </Col>
                        <Col className='col-auto'>
                            <Button
                                variant='outline-dark'

                            >
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;