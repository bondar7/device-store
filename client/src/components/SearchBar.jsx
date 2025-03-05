import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, InputGroup, Row} from "react-bootstrap";
import {Context} from "../index";

const SearchBar = () => {
    const {store} = useContext(Context);
    const [value, setValue] = useState(store.searchQuery);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the window width when the window is resized
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === "") store.setSearchQuery("");
    }
    const onSearch = (e) => {
        store.setSearchQuery(value);
        e.preventDefault();
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
                            variant={windowWidth < 768 ? "outline-dark" : "outline-light"}>Search</Button>
                    </InputGroup>
                </Form>
            </Row>
        </Container>
    );
};

export default SearchBar;