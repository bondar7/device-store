import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import {Context} from "../index";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    return (
        <Container className='d-flex flex-column'>
                <Button variant={'outline-dark'} className='mt-2 p-2' onClick={() => setTypeVisible(true)}>New type</Button>
                <Button variant={'outline-dark'} className='mt-2 p-2' onClick={() => setBrandVisible(true)}>New brand</Button>
                <Button variant={'outline-dark'} className='mt-2 p-2' onClick={() => setDeviceVisible(true)}>New device</Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;