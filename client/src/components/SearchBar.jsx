import React, {useContext, useState} from 'react';
import {Button, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Context} from "../index";

const SearchBar = () => {
    const {store} = useContext(Context);
    const [value, setValue] = useState(store.searchQuery);
    const onChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === "") store.setSearchQuery("");
    }
    const onSearch = () => {
        store.setSearchQuery(value)
    }
    return (
        <Container style={{ maxWidth: 500 }}>
            <Row>
                <Form className="w-100">
                    <InputGroup>
                        <Form.Control
                            value={value}
                            onChange={onChange}
                            placeholder="Search..."
                        />
                        <Button
                            onClick={onSearch}
                            variant="outline-light">Search</Button>
                    </InputGroup>
                </Form>
            </Row>
        </Container>
    );
};

export default SearchBar;