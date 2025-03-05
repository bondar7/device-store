import React from 'react';
import { Container } from "react-bootstrap";
import TypeList from "./TypeList/TypeList";
import PriceRangeSelector from "./priceRangeSelector/priceRangeSelector";
import BrandList from "./BrandList/BrandList";
import SearchBar from "../../SearchBar";
import styles from "../../../styles/SideBar.module.css";

const SideBar = () => {
    return (
        <Container className="p-0" style={{
            borderTop: "1px solid lightgray",
            borderRight: "1px solid lightgray",
            borderLeft: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
        }}>
            <div className={styles.searchBar}><SearchBar /></div>
            <TypeList />
            <BrandList />
            <PriceRangeSelector />
        </Container>
    );
};

export default SideBar;
