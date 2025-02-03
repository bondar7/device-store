import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../utils/consts";

const Login = () => {
    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Login</h2>
                <Form className="d-flex flex-column mt-2">
                    <Form.Control
                        className="mt-3"
                        placeholder="Email"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Password"
                    />
                    <Row className="d-flex flex-row justify-content-between align-items-center mt-3">
                        <Col className="col-auto">
                            No account? <NavLink to={REGISTRATION_ROUTE}>Sign up now!</NavLink>
                        </Col>
                        <Col className="col-auto">
                            <Button variant="outline-dark">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;