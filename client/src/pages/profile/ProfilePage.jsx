import React from 'react';
import {Button, Col, Container, Nav, Row, Tab} from "react-bootstrap";
import UserInfo from "./UserInfo";
import Favourites from "./Favourites";
import logoutUser from "../../utils/logoutUser";
import {LOGIN_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <Container className="mt-4">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">User Info</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Favourites</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} style={{borderLeft: "1px solid #ccc", height: "100vh"}}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><UserInfo/></Tab.Pane>
                            <Tab.Pane eventKey="second"><Favourites/></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default ProfilePage;