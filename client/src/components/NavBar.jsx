import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Col, Container, Form, Image, Nav, Navbar, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import cart from '../assets/cart.png';
import userIcon from '../assets/user.png';
import logoutUser from "../utils/logoutUser";
import SearchBar from "./SearchBar";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const onLogout = async () => {
        await logoutUser(false);
        navigate(LOGIN_ROUTE);
    }
    const onProfile = () => {
        navigate(PROFILE_ROUTE);
    }
    const onCart = () => {
        navigate(BASKET_ROUTE);
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="p-2">
            <Container className="p-0">
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Store</NavLink>
                {location.pathname === SHOP_ROUTE && <SearchBar/>}
                {user.isAuth ?
                    <Nav className="mr-auto justify-content-end text-white">
                        {user.isAuth &&
                            <div className="d-flex justify-content-center align-items-center">
                                <Image
                                    src={cart}
                                    width={28}
                                    height={28}
                                    onClick={onCart}
                                    style={{color: "white", cursor: "pointer"}}
                                    className="mx-1"
                                />
                                <Image
                                    src={userIcon}
                                    width={50}
                                    height={50}
                                    style={{cursor: "pointer"}}
                                    onClick={onProfile}
                                />
                            </div>
                        }
                        {user.isAdmin && <Button
                            variant={'outline-light'}
                            className='mx-1'
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Admin
                        </Button>}
                    </Nav>
                    :
                    <Nav className="justify-content-end text-white">
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