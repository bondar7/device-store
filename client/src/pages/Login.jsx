import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";
import {Context} from "../index";

const Login = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signIn = async () => {
        try {
            let _user;
            _user = await login(email, password); //get decoded access token with user info
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
                <h2 className='m-auto'>Login</h2>
                <Form className="d-flex flex-column mt-2">
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
                    <Row className="d-flex flex-row justify-content-between align-items-center mt-3">
                        <Col className="col-auto">
                            No account? <NavLink to={REGISTRATION_ROUTE}>Sign up now!</NavLink>
                        </Col>
                        <Col className="col-auto" onClick={signIn}>
                            <Button variant="outline-dark">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;