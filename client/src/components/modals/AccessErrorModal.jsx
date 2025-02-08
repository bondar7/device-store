import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const AccessErrorModal = observer(() => {
    const {user} = useContext(Context);
    const isAccessError = user.isAccessError;
    const onHide = () => {
        user.setIsAccessError(false);
    }
    return (
        <Modal
            show={isAccessError}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    No Access Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Please login again!</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AccessErrorModal;