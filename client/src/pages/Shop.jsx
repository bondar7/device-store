import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {observer} from "mobx-react-lite";
import PriceRangeSelector from "../components/priceRangeSelector/priceRangeSelector";

const Shop = observer(() => {
    const {store} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => store.setTypes(data));
        fetchBrands().then(data => store.setBrands(data));
        fetchDevices(
            store.searchQuery,
            store?.selectedBrand?.id,
            store?.selectedType?.id,
            store.selectedMinPrice * 100,
            store.selectedMaxPrice * 100,
            store.limit,
            store.selectedPage
        )
            .then(data => {
            store.setDevices(data.rows);
            store.setTotalCount(data.count);
        })
            .catch(e => {
                console.log(e);
            })
    },[store.selectedPage, store.searchQuery, store.selectedType, store.selectedBrand]);
    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <PriceRangeSelector/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;