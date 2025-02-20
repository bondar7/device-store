import {Form} from "react-bootstrap";
import React from "react";

const CustomInput = ({label, value, setValue, onlyDigits}) => {
    const handleInputChange = (e) => {
        if (onlyDigits) {
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            setValue(newValue);
        } else {
            setValue(e.target.value);
        }
    };
    return (
        <Form>
            <Form.Label className="text-muted m-0 p-0" style={{fontSize: 12}}>{label}</Form.Label>
            <Form.Control
                style={{ outline: "none", boxShadow: "none", borderColor: "#ced4da"}}
                value={value}
                onChange={handleInputChange}
            />
        </Form>
    );
}

export default CustomInput;