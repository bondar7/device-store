import React, {useContext} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() =>  {
    const {store} = useContext(Context);
    return (
        <Row className='d-flex flex-row'>
            {store.brands.map(brand =>
                <Col key={brand.id} md={2} className='m-0 p-1'>
                    <Card
                        className='p-3 text-center'
                        onClick={() => store.setSelectedBrand(brand)}
                        border={store.selectedBrand === brand && 'dark'}
                    >{brand.name}</Card>
                </Col>)}
        </Row>
    );
});

export default BrandBar;