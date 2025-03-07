import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPI";
import {Context} from "../../index";

const CreateType = ({show, onHide}) => {
    const  [name, setName] = useState('');
    const [error, setError] = useState('');
    const onCreate = async () => {
        try {
            await createType(name);
            setError('');
            setName('');
            onHide();
        } catch (e) {
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
                    Create Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={onChange}
                        placeholder='Type type name'
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

export default CreateType;