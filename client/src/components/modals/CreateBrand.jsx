import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPI";
import {Context} from "../../index";

const CreateBrand = ({show, onHide}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const onCreate = async () => {
        try {
            await createBrand(name);
            setError('');
            setName('');
            onHide();
        } catch (e) {
            onHide();
            setError(e?.response?.data?.message);
        }
    }
    const onChange = (e) => {
        setName(e.target.value);
        setError('');
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
                    Create Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name} onChange={onChange}
                        placeholder='Type brand name'
                    />
                    <div style={{color: 'red'}}>{error}</div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
                <Button variant={'outline-success'} onClick={onCreate}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;