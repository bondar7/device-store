import React, {useContext, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";

const CreateDevice = ({show, onHide}) => {
    const {store} = useContext(Context);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
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
                            <Dropdown.Toggle variant={'outline-dark'}>Choose type</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {store.types.map(type =>
                                    <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant={'outline-dark'}>Choose brand</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {store.brands.map(brand =>
                                    <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Form.Control className='mt-3' placeholder='Device name'/>
                    <Form.Control className='mt-3' type='number' placeholder='Device price'/>
                    <Form.Control className='mt-3' type='file'/>
                    <hr/>
                    <Button
                        onClick={addInfo}
                        variant={'outline-dark'}
                    >Add property</Button>
                    {
                        info.map(i =>
                            <Row key={i.number} className='mt-3'>
                                <Col md={4}>
                                    <Form.Control placeholder='Title'/>
                                </Col>
                                <Col md={4}>
                                    <Form.Control placeholder='Description'/>
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant={'outline-danger'}
                                        onClick={() => removeInfo(i.number)}
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
                <Button variant={'outline-success'} onClick={onHide}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;