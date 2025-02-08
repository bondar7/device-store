import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Col, Container, Form, Nav, Navbar, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {logout} from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const onLogout = async () => {
        const res = await logout();
        console.log(res);
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="p-2">
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Store</NavLink>
                {user.isAuth ?
                    <Nav className="mr-auto justify-content-end text-white" style={{width: '100%'}}>
                        {user.isAdmin && <Button
                            variant={'outline-light'}
                            className='mx-1'
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin
                        </Button>}
                        <Button
                            variant={'outline-light'}
                            className='mx-1'
                            onClick={onLogout}
                        >
                            Logout
                        </Button>
                    </Nav>
                    :
                    <Nav className="justify-content-end text-white" style={{width: '100%'}}>
                        <Button
                            variant={'outline-light'}
                            className='mx-1'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Login
                        </Button>
                        <Button
                            variant={'outline-light'}
                            className='mx-1'
                            onClick={() => navigate(REGISTRATION_ROUTE)}
                        >
                            Sign Up
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;