import React from 'react';
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import UserInfo from "./UserInfo";
import {useNavigate} from "react-router-dom";
import Wishlist from "./wishlist/Wishlist";
import {observer} from "mobx-react-lite";

const ProfilePage = observer(() => {
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
                                <Nav.Link eventKey="second">Wishlist</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10} style={{borderLeft: "1px solid #ccc", height: "100vh"}}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><UserInfo/></Tab.Pane>
                            <Tab.Pane eventKey="second"><Wishlist/></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
});

export default ProfilePage;