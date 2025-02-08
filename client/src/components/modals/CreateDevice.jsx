import React, {use, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";

const CreateDevice = ({show, onHide}) => {
    const [error, setError] = useState('');
    const {store} = useContext(Context);
    const [info, setInfo] = useState([]);
    const [type, setType] = useState({});
    const [brand, setBrand] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    }

    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i));
    }

    const onCreate = async() => {
        const device = new FormData();
        device.append("name", name);
        device.append("devicePrice", price);
        device.append("typeId", type.id || "");
        device.append("brandId", brand.id || "");
        device.append("img", img);
        device.append("info", JSON.stringify(info));
        try {
            await createDevice(device);
            setName('');
            setPrice('');
            setType('');
            setBrand('');
            setImg(null);
            setInfo([]);
            setError('');
            onHide();
        } catch (e) {
            setError(e?.response?.data?.message);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex gap-2'>
                        <Dropdown>
                            <Dropdown.Toggle variant={'outline-dark'}>{type.name || "Choose type"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {store.types.map(type =>
                                    <Dropdown.Item
                                        key={type.id}
                                        onClick={() => setType(type)}
                                    >
                                        {type.name}
                                    </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant={'outline-dark'}>{brand.name || "Choose brand"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {store.brands.map(brand =>
                                    <Dropdown.Item
                                        key={brand.id}
                                        onClick={() => setBrand(brand)}
                                    >{brand.name}
                                    </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Name'
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} // Remove non-digits
                        className='mt-3'
                        type="text"
                        pattern="\d*"
                        inputMode="numeric"
                        placeholder='Price'
                    />
                    <Form.Control
                        onChange={(e) => setImg(e.target.files[0])}
                        className='mt-3'
                        type='file'
                    />
                    <div className='mt-3' style={{color: 'red'}}>{error}</div>
                    <hr/>
                    <Button
                        onClick={addInfo}
                        variant={'outline-dark'}
                    >Add property</Button>
                    {
                        info.map(i =>
                            <Row key={i.id} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(e) => changeInfo('title', e.target.value, i.id)}
                                        placeholder='Title'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                        placeholder='Description'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant={'outline-danger'}
                                        onClick={() => removeInfo(i.id)}
                                    >
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
                <Button variant={'outline-success'} onClick={onCreate}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;