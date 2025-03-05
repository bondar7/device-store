import React, { useContext } from 'react';
import { Context } from "../../index";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import cart from '../../assets/cart.png';
import userIcon from '../../assets/user.png';
import SearchBar from "../SearchBar";
import styles from "../../styles/Navbar.module.css";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const onProfile = () => {
        navigate(PROFILE_ROUTE);
    };

    const onCart = () => {
        navigate(BASKET_ROUTE);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark" className="p-2">
            <Container className="p-0">
                <NavLink className="fw-semibold fs-4" style={{ color: 'white', textDecoration: 'none' }} to={SHOP_ROUTE}>
                    mDev
                </NavLink>
                {location.pathname === SHOP_ROUTE && (
                    <div className={styles.searchBar}>
                        <SearchBar />
                    </div>
                )}
                {user.isAuth ? (
                    <Nav className="mr-auto justify-content-end text-white">
                        <div className="d-flex justify-content-center align-items-center">
                            <Image
                                src={cart}
                                width={28}
                                height={28}
                                onClick={onCart}
                                style={{ color: "white", cursor: "pointer" }}
                                className="mx-1"
                            />
                            <Image
                                className="mx-2"
                                src={userIcon}
                                width={40}
                                height={40}
                                style={{ cursor: "pointer" }}
                                onClick={onProfile}
                            />
                        </div>
                        {user.isAdmin && (
                            <Button
                                variant={'outline-light'}
                                className='mx-1'
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Admin
                            </Button>
                        )}
                    </Nav>
                ) : (
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
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
