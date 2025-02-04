import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Register = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async () => {
        try {
            let _user;
            _user = await registration(email, password); //get decoded access token with user info
            user.setUser(_user);
            if (_user) user.setIsAuth(true);
            if(_user?.roles?.includes('ADMIN')) user.setIsAdmin(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            setError(e.response.data.message);
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>Sign Up</h2>
                <Form className='d-flex flex-column mt-2'>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Email'
                        className='mt-3'
                    />
                    <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        className='mt-3'
                    />
                    <div className='mt-2' style={{color: 'red'}}>{error}</div>
                    <Row className='mt-3 d-flex flex-row justify-content-between align-items-center'>
                        <Col className='col-auto'>
                            <div>
                                Already have an account? <NavLink to={LOGIN_ROUTE}>Login now!</NavLink>
                            </div>
                        </Col>
                        <Col className='col-auto'>
                            <Button
                                variant='outline-dark'
                                onClick={register}
                            >
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Register;