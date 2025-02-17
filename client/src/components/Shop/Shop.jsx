import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeList from "./SideBar/TypeList/TypeList";
import BrandList from "./SideBar/BrandList/BrandList";
import DeviceList from "../DeviceList";
import {Context} from "../../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import Pages from "../Pages";
import {observer} from "mobx-react-lite";
import PriceRangeSelector from "./SideBar/priceRangeSelector/priceRangeSelector";
import SideBar from "./SideBar/SideBar";

const Shop = observer(() => {
    const {store} = useContext(Context);
    useEffect(() => {
        fetchTypes().then(data => store.setTypes(data));
        fetchBrands().then(data => store.setBrands(data));
        fetchDevices(
            store.searchQuery,
            store?.selectedBrands,
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
    },[store.selectedPage, store.searchQuery, store.selectedType, store.selectedBrands]);
    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <SideBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;