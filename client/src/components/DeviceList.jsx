import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";

const DeviceList = observer(() => {
    const {store} = useContext(Context);
    return (
        <Row className='d-flex'>
            {store.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>)}
        </Row>
    );
});

export default DeviceList;