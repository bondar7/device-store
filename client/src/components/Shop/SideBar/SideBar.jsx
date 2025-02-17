import React from 'react';
import {Container} from "react-bootstrap";
import TypeList from "./TypeList/TypeList";
import PriceRangeSelector from "./priceRangeSelector/priceRangeSelector";
import BrandList from "./BrandList/BrandList";

const SideBar = () => {
    return (
        <Container className="p-0" style={{
            borderTop: "1px solid lightgray",
            borderRight: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
        }}>
            <TypeList/>
            <BrandList/>
            <PriceRangeSelector/>
        </Container>
    );
};

export default SideBar;